<div style={{ height: '260px', overflowY: 'scroll' }}>
  <ListGroup>
    {
      tasks.map(
                 (text, index) =>
                   (<ListGroup.Item  
                        key={index}>{text.name}-{text.hour}:{text.min}[{text.comment}] 
                       </ListGroup.Item>)
                 )
    }
   </ListGroup>
</div>
