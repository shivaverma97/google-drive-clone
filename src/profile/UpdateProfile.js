import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Card, Alert } from "react-bootstrap"

export default function UpdateProfile() {
    const emailRef = useRef()
    const passRef = useRef()
    const repeatPassRef = useRef()
    const { currentUser, updateUserEmail, updateUserPassword } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleOnSubmit(e) {
        e.preventDefault()

        if (passRef.current.value !== repeatPassRef.current.value) {
            return setError('Password do not match')
        }

        const promises = []
        setError('')
        setLoading(true)

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateUserEmail(currentUser, emailRef.current.value))
        }
        if (passRef.current.value !== currentUser.password) {
            promises.push(updateUserPassword(currentUser, passRef.current.value))
        }
        Promise.all(promises).then(() => {
            navigate("/")
        })
            .catch((ex) => {
                setError(`Failed to update account details ${ex}`)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleOnSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                ref={emailRef}
                                required
                                defaultValue={currentUser.email}
                            />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                ref={passRef}
                                placeholder="Leave blank to keep the same"
                            />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control
                                type="password"
                                ref={repeatPassRef}
                                placeholder="Leave blank to keep the same"
                            />
                        </Form.Group>
                        <br/>
                        <Button disabled={loading} className="w-100" type="submit">
                            Update
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/">Cancel</Link>
            </div>
        </>
    )
}
