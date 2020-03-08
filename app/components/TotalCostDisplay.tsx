import React from 'react';

const totalCostStyle = {
  margin: '25px 0 25px 0',
};

const totalCostValStyle = {
  color: 'palevioletred',
  textShadow:
    '-1px 0 #aaacaf38, 0 1px #aaacaf38, 1px 0 #aaacaf38, 0 -1px #aaacaf38',
};

const TotalCostDisplay = (props: {
  totalCost: React.ReactNode;
}): JSX.Element => {
  return (
    <div className="ui centered grid" style={totalCostStyle}>
      <div className="ui padded segment">
        <div className="ui statistic">
          <div className="value" style={totalCostValStyle}>
            ${props.totalCost}
          </div>
          <div className="label" style={totalCostValStyle}>
            Total Cost
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalCostDisplay;
