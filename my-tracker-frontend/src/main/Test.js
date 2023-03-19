import React, { useState } from 'react';
import ListTasks from './ListTasks';
import ListFilter from './ListFilter';
import Main from './Main';

function Test() {
const isLogged = true;
  return (
    isLogged ? <ListFilter/>: <Main/> 
  );
}

export default Test;
