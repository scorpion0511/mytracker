import { useEffect, useState } from 'react';


const [tasks, setTasks] = useState([]);
useEffect(() => {
      if (props.week.trim().length > 0)
      {
            const newTasks = updateMatchingRow ();
            setTasks(newTasks);
            console.log('count:' +newTasks.length + ' ' +newTasks[0].name + ' ' + newTasks[0].hour +' ' + newTasks[0].min+' ' + newTasks[0].comment);
                      
      }
      }, [props.task]);


      const updateMatchingRow = () =>
      {
             let newTasks = [...tasks];
             let foundIt = false;
             for (let i = 0; i < tasks.length; i++) {
               if (newTasks[i].name.toUpperCase() == props.task.name.toUpperCase()) 
               {
                  newTasks[i] = copy(props.task);
                  foundIt = true;
                  break;
               }
             }
             if (!foundIt && props.task.name.trim().length > 0)
             {
              newTasks = [copy(props.task), ...tasks]
             }
             return newTasks;
         }
   const copy = (task) =>
   {
      const copy = {};
      copy.name =  task.name;
      copy.hour = task.hour;
      copy.min = task.min;
      copy.comment = task.comment;
      copy.myKey = task.myKey === 0 ? Date.now() : task.myKey;
      return copy;
   }   
 
