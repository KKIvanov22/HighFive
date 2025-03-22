import React from 'react';
import './App.css'; // Import a CSS file for styling

const App = () => {
  return (
    <div className="background-container">
      <div className="ui-overlay">
        <h1>Transparent UI</h1>
        <p>This is a transparent UI element on top of a background image.</p>
      </div>
    </div>
  );
};

export default App;