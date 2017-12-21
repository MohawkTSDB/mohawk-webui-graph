import React, { Component } from 'react';
import { LineChart, Button } from 'patternfly-react';

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
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.query = this.query.bind(this);
  }


  query(event) {
    console.log("Querying.." + this.state.value);
  }

  render() {
    return (
      <div className="App">
        <form name="queryForm" id="query-form">
          <div className="query">
            <input id="query-text" value={this.state.value} />
          </div>
          <div className="query">
            <Button
              id="input-button"
              onClick={this.query}
            >
              Execute
            </Button>
          </div>
        </form>

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
