import React, { useState } from 'react';

function ListFilter() {
  const [selectedItem, setSelectedItem] = useState(null);

  const items = [
    { id: 1, name: 'Item 1', category: 'Category A' },
    { id: 2, name: 'Item 2', category: 'Category A' },
    { id: 3, name: 'Item 3', category: 'Category B' },
    { id: 4, name: 'Item 4', category: 'Category B' },
    { id: 5, name: 'Item 5', category: 'Category C' },
  ];
  const filteredItems = selectedItem ? items.filter(item => item.category === selectedItem) : items;
  const handleSelectItem = (category) => {
    setSelectedItem(category);
  };

  return (
    <div>
      <h2>Select a category:</h2>
      <ul>
        <li onClick={() => handleSelectItem(null)}>All Categories</li>
        <li onClick={() => handleSelectItem('Category A')}>Category A</li>
        <li onClick={() => handleSelectItem('Category B')}>Category B</li>
        <li onClick={() => handleSelectItem('Category C')}>Category C</li>
      </ul>
      <h2>Items:</h2>
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListFilter;
