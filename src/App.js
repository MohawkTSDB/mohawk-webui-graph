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
    this.getTenants = this.getTenants.bind(this);
    this.getUrlFromUser = this.getUrlFromUser.bind(this);
  }

  /**
   * Fetch a list of tenants from tenants_endpoint and change state accordingly.
   * This method is called at any change of mohawk endpoint in Configuration Tab.
   */
  getTenants() {
    const tenants_endpoint = '/hawkular/metrics/tenants'
    fetch(this.state.url + tenants_endpoint).then(response => {
      if (response.status !== 200) {
        console.log("Something went wrong! Got respsonse status " + response.status)
        return ;
      }
      response.json().then(data => {
        // collect tenants from response.
        let tenant_list = [];
        data.forEach(tenant => {
          tenant_list.push(tenant.id);
        });
        this.setState({
          tenants: tenant_list,
        });
      });
    });
  }

  /**
   * This callback is called at any change of url under the Configuration Tab thus changing the mohawk endpoint.
   * See ConfigurationTab props.
   */
  getUrlFromUser = (newURL) => {
    this.setState({
      url: newURL,
    }, () => {
      // update the tenants list once the url has been updated.
      this.getTenants();
    });
  }

  componentDidMount(){
    // get tenants upon mounting the component.
    this.getTenants();
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
