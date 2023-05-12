import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { ROOT_FOLDER } from '../hooks/useFolder'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../authentication/Firebase'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../authentication/Firebase'
import { v4 as uuid } from 'uuid'
import { ProgressBar, Toast } from 'react-bootstrap'
import { createPortal } from 'react-dom'

export default function AddFile({ currentFolder }) {
    const { currentUser } = useAuth()
    const [uploadingFiles, setUploadingFiles] = useState([])

    async function addFileToDatabase(url, file) {
        try {
            await addDoc(collection(db, "files"), {
                url: url,
                name: file.name,
                createdAt: Date.now(),
                folderId: currentFolder.id,
                userId: currentUser.uid
            })
        }
        catch (ex) {
            console.log(ex)
        }
    }

    function handleFileUpload(e) {
        const file = e.target.files[0]
        if (currentFolder == null || file == null) return

        const id = uuid()
        setUploadingFiles(prevUploadingFiles => [
            ...prevUploadingFiles,
            { id: id, name: file.name, progress: 0, error: false }
        ])
        const folderPath = currentFolder.path.map(obj => obj.name).join('/');
        const filePath = currentFolder === ROOT_FOLDER ? `${folderPath}/${file.name}` : `${folderPath}/${currentFolder.name}/${file.name}`

        const storageref = ref(storage, `/files/${currentUser.uid}/${filePath}`)

        const uploadTask = uploadBytesResumable(storageref, file)

        uploadTask.on('state_changed', snapshot => {
            const progress =   snapshot.bytesTransferred / snapshot.totalBytes

            setUploadingFiles(prevUploadingFiles => {
                return prevUploadingFiles.map(file=>{
                    if(file.id === id){
                        return {...file, progress: progress}
                    }
                    return file
                })
            })
        }, () => {
            setUploadingFiles(prevUploadingFiles => {
                return prevUploadingFiles.map(file=>{
                    if(file.id === id){
                        return { ...file, error: true}
                    }
                    return file
                })
            })
        }, () => {

            setUploadingFiles(prevUploadingFiles => {
                return prevUploadingFiles.filter(file => {
                    return file.id !== id
                })
            })
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                addFileToDatabase(url, file)
            })
        })

    }
    return (
        <>
            <label className='btn btn-outline-success btn-sm' style={{ marginRight: '3px' }}>
                <FontAwesomeIcon icon={faFileUpload} />
                <input
                    type='file'
                    onChange={handleFileUpload}
                    style={{ opacity: 0, position: 'absolute', left: '-9990px' }}
                >
                </input>
            </label>
            {
                uploadingFiles.length > 0 &&
                createPortal(
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '1rem',
                            right: '1rem',
                            maxWidth: '250px'
                        }}
                    >
                        {uploadingFiles.map(file => {
                            <Toast key={file.id} onClose={()=> {setUploadingFiles(prevUploadingFiles=> {
                                return prevUploadingFiles.filter(uploadFile => {
                                    return uploadFile.id !== file.id
                                })
                            })}}>
                                <Toast.Header className='text-truncate w-100 d-block' closeButton={file.error}>
                                    {file.name}
                                </Toast.Header>
                                <Toast.Body>
                                    <ProgressBar
                                        animated={!file.error}
                                        variant={file.error ? 'danger' : 'primary'}
                                        now={file.error ? 100 : file.progress*100}
                                        label={
                                            file.error ? 'Error' : `${Math.round(file.progress * 100)}%`
                                        }
                                    >

                                    </ProgressBar>
                                </Toast.Body>
                            </Toast>
                        })}
                    </div>
                )
            }
        </>
    )
}
