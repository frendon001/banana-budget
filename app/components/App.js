import React, { Component } from 'react';
import BananaBudgetForm from './forms/BananaBudgetForm';
import TotalCostDisplay from './TotalCostDisplay';
import axios from 'axios';

const headerStyle = {
  color: '#fbdd62',
  textAlign: 'center',
  margin: '25px 0 25px 0',
  textShadow:
    '-1px 0 #22242638, 0 1px #22242638, 1px 0 #22242638, 0 -1px #22242638',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { totalCost: '' };
  }

  formatDate(dateString) {
    const dateArr = dateString.split('-');
    return dateArr[1] + '/' + dateArr[2] + '/' + dateArr[0];
  }

  onFormSubmit = async (date, days, setSubmitting) => {
    try {
      const res = await axios.get(
        `/api/bananaBudget/?startDate=${this.formatDate(
          date,
        )}&numberOfDays=${days}`,
      );

      if (res.data && res.data.totalCost) {
        this.setState({
          totalCost: res.data.totalCost,
        });
        return res.data.totalCost;
      } else {
        this.setState({
          totalCost: '',
        });
        return null;
      }
    } catch (error) {
      console.log(error);
      this.setState({
        totalCost: '',
      });
      return null;
    }
  };

  render() {
    return (
      <div className="ui centered grid">
        <div className="ten wide mobile six wide tablet four wide computer column">
          <h1 className="ui header" style={headerStyle}>
            Banana Budget
          </h1>
          <div className="ui message">
            <BananaBudgetForm handleFormSubmit={this.onFormSubmit} />
          </div>
          {this.state.totalCost ? (
            <TotalCostDisplay totalCost={this.state.totalCost} />
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

export default App;
