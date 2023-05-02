import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { Form, Button, Card, Alert } from "react-bootstrap"
import CenteredContainer from './CenteredContainer'

export default function ResetPassword() {
    const emailRef = useRef()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const { resetPassword } = useAuth()
    const [message, setMessage] = useState('')

    async function handleReset(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            setMessage('')
            await resetPassword(emailRef.current.value)
            setMessage("Email sent successfully. Please check your inbox.")
            setLoading(false)
        } catch (ex) {
            setLoading(false)
            setError(`Failed to log In. Please try again!! Due to the following error: ${ex}`)
        }
    }

    return (
        <>
            <CenteredContainer>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Password Reset</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {message && <Alert variant="success">{message}</Alert>}
                        <Form onSubmit={handleReset}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required />
                            </Form.Group>
                            <Button disabled={loading} className="w-100" type="submit">
                                Reset Password
                            </Button>
                        </Form>
                        <div className="w-100 text-center mt-3">
                            <Link to="/login">Login</Link>
                        </div>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Need an account? <Link to="/signup">Sign Up</Link>
                </div>
            </CenteredContainer>
        </>
    )
}
