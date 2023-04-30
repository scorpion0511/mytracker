import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col'; 


const ListTasks = (props) => {
  return (
  <Container className={props.className}>
      <Row className='App'>
       <Col>
      <Button className="text-uppercase btn-outline-success  btn-sm gap"  variant='none' >
            calculate
      </Button>
      </Col>
      
      <Col>
      <Button className="text-uppercase btn-outline-success  btn-sm gap"  variant='none' >
            list
      </Button>
      </Col>
      <Col>
      <Button className="text-uppercase  btn-outline-dark  btn-sm gap" variant='none' >
              save
            </Button>
            </Col>
      <Col>
       <Button className="text-uppercase btn-outline-danger  btn-sm gap"  variant='none' >
            remove
      </Button>
      </Col>
      <Col>
       <Button className="text-uppercase btn-outline-primary  btn-sm gap"  variant='none' >
            close
      </Button>
      </Col>

      <Col>
       <Button className="text-uppercase btn-outline-warning  btn-sm gap"  variant='none'>
            load
      </Button>
      </Col>
      </Row>
    </Container>
  );
};
export default ListTasks;