import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import ListTasks from './ListTasks';
import ROW from 'react-bootstrap/ROW'; 
import COL from 'react-bootstrap/COL'; 
import Footer from '../footer/Footer';
import { useState } from 'react';
import Header from '../header/Header';

const Main = (props) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [min, setMin] = useState('');
  const [hour, setHour] = useState('');
  const [deleteHiglight, setDeleteHiglight] = useState('');
  let [addition, setAddition] = useState('');
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  const handleHourChange = (event) => {
    setHour(event.target.value);
  };
  const handleMinChange = (event) => {
    setMin(event.target.value);
  };
  const add = (event) => {
    if (validate ())
    { 
        setAddition(name + ":" + hour + ":" +min + ":" + comment);
    }
  };
  const populate = (data) => 
  {
    setName(data.split(':')[0]);
    setHour(data.split(':')[1]);
    setMin(data.split(':')[2]);
    setComment(data.split(':')[3]);
  }
  const clearDisplay = () => {
    setName('');
    setHour('0');
    setMin('0');
    setComment('');
    setDeleteHiglight(-1*deleteHiglight);//to cause useEffect to work when this value changes
  };
  
  const validate = () =>
  {
    let result = true;
    let error = 'Missing info:';
    if (name.trim() === '') 
    {
      result = false;
      error += ' Name';
    }
    if (hour == 0 && min == 0) 
    {
      result = false;
      error += ' Time';
    }
    if (!result)
    {
      alert(error);
    }
    return result;
  }
    return (
      <>
     <Container className= {props.className}>
      <ROW>
        <Header className='general-border' />
      <COL>
        <Form>
          <Form.Group  controlId="formTaskName">
            <Form.Label>Task Name</Form.Label>
            <Form.Control type="text" onChange={handleNameChange} value={name} placeholder="Enter name or #" />
          </Form.Group>
          <Form.Group className="w-50" controlId="formTaskTime">
            <Form.Label className="control-block-label">Hour:Min</Form.Label>
            <Form.Control
              type="number"
              step="1"
              min="0"
              max="24"
              placeholder="0"
              onChange={handleHourChange} value={hour}
              className="control-inline"
            />
            <Form.Label className="control-dot">:</Form.Label>
            <Form.Control
              className="control-inline"
              onChange={handleMinChange} value={min}
              type="Number"
              step="1"
              min="0"
              max="59"
              placeholder="0"
            />
          </Form.Group>
          <Form.Group  controlId="formComment">
            <Form.Label>Comment</Form.Label>
            <Form.Control type="text" onChange={handleCommentChange} value={comment}placeholder="Enter Comment" />
            <Form.Text className="text-muted">
              You can write a short comment.
            </Form.Text>
          </Form.Group>
          <Footer className="general-border calculate" add = {add} clear = {clearDisplay} />
        </Form>
        </COL><COL >
      <ListTasks  className = "list-border" data= {addition} populate={populate} clear = {clearDisplay} delHiglight = {deleteHiglight}/></COL></ROW>
      </Container>
      </>
    );
}

export default Main;
