import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap'
import "patternfly/dist/css/patternfly.css";
import "patternfly/dist/css/patternfly-additions.css";
import MetricsTab from './MetricsTab.js'
import ConfigurationTab from './ConfigurationTab.js'
import MohawkClient from '../helpers/MohawkClient.js'

export const DEFAULT_URL = 'http://localhost:8080';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: DEFAULT_URL,
      tenants: []
    }
    this.getUrlFromUser = this.getUrlFromUser.bind(this);
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
      let client = new MohawkClient(DEFAULT_URL);
      let tenant_list = client.getTenants()
      this.setState({
        tenants: tenant_list,
      });
    });
  }

  componentDidMount(){
    // get tenants upon mounting the component.
    let client = new MohawkClient(DEFAULT_URL);
    let tenant_list = client.getTenants()
    this.setState({
      tenants: tenant_list,
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
