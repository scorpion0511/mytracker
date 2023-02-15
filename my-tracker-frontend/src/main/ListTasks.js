import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';


const ListTasks = (props) => {

    return (
      <Container className= {props.className}>
        <ListGroup>
      <ListGroup.Item>{props.data.objName} {props.data.objHour}:{props.data.objMin}  {props.data.objComment}</ListGroup.Item>
      <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
      <ListGroup.Item>Morbi leo risus</ListGroup.Item>
    </ListGroup>
      </Container>
    );
}

export default ListTasks;