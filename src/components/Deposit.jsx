import { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useUserData } from '../UserDataContext';

const Deposit = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const {totalAmount, depositAmount} = useUserData()
  const token = localStorage.getItem('token')
  const handleDeposit = (e) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);

    if (isNaN(numAmount)) {
      setMessage('Please enter a valid number.');
      setShowAlert(true);
      return;
    }

    if (numAmount <= 0) {
      setMessage('The deposit amount must be positive.');
      setShowAlert(true);
      return;
    }

    fetch('http://localhost:3000/users/deposit', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({amount})
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data)
      depositAmount(data.balance);
      setMessage(`Deposit of $${numAmount} was successful!`);
    setShowAlert(true);
    setAmount(''); 
    })
  };

  const handleChange = (e) => {
    setShowAlert(false); 
    setAmount(e.target.value);
  };

  return (
    <Card className="m-4">
      <Card.Body>
        <Card.Title>Deposit</Card.Title>
        <Card.Text>
          Current Balance: ${totalAmount.toFixed(2)}
        </Card.Text>
        {showAlert && <Alert variant="info">{message}</Alert>}
        <Form onSubmit={handleDeposit}>
          <Form.Group className="mb-3" controlId="depositAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter deposit amount"
              value={amount}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={!amount}>
            Deposit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Deposit;
