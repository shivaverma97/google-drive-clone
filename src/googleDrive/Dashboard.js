import React from 'react'
import Navbar from './Navbar'
import { Container } from 'react-bootstrap'
import AddFolder from './AddFolder'

export default function Dashboard() {
  return (
    <>
      <Navbar/>
      <Container fluid><AddFolder/></Container>
    </>
  )
}
