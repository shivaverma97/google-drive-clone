import React from 'react'
import Navbar from './Navbar'
import { Container } from 'react-bootstrap'
import AddFolder from './AddFolder'
import { useFolder } from '../hooks/useFolder'
import Folder from './Folder'

export default function Dashboard() {

  const folder = useFolder('Y5lx8RSTFDbynbG9dmOq')
  console.log(folder.name)
  return (
    <>
      <Navbar/>
      <Container fluid>
        <AddFolder currentFolder = {folder}/>
        <Folder folder={folder}/>
      </Container>
    </>
  )
}
