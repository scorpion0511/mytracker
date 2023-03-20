import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ROW from 'react-bootstrap/ROW'; 
import COL from 'react-bootstrap/COL'; 


const ListTasks = (props) => {
   const [displayText, setDisplayText] = useState([{myKey:0, name:'', hour:0, min:0, comment:''}]);

   const updateMatchingRow = (rows, task) =>
   {
       let foundIt = false;
       for (let i = 0; i < rows.length; i++) {
         if (rows[i].name == task.name && rows[i].myKey == task.myKey && task.myKey !=0 && props.updateState == 'U') 
         {
            rows[i] = copy(task);
            foundIt = true;
            break;
         }
       }
       if (!foundIt && task.name.trim().length > 0)
       {
        rows = [copy(task), ...rows]
       }
       return rows;
   }
      //keep tacks of x
      //don't run unless props changed
     useEffect(() => {
      const rows = updateMatchingRow (displayText, props.task);
            setDisplayText(rows);
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
     copy.myKey = task.myKey == 0 ? Date.now() : task.myKey;
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

    displayText.forEach(item => {
    const index = aggregatedArray.findIndex(x => x.name === item.name);
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
    const sum = displayText.reduce((accumulator , currentValue) => 
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
    const sum = displayText.reduce((accumulator , currentValue) => 
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
    displayText.splice(deletedRowHighlighted, 1);
    if (deletedRowHighlighted == selectedRowHighlighted )
    {
      setSelectedRowHighlighted(-1);
      props.clear();
    }
    setDeletedRowHighlighted(-1);
  }
  const getRows = () =>
  {
    return displayText.filter(element => element.name.length > 0);
  }
  return (
    getRows().length > 0 ?
    (<Container className={props.className}>
      <ROW>
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
      </ROW>
      <ROW className='App'>
       <COL>
      <Button className="text-uppercase btn-outline-success gap"  variant='none' onClick={calculate}>
            calculate Time
      </Button>
      </COL>
      
      <COL>
      <Button className="text-uppercase btn-outline-success gap"  variant='none' onClick={listView}>
            list tasks
      </Button>
      </COL>

      <COL>
       <Button className="text-uppercase btn-outline-danger gap"  variant='none' onClick={deleteRow}>
            Delete
      </Button>
      </COL>

      </ROW>
    </Container>) :''
  );
};
export default ListTasks;