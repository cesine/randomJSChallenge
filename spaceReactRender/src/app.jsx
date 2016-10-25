import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './index.scss';
import React from 'react';

function getParamList(callback) {
console.log("fetching param");
  fetch('http://localhost:1701/param',{
    method: 'GET',
    ContentType: 'json'
  })
  .then(function(res) {
    // This return the header call of the function, not the data.
    return res.json();
  })
  .then(function(data){
    // console.log('Got the ParamList', data);
    if (data.persPerShip) {
      callback(data);
    }
  })
  .catch(function(ex) {
    // Fail to fetch so keep using the default value.
      window.console.log('parsing failed', ex);
    })
}

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      someValue: 12,
      param: {}
    }
    this.paramlist = this.paramlist.bind(this);
  }
  paramlist() {
    var updateThisState = function (data) {
      this.setState({param: data});
    }
    updateThisState = updateThisState.bind(this);
    getParamList(updateThisState);
  }
  render() {
    const {someValue, param} = this.state;
    return (
      <div>
        <h1>It Works!</h1>
        <p>This React project just works including <span className={styles.blueBg}>module</span> local styles.</p>
        <p>Global bootstrap css import works too as you can see on the following button.</p>
        <p><a className="btn btn-primary btn-lg" onClick={this.paramlist} >Enjoy!</a></p>
        <div>Param here: {someValue}, {param.persPerShip}</div>
      </div>
    )
  }
}
