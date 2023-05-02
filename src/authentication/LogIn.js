import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Card, Alert } from "react-bootstrap"
import CenteredContainer from './CenteredContainer'

export default function LogIn() {
    const emailRef = useRef()
    const passRef = useRef()
    const { logIn } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleOnLogIn(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await logIn(emailRef.current.value, passRef.current.value)
            navigate("/user")
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
                        <h2 className="text-center mb-4">Log In</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleOnLogIn}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passRef} required />
                            </Form.Group>
                            <br />
                            <Button disabled={loading} className="w-100" type="submit">
                                Log In
                            </Button>
                        </Form>
                        <div className="w-100 text-center mt-3">
                            <Link to="/resetpassword">Forgot Password?</Link>
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
