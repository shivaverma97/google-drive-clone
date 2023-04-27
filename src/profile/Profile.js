import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Button, Alert } from "react-bootstrap"

export default function Profile() {

    const { currentUser, logOut } = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    async function handleOnClick(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await logOut()
            navigate('/login')
        }
        catch (ex) {
            setError(`Failed to logout due to the following error: ${ex}`)
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email:</strong> {currentUser.email}
                    <Link to="/updateprofile" className="btn btn-primary w-100 mt-3">
                        Update Profile
                    </Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" disabled={loading} onClick={handleOnClick}>
                    Log Out
                </Button>
            </div>
        </>
    )
}
