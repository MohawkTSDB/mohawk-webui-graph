import React, { Component } from 'react';
import { LineChart, Button } from 'patternfly-react';
import { DropdownButton, MenuItem } from 'react-bootstrap'
import "patternfly/dist/css/patternfly.css";
import "patternfly/dist/css/patternfly-additions.css";

class MetricsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      data: [],
      activeTenant: '_ops',
    };

    this.query                   = this.query.bind(this);
    this.handleTenantChange      = this.handleTenantChange.bind(this);
    this.handleInputChange       = this.handleInputChange.bind(this);
  }

  /**
  * Callback for handling query input change.
  */
  handleInputChange(event) {
    this.setState({inputValue: event.target.value})
  }

  /**
  * Callback for handling tenant dropdown change.
  */
  handleTenantChange(event,eventKey) {
    this.setState({activeTenant: eventKey.target.id})
  }

  /**
  * This is the main query method to query mohawk for data.
  * Response is rendered as a chart.
  */
  query(event) {
    let url =  this.props.url + '/hawkular/metrics/gauges/' + this.state.inputValue + '/raw'
    let requestOptions = {
      headers: new Headers({
        'Hawkular-Tenant': this.state.activeTenant
      }),
    };
    fetch(url, requestOptions).then(response => {
      if (response.status !== 200) {
        console.log("Something went wrong! Got respsonse status " + response.status)
        return ;
      }
      response.json().then(data => {
          this.setState({data: data});
          return;
      });
    });
  }

  render() {
    const tenants = this.props.tenants;
    const tenants_button_list = tenants.map((tenant, index) => {
      return <MenuItem key={index} id={tenant} onSelect={this.handleTenantChange}>{tenant}</MenuItem>
    });

    return (
      <div className="tab">
        <form name="queryForm" className="query-form">
          <div className="query">
            <b>Query:</b>
            <input id="query-text" value={this.state.inputValue} onChange={this.handleInputChange}/>
            <Button
              className="input-button"
              onClick={this.query}
            >
              Execute
            </Button>
            <DropdownButton id="dropdown-tenant" title={"Tenants"}>
             {tenants_button_list}
            </DropdownButton>
          </div>
        </form>
        <div className="chart">
          <LineChart
            id="line-chart-2"
            type="line"
            data={{
              json: this.state.data,
              keys: {
                x: 'timestamp',
                value: ['value']
              },
            }}
            axis ={{
                x: {
                    type: 'timeseries',
                    tick: {
                      format: '%Y-%m-%d %H:%M'
                    },
                },
            }}
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
    )
  }
}

export default MetricsTab;
