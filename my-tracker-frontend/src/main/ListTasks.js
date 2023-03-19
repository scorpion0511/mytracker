import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ROW from 'react-bootstrap/ROW'; 
import COL from 'react-bootstrap/COL'; 


const ListTasks = (props) => {
   const [displayText, setDisplayText] = useState([]);

   const updateMatchingRow = (rows, task) =>
   {
       const found = rows.filter(row => row.split(':')[0] == task.split(':')[0]);   
       let foundIt = false;
       for (let i = 0; i < rows.length; i++) {
         if (rows[i].split(':')[0] == task.split(':')[0]) {
            rows[i] = task;
            foundIt = true;
         }
       }
       if (!foundIt)
       {
        rows = [task, ...rows]
       }
       return rows;
   }
      //keep tacks of x
      //don't run unless props changed
     useEffect(() => {
      const rows = updateMatchingRow (displayText, props.data);
            setDisplayText(rows);
            setSelectedRowHighlighted(-1);
            props.clear();
      }, [props.data]);

      useEffect(() => {
        setSelectedRowHighlighted(-1);
      }, [props.delHiglight]);

  const calculateHour = () =>
  {
    const sum = displayText.reduce((accumulator , currentValue) => 
    {
        const value = parseInt(currentValue.split(':')[1]);
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
        const value = parseInt(currentValue.split(':')[2]);
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

  return (
    <Container className={props.className}>
      <ROW>
      <ListGroup>
        {displayText.map((text,index) => (
          <ListGroup.Item 
          
          style={{
            
            fontWeight: selectedRowHighlighted === index ? 'bold' : 'normal',

            backgroundColor: deletedRowHighlighted === index ? 'cyan' : 'white'
          }}
          
          onDoubleClick={() => {props.populate(text); setSelectedRowHighlighted(index);}}  

          onClick={() => setDeletedRowHighlighted(index)} 
          
          key={index}>{text}</ListGroup.Item>
        ))}
      </ListGroup>
      </ROW>
      <ROW>
        <COL>
      <Button className="text-uppercase btn-bg btn-outline-success"  variant='none' onClick={calculate}>
            calculate Time
      </Button>
      </COL>
      <COL> <Button className="text-uppercase btn-bg btn-outline-danger"  variant='none' onClick={deleteRow}>
            Delete
      </Button></COL>
      </ROW>
    </Container>
  );
};
export default ListTasks;