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
         if (rows[i].name.toUpperCase() == task.name.toUpperCase() && rows[i].myKey == task.myKey && task.myKey !==0) 
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
     const myTasks = aggregateTasks();
     myTasks.forEach(element => {
      if (element.hour > 0)
      {
          display += element.name + ": " + element.hour.toFixed(2) + "\n";
      }
      else
      {
        display += element.name + ": 0." + element.min + "\n";
      }
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
      let hr = parseInt(item.hour);
      const mn = parseInt(item.min);

        if (index === -1) 
        {
          aggregatedArray.push({ name: item.name, hour: hr + mn/60, min: 0 });
        } 
        else 
        {
          aggregatedArray[index].min  = aggregatedArray[index].min + mn;
          aggregatedArray[index].hour  = aggregatedArray[index].hour + hr + aggregatedArray[index].min/60;
          aggregatedArray[index].min = 0;
        }
    }
  });
  return aggregatedArray;
  }
  const calculateHour = (myTasks) =>
  {
    const sum = myTasks.reduce((accumulator , currentValue) => 
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
  const calculateMin = (myTasks) =>
  {
    const sum = myTasks.reduce((accumulator , currentValue) => 
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
  const calculateAndDisplay = () =>
  {
      alert(calculate(tasks));
  }
  const calculate = (myTasks) =>
  {
      const minToHours = calculateMin(myTasks) / 60 ;
      const hours = calculateHour(myTasks) + minToHours;
      return(hours.toFixed(2) + ' Hours');
  }
  const [selectedRowHighlighted, setSelectedRowHighlighted] = useState(null);
  const [deletedRowHighlighted, setDeletedRowHighlighted] = useState(null);

  const deleteRow = () =>
  {
    tasks.splice(deletedRowHighlighted, 1);
    if (deletedRowHighlighted === selectedRowHighlighted )
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
    // using container service to connect didn't work tracker-frontend-service
    //connecting to container
    //http://localhost:8500/tracker/api/save

    //connecting to pod
    //fetch('http://tracker-backend-service:8500/tracker/api/save', {
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
    if (range =='' || range === 'undefined'|| range === null)
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
   const { id, tasks } = data;
   setTasks(tasks);
   if (id === 0 || id === null)
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
      <div style={{ height: '260px', overflowY: 'scroll' }}>
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
      </div>
      </Row>
      <Row className='App'>
       <Col>
      <Button className="text-uppercase btn-outline-success  btn-sm gap"  variant='none' onClick={calculateAndDisplay}>
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