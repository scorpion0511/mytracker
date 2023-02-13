import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import ListTasks from './ListTasks';
import ROW from 'react-bootstrap/ROW'; 
import COL from 'react-bootstrap/COL'; 
const Main = (props) => {
    return (
      <>
     
     <Container className= {props.className}>
      <ROW>
      <COL>
        <Form>
          <Form.Group  controlId="formTaskName">
            <Form.Label>Task Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name or #" />
          </Form.Group>
          <Form.Group className="w-50" controlId="formTaskTime">
            <Form.Label className="control-block-label">Hour:Min</Form.Label>
            <Form.Control
              type="text"
              placeholder="HH"
              className="control-inline"
            />
            <Form.Label className="control-dot">:</Form.Label>
            <Form.Control
              className="control-inline"
              type="text"
              placeholder="MI"
            />
          </Form.Group>
          <Form.Group  controlId="formComment">
            <Form.Label>Comment</Form.Label>
            <Form.Control type="text" placeholder="Enter Comment" />
            <Form.Text className="text-muted">
              You can write a short comment.
            </Form.Text>
          </Form.Group>
        </Form>
        </COL><COL >
      <ListTasks  className = "list-border"/></COL></ROW>
      </Container>
      
      </>
    );
}

export default Main;
