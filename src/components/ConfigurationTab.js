import React, {Component} from 'react';
import {DEFAULT_URL} from './App';
import {Button} from 'patternfly-react';

class ConfigurationTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: DEFAULT_URL,
      tls: false,
      basic_auth: false,
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAuthenticationSelect = this.handleAuthenticationSelect.bind(this);
    this.handleSaveConfiguration = this.handleSaveConfiguration.bind(this);
  }

  handleInputChange(event) {
    this.setState({url:event.target.value});
  }

  handleAuthenticationSelect(event, eventKey) {
    console.log(eventKey);
  }

  handleSaveConfiguration(event) {
    this.props.changeConfigCallback(this.state.url)
  }

  render() {
    return (
      <div className="tab">
        <h1>Endpoint Configurations</h1>
        <form name="queryForm" className="query-form">
          <div className="url">
            <b>URL:</b>
            <input id="url" value={this.state.url} onChange={this.handleInputChange}/>
          </div>
        </form>
        <Button onClick={this.handleSaveConfiguration}>
          Save Configurations
        </Button>
      </div>
    )
  }
}

export default ConfigurationTab;
