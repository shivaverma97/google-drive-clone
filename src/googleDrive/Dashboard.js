import React from 'react'
import Navbar from './Navbar'
import { Container } from 'react-bootstrap'
import AddFolder from './AddFolder'
import { useFolder } from '../hooks/useFolder'
import Folder from './Folder'
import { useParams } from 'react-router-dom'

export default function Dashboard() {
  const {folderId} = useParams()

  const {folder, childFolders} = useFolder(folderId)
  return (
    <>
      <Navbar/>
      <Container fluid>
        <AddFolder currentFolder = {folder}/>
        {childFolders && childFolders.length > 0 &&(
          <div className='d-flex flex-wrap'>
            {childFolders.map(childFolder => (
              <div key ={childFolder.id} style= {{maxWidth: "250px"}} className='p-2'>
                <Folder folder={childFolder}/>
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  )
}
