import React from 'react';

function Header({title, onAdd, showAdd}) {
  return (
    <header className="header">
      <h1>{title}</h1>
    </header>
  );
}

Header.defaultProps = {
  title: 'Task Tracker'
};

export default Header;

// style={{backgroundColor:"black",color:"red"}}
