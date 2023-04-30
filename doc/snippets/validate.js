const validate = () =>
  {
    let result = true;
    let error = 'Missing info:';
    if (task.name.trim() === '') 
    {
      result = false;
      error += ' [Task Name]';
    }
    
    if (task.hour === 0 || task.min === 0) 
    {
      result = false;
      error += ' [Time Spent]';
    }
    
    if (selectedDate === '') 
    {
      result = false;
      error += ' [Date]';
    } 
    if (!result)
    {
      alert(error);
    }
    return result;
  }