import React, { Component, CSSProperties } from 'react';
import BananaBudgetForm from './forms/BananaBudgetForm';
import TotalCostDisplay from './TotalCostDisplay';
import axios from 'axios';

const headerStyle: CSSProperties = {
  color: '#fbdd62',
  textAlign: 'center',
  margin: '25px 0 25px 0',
  textShadow:
    '-1px 0 #22242638, 0 1px #22242638, 1px 0 #22242638, 0 -1px #22242638',
};

const promptStyle: CSSProperties = {
  color: '#2f2b2b',
  fontSize: '16px',
};
const boldStyle: CSSProperties = {
  fontWeight: 'bold',
};

interface State {
  totalCost: string;
}

class App extends Component<{}, State> {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  state: Readonly<State> = {
    totalCost: '',
  };

  formatDate(dateString: string): string {
    const dateArr = dateString.split('-');
    return dateArr[1] + '/' + dateArr[2] + '/' + dateArr[0];
  }

  onFormSubmit = async (date: string, days: number): Promise<string | null> => {
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

  render(): JSX.Element {
    return (
      <div className="ui container">
        <h1 className="ui header" style={headerStyle}>
          Banana Budget
        </h1>
        <div className="ui centered grid">
          <div
            className="twelve wide mobile ten wide tablet eight wide computer seven wide large screen column"
            style={promptStyle}
          >
            <p>
              Every day, Bob buys a banana from the same grocery store on his
              way to work. At this grocery store, bananas are priced in a
              dynamic, yet predictable way:
            </p>
            <ul className="ui list">
              <li>The first 7 days of the month bananas cost $0.05</li>
              <li>The second 7 days of the month, bananas cost $0.10</li>
              <li>The third 7 days of the month, bananas cost $0.15</li>
              <li>The fourth 7 days of the month, bananas cost $0.20</li>
              <li>
                Any remaining days of the month after that, bananas cost $0.25
              </li>
            </ul>
            <br></br>
            <p style={boldStyle}>
              Use the following calculator to obtain Bob&apos;s total cost for
              bananas
            </p>
          </div>
        </div>
        <div className="ui centered grid">
          <div className="ten wide mobile eight wide tablet seven wide computer six wide large screen column">
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
      </div>
    );
  }
}

export default App;
