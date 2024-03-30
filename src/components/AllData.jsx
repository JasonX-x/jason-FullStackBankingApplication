import { useUserData } from '../UserDataContext';
import { Card } from 'react-bootstrap';

const AllData = () => {
  const { userData } = useUserData();

  return (
    <Card className="m-4">
      <Card.Body>
        <Card.Title>User Submissions</Card.Title>
        <ul className='text-left'>
          {userData && 
            <>
              <li ><b>Name: </b>{userData.name}</li>
              <li ><b>Email: </b>{userData.email}</li>
              <li ><b>Balance: </b>{userData.balance}</li>
            </>
            
          }
        </ul>
      </Card.Body>
    </Card>
  );
};

export default AllData;
