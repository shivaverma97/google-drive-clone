import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Card, Alert } from "react-bootstrap"
import CenteredContainer from './CenteredContainer'

export default function SignUp() {
    const emailRef = useRef()
    const passRef = useRef()
    const repeatPassRef = useRef()
    const { signUp } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleOnSignUp(e) {
        e.preventDefault()

        if (passRef.current.value !== repeatPassRef.current.value) {
            return setError('Password do not match')
        }
        try {
            setError('')
            setLoading(true)
            await signUp(emailRef.current.value, passRef.current.value)
            navigate("/login")
            setLoading(false)
        } catch (ex) {
            setLoading(false)
            setError(`Failed to sign up. Please try again!! Due to the following error: ${ex}`)
        }
    }

    return (
        <>
            <CenteredContainer>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Sign Up</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleOnSignUp}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passRef} required />
                            </Form.Group>
                            <Form.Group id="password-confirm">
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control type="password" ref={repeatPassRef} required />
                            </Form.Group>
                            <br />
                            <Button disabled={loading} className="w-100" type="submit">
                                Sign Up
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Already have an account? <Link to="/login">Log In</Link>
                </div>
            </CenteredContainer>
        </>
    )
}
