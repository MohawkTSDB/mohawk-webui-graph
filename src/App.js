import React, { Component } from 'react';
import { LineChart } from 'patternfly-react';

const lineChartDataColumns = [
    ['data1', 30, 200, 100, 400, 150, 250],
    ['data2', 50, 220, 310, 240, 115, 25],
    ['data3', 70, 100, 390, 295, 170, 220],
    ['data4', 10, 340, 30, 290, 35, 20],
    ['data5', 90, 150, 160, 165, 180, 5]
];
const lineChartConfigData = {
    columns: lineChartDataColumns
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="chart">
          <LineChart
              id="line-chart-2"
              type="spline"
              data={lineChartConfigData}
              grid={{
                y: {
                  show: false
                },
              }}
              point={{
                  show: false
              }}
          />
        </div>
      </div>
    );
  }
}

export default App;
