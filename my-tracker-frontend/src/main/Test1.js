import React, { useState } from 'react';
import ListTasks from './ListTasks';
import ListFilter from './ListFilter';
import Main from './Main';

function Test1() {
  const item = <li>React</li>;
  return React.createElement ("ul" , {style:{"color":"yellow", "background-color":"blue"}}, "Courses", item);
}

export default Test1;
