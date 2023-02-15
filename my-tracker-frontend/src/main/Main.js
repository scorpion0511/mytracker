import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import ListTasks from './ListTasks';
import ROW from 'react-bootstrap/ROW'; 
import COL from 'react-bootstrap/COL'; 
import Footer from '../footer/Footer';
import { useState } from 'react';

const Main = (props) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [min, setMin] = useState('');
  const [hour, setHour] = useState('');
  const [note, setNote] = useState({});
  let [addition, setAddition] = useState({});
  const handleNameChange = (event) => {
    note.objName = event.target.value
    setName(note.objName);
  };
  const handleCommentChange = (event) => {
    note.objComment = event.target.value
    setComment(note.objComment);
  };
  const handleHourChange = (event) => {
    note.objHour = event.target.value
    setHour(note.objHour);
  };
  const handleMinChange = (event) => {
    note.objMin = event.target.value
    setMin(note.objMin);
  };
  const handleAddition = (event) => {
    setAddition({...note});
  };
    return (
      <>
     <Container className= {props.className}>
      <ROW>
      <COL>
        <Form>
          <Form.Group  controlId="formTaskName">
            <Form.Label>Task Name</Form.Label>
            <Form.Control type="text" onChange={handleNameChange} value={name} placeholder="Enter name or #" />
          </Form.Group>
          <Form.Group className="w-50" controlId="formTaskTime">
            <Form.Label className="control-block-label">Hour:Min</Form.Label>
            <Form.Control
              type="text"
              placeholder="HH"
              onChange={handleHourChange} value={hour}
              className="control-inline"
            />
            <Form.Label className="control-dot">:</Form.Label>
            <Form.Control
              className="control-inline"
              onChange={handleMinChange} value={min}
              type="text"
              placeholder="MI"
            />
          </Form.Group>
          <Form.Group  controlId="formComment">
            <Form.Label>Comment</Form.Label>
            <Form.Control type="text" onChange={handleCommentChange} value={comment}placeholder="Enter Comment" />
            <Form.Text className="text-muted">
              You can write a short comment.
            </Form.Text>
          </Form.Group>
          <Footer className="general-border calculate" callback = {handleAddition}/>
        </Form>
        </COL><COL >
      <ListTasks  className = "list-border" data = {addition}/></COL></ROW>
      </Container>
      </>
    );
}

export default Main;
