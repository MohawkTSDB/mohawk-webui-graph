import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap'
import "patternfly/dist/css/patternfly.css";
import "patternfly/dist/css/patternfly-additions.css";
import MetricsTab from './MetricsTab.js'
import ConfigurationTab from './ConfigurationTab.js'

export const DEFAULT_URL = 'http://localhost:8080';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: DEFAULT_URL,
      tenants: []
    }
  }

  getTenants() {
    fetch(this.state.url + '/hawkular/metrics/tenants').then(response => {
      if (response.status !== 200) {
        console.log("Something went wrong! Got respsonse status " + response.status)
        return [];
      }

      response.json().then(data => {
        console.log(data);
        return data;
      });
    });
  }

  getUrlFromUser = (newURL) => {
    this.setState({
      url: newURL,
      tenants: this.getTenants()
    });
  }

  render() {
    return (
      <div className="App">
       <Tabs defaultActiveKey={1} id="tab-menu">
         <Tab eventKey={1} title="Metrics">{<MetricsTab tenants={this.state.tenants} url={this.state.url}/>}</Tab>
         <Tab eventKey={2} title="Alerts"></Tab>
         <Tab eventKey={3} title="Configuration">{<ConfigurationTab changeConfigCallback={this.getUrlFromUser}/>}</Tab>
       </Tabs>
      </div>
    );
  }
}

export default App;
