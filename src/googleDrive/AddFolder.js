import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import {useAuth} from '../contexts/AuthContext'
import {collection, addDoc} from "firebase/firestore"
import {db} from '../authentication/Firebase'

export default function AddFolder() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const {currentUser} = useAuth()

  async function handleFormSubmit(e){
    e.preventDefault()

    try{
      await addDoc(collection(db, "folders"), {
        name: name,
        userId: currentUser.uid,
        createdAt: Date.now()
      })
    }
    catch(ex){
      console.log(ex)
    }

    setName('')
    closeModal()
  }

  function openModal(){
    setOpen(true)
  }

  function closeModal(){
    setOpen(false)
  }
    
  return (
    <>
        <Button onClick={openModal} variant="outline-success" size="sm">
            <FontAwesomeIcon icon={faFolderPlus}/>
        </Button>
        <Modal show={open} onHide={closeModal}>
          <Form onSubmit={handleFormSubmit}>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Folder Name</Form.Label>
                <Form.Control
                  type='text'
                  required
                  value = {name}
                  onChange={e => setName(e.target.value)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button vairant="secondary" onClick={closeModal}>
                Close
              </Button>
              <Button variant='success' type='submit'>
                Add Folder
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
    </>
  )
}
