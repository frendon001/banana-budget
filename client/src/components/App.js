import React, { Component } from 'react';
import BananaBudgetForm from './forms/BananaBudgetForm';

const headerStyle = {
  color: '#fbdd62',
  textAlign: 'center'
};

class App extends Component {
  render() {
    return (
      <div className="ui container">
      <div className="ui centered grid">
      
        <div className="eight wide column">
        <h2 style={headerStyle}>Banana Budget</h2>
       
        <div className="ui message">
          <BananaBudgetForm />
        </div>
        
        </div>
        </div>
      </div>
    );
  }
}

export default App;
