import { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useUserData } from '../UserDataContext';
import {  useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);
  const {addUserData, setIsLoggedIn, setAmount} = useUserData()
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = [];
    if (!email) newErrors.push('Email is required');
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      
      fetch('https://banking-backend-dogj.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      })
      .then((res)=>res.json())
      .then((data)=>{
        addUserData(data.user)
        setAmount(data.user.balance)
        setSubmitted(true);
        setEmail('');
        setPassword('');
        navigate('/')
        setIsLoggedIn(true)

        localStorage.setItem('token', data.token)
      })
      
    }
  };


  return (
    <Card className="m-4 w-[600px]">
      <Card.Body>
        <Card.Title>Create Account</Card.Title>
        {submitted ? (
          <>
            <Alert variant="success">Login Success!</Alert>
          </>
        ) : (
          <Form onSubmit={handleSubmit}>
            {errors.length > 0 && (
              <Alert variant="danger">
                {errors.map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </Alert>
            )}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={errors.includes('Email is required')}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={errors.includes('Password must be at least 8 characters long')}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={!email && !password}>
              Login
            </Button>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
};

export default Login;
