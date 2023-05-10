import React from 'react'
import Navbar from './Navbar'
import { Container } from 'react-bootstrap'
import AddFolder from './AddFolder'
import { useFolder } from '../hooks/useFolder'
import Folder from './Folder'
import { useParams } from 'react-router-dom'
import FolderBreadcrumbs from './FolderBreadcrumbs'
import AddFile from './AddFile'
import File from './File'

export default function Dashboard() {
  const { folderId } = useParams()
  const { folder, childFolders, childFiles } = useFolder(folderId)

  return (
    <>
      <Navbar />
      <Container fluid>
        <div className='d-flex align-tems-center' style={{ paddingTop: '5px' }}>
          <FolderBreadcrumbs currentFolder={folder} />
          <AddFile currentFolder={folder} />
          <AddFolder currentFolder={folder} />
        </div>
        {childFolders && childFolders.length > 0 && (
          <div className='d-flex flex-wrap'>
            {childFolders.map(childFolder => (
              <div key={childFolder.id} style={{ maxWidth: "250px" }} className='p-2'>
                <Folder folder={childFolder} />
              </div>
            ))}
          </div>
        )}
        {childFolders && childFolders.length > 0 && childFiles.length > 0 && <hr/> }
        {childFiles && childFiles.length > 0 && (
          <div className='d-flex flex-wrap'>
            {childFiles.map(childFile => (
              <div key={childFile.id} style={{ maxWidth: "250px" }} className='p-2'>
                <File file={childFile} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  )
}
