import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Folder({folder}) {

  return (
    <Button
      to={`/folder/${folder.id}}`}
      variant='outline-dark'
      className='text-truncate w-100'
      as={Link}
    >
      <FontAwesomeIcon icon={faFolder} className='mr-2'/>
      {folder.name}
    </Button>
  )
}
