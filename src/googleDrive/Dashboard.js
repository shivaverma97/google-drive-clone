import React from 'react'
import Navbar from './Navbar'
import { Container } from 'react-bootstrap'
import AddFolder from './AddFolder'
import { useFolder } from '../hooks/useFolder'

export default function Dashboard() {

  const folder = useFolder('7u3RstsJqG9Tjv0CIPbN')

  return (
    <>
      <Navbar/>
      <Container fluid><AddFolder currentFolder = {folder}/></Container>
    </>
  )
}
