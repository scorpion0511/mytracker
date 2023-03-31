import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col'; 


const ListTasks = (props) => {
   const [tasks, setTasks] = useState([]);
   const [week, setWeek] = useState({range:'', id: 0});

   const updateMatchingRow = (rows, task) =>
   {
       let foundIt = false;
       for (let i = 0; i < rows.length; i++) {
         if (rows[i].name.toUpperCase() == task.name.toUpperCase() && rows[i].myKey == task.myKey && task.myKey !=0) 
         {
            rows[i] = copy(task);
            foundIt = true;
            break;
         }
       }
       if (!foundIt && task.name.trim().length > 0)
       {
        task.myKey = Date.now();
        rows = [copy(task), ...rows]
       }
       return rows;
   }
      //keep tacks of x
      //don't run unless props changed
     useEffect(() => {
      const rows = updateMatchingRow (tasks, props.task);
            setTasks(rows);
            setSelectedRowHighlighted(-1);
            props.clear();
      }, [props.flag]);

      useEffect(() => {
        setSelectedRowHighlighted(-1);
      }, [props.delHiglight]);

  const copy = (task) =>
  {
     const copy = {};
     copy.name =  task.name;
     copy.hour = task.hour;
     copy.min = task.min;
     copy.comment = task.comment;
     copy.myKey = task.myKey;
     return copy;
  }   

  const listView = () =>
  {
    let display = '';
     const tasks = aggregateTasks();
     tasks.forEach(element => {
      display += element.name + ":" + element.hour + ":" + element.min + '\n';
     });
     alert(display);
  }
  const aggregateTasks = () =>
  {
    const aggregatedArray = [];

    tasks.forEach(item => {
    const index = aggregatedArray.findIndex(x => x.name.toUpperCase() === item.name.toUpperCase());
    if (item.name.length > 0)
    {
        if (index === -1) {
          aggregatedArray.push({ name: item.name, hour: item.hour, min: item.min });
        } else {
          aggregatedArray[index].hour = parseInt(aggregatedArray[index].hour) + parseInt(item.hour);
          aggregatedArray[index].min  = parseInt(aggregatedArray[index].min) + parseInt(item.min);
        }
    }
  });
  return aggregatedArray;
  }
  const calculateHour = () =>
  {
    const sum = tasks.reduce((accumulator , currentValue) => 
    {
        const value = parseInt(currentValue.hour);
        if (isNaN(value)) 
        {
          return accumulator;
        } 
        else
        {
          return accumulator + value;
        }
    }, 0);
    return sum;
  }
  const calculateMin = () =>
  {
    const sum = tasks.reduce((accumulator , currentValue) => 
    {
        const value = parseInt(currentValue.min);
        if (isNaN(value)) 
        {
          return accumulator;
        } 
        else
        {
          return accumulator + value;
        }
    }, 0);
    return sum;
  }
  const calculate = () =>
  {
      const minToHours = calculateMin() / 60 ;
      const hours = calculateHour() + minToHours;
      alert(hours.toFixed(2) + ' Hours');
  }
  const [selectedRowHighlighted, setSelectedRowHighlighted] = useState(null);
  const [deletedRowHighlighted, setDeletedRowHighlighted] = useState(null);

  const deleteRow = () =>
  {
    tasks.splice(deletedRowHighlighted, 1);
    if (deletedRowHighlighted == selectedRowHighlighted )
    {
      setSelectedRowHighlighted(-1);
      props.clear();
    }
    setDeletedRowHighlighted(-1);
  }
  const closeWeek = (e) =>
  {
    save(e);
    tasks.length = 0;
    tasks.splice(deletedRowHighlighted, 1);
    setSelectedRowHighlighted(-1);
    setDeletedRowHighlighted(-1);
    props.closeWeek();
  }
  const save = (e) => {
    const week = props.week.range;
    const id = props.week.id;
    // using container service to connect didn't work
    fetch('http://localhost:8500/tracker/api/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({ id, week, tasks})
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
      .then(data => props.updateWeekId(data))
      .catch(error => alert(error))
      ;
  };


  const load = (e) => {
    const range = props.week.range;
    if (range =='' || range == 'undefined'|| range == null)
    {
      alert ('Please, Enter Date');
      return;
    }
     fetch(`http://localhost:8500/tracker/api/get?week=${range}`, {
   method: 'GET',
   headers: {
     'Content-Type': 'application/json',
     'accept': 'application/json'
   }
 })
 .then(response => response.json())
 .then(data => {
   const { week, id, tasks } = data;
   setTasks(tasks);
   if (id == 0 || id == null)
   {
       alert("Week doesn't exist.");
   }
   props.updateWeekId(id)
 })
 .catch(error => alert(error));
 
   };


  const getRows = () =>
  {
    return tasks.filter(element => element.name.length > 0);
  }
  return (
  <Container className={props.className}>
      <Row>
      <ListGroup>
        {getRows().map((text, index) => (
          <ListGroup.Item 
          
          style={{
            
            fontWeight: selectedRowHighlighted === index ? 'bold' : 'normal',

            backgroundColor: deletedRowHighlighted === index ? 'cyan' : 'white'
          }}
          
          onDoubleClick={() => {props.populate(text); setSelectedRowHighlighted(index);}}  

          onClick={() => setDeletedRowHighlighted(index)} 
          
          key={index}>{text.name}-{text.hour}:{text.min}[{text.comment}]</ListGroup.Item>
        ))}
      </ListGroup>
      </Row>
      <Row className='App'>
       <Col>
      <Button className="text-uppercase btn-outline-success  btn-sm gap"  variant='none' onClick={calculate}>
            calculate
      </Button>
      </Col>
      
      <Col>
      <Button className="text-uppercase btn-outline-success  btn-sm gap"  variant='none' onClick={listView}>
            list
      </Button>
      </Col>
      <Col>
      <Button className="text-uppercase  btn-outline-dark  btn-sm gap" variant='none' onClick={save}>
              save
            </Button>
            </Col>
      <Col>
       <Button className="text-uppercase btn-outline-danger  btn-sm gap"  variant='none' onClick={deleteRow}>
            remove
      </Button>
      </Col>
      <Col>
       <Button className="text-uppercase btn-outline-primary  btn-sm gap"  variant='none' onClick={closeWeek}>
            close
      </Button>
      </Col>

      <Col>
       <Button className="text-uppercase btn-outline-warning  btn-sm gap"  variant='none' onClick={load}>
            load
      </Button>
      </Col>
      </Row>
    </Container>
  );
};
export default ListTasks;