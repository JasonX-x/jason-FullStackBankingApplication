import { Card } from "react-bootstrap";
import Bank from '../assets/bank.png'
const Home = () => {
  return (
    <Card className="text-center m-4">
      <Card.Header>Welcome to the Bank</Card.Header>
      <Card.Body>
        <Card.Title>Secure & Reliable Banking</Card.Title>
        <Card.Img src={Bank} height={100} width={100} className="p-8"/>
        <Card.Text>
          Join us and experience the next generation of banking.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Home;
