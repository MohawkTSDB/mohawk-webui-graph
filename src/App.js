import React, { Component } from 'react';
import { LineChart, Button } from 'patternfly-react';
import "patternfly/dist/css/patternfly.css";
import "patternfly/dist/css/patternfly-additions.css";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      lineChartConfigData: {
        json: [],
        keys: {
          x: 'timestamp',
          value: ['value']
        },
        axis: {
            x: {
                type: 'timeseries',
            }
        }
      }
  };

    this.query = this.query.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({inputValue: event.target.value})
  }

  query(event) {
    let url = 'http://localhost:8080/hawkular/metrics/gauges/' + this.state.inputValue+ '/raw'
    fetch(url).then(response => {
      if (response.status !== 200) {
        console.log("Something went wrong! Got respsonse status " + response.status)
        return ;
      }

      response.json().then(data => {
          this.setState({lineChartConfigData:
            {
              json: data,
              keys: {
                x: 'timestamp',
                value: ['value']
              },
              axis: {
                  x: {
                      type: 'timeseries',
                  }
              }
            }
          });
          return;
      });
    });
  }

  render() {
    return (
      <div className="App">
        <form name="queryForm" id="query-form">
          <div className="query">
            <b>Query:</b>
            <input id="query-text" value={this.state.inputValue} onChange={this.handleInputChange}/>
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
            data={this.state.lineChartConfigData}
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
