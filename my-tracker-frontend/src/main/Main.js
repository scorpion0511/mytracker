import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import ListTasks from './ListTasks';
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col'; 
import Footer from '../footer/Footer';
import { useState } from 'react';
import Header from '../header/Header';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import { properties } from './messageProperties';

const Main = (props) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [min, setMin] = useState('');
  const [hour, setHour] = useState('');
  const [myKey, setMyKey] = useState(0);
  const [deleteHiglight, setDeleteHiglight] = useState('');
  const [flag, setFlag] = useState('');
  const [week, setWeek] = useState({range:'', id: 0});
  const [task, setTask] = useState({myKey:0, name:'',hour:0,min:0,comment:''});
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  const handleMyKeyChange = (event) => {
    setMyKey(event.target.value);
  };
  const handleHourChange = (event) => {
    setHour(event.target.value);
  };
  const handleMinChange = (event) => {
    setMin(event.target.value);
  };
  const update = (event) => {
    prepareTaskData();
  };
  const prepareTaskData = () =>
  {
    if (validate ())
    { 
      task.name = name;
      task.hour = hour;
      task.comment = comment;
      task.min = min; 
      task.myKey = myKey;
      setFlag(name+hour+min+comment);
      setTask(task); //not needed for listTask repaint as react will repaint child because of myKey change
    }
  }
  const updateWeekId = (weekId) => 
  {
    if (typeof weekId === 'number' && !isNaN(weekId) && Number.isInteger(weekId))
    {
      week.id = weekId;
    }
  }
  const populate = (data) => 
  {
    setName(data.name);
    setHour(data.hour);
    setMin(data.min);
    setMyKey(data.myKey); 
    setComment(data.comment);
  }
  const closeWeek = () => {
      setSelectedDate(null);
      setWeek({id:0,range:''});
      clearDisplay();
  }
  const clearDisplay = () => {
    setName('');
    setHour(0);
    setMin(0);
    setComment('');
    setMyKey(0); //calling setMyKey will lead repaint and calling of clearDisplay again [unpredicated work]
    setDeleteHiglight(-1*deleteHiglight);//to cause useEffect to work when this value changes
  };
 
  const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
    
        const startOfWeek = moment(date).startOf('isoWeek');
        const endOfWeek = moment(date).endOf("isoWeek");
        const weekText = startOfWeek.format("D") + "-" + endOfWeek.format("D") + "/" + startOfWeek.format("MM") + "/" + startOfWeek.format("YYYY");
        setSelectedDate(date);
        setWeek({id:0,range:weekText});

      };
  const validate = () =>
  {
    let result = true;
    let error = properties.missingInfo;
    if (name.trim() === '') 
    {
      result = false;
      error += properties.missingName;
    }
    
    if (hour === 0 && min === 0) 
    {
      result = false;
      error += properties.missingTime;
    }
    
    if (selectedDate == null || selectedDate === '') 
    {
      result = false;
      error += properties.missingDate;
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
      <Row>
        <Header className='general-border' />
        <Form.Group  controlId="formTaskName">
            <Form.Label>Pick Date</Form.Label> 
            <DatePicker className='datePicker' selected={selectedDate} onChange={date => handleDateChange(date)}/>
          </Form.Group>
        
      <Col>
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
          <Form.Group style={{ display: 'none' }} controlId="formKey">
          <Form.Control  type="text" value={myKey} onChange={handleMyKeyChange}/></Form.Group>
          <Footer className="general-border center calculate"  update = {update} clear = {clearDisplay} />
        </Form>
        </Col><Col >
      <ListTasks  className = "list-border" updateWeekId={updateWeekId} week={week} flag={flag} closeWeek = {closeWeek} task={task} populate={populate} clear = {clearDisplay} delHiglight = {deleteHiglight}/></Col></Row>
      </Container>
      </>
    );
};export default Main;
