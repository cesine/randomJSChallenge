import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './index.scss'
import React from 'react'

function getGrowth(param, callback) {
console.log("fetching param");
  fetch('http://localhost:1701/results',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({param:param})
  })
  .then(function(res) {
    // This return the header call of the function, not the data.
    return res.json();
  })
  .then(function(data){
    console.log('Received Data:', data);
    if (data) {
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
    super(props);
    this.state = {
      persPerShip: this.props.param.persPerShip,
      engineMalfunction: this.props.param.engineMalfunction,
      refuilingDefect: this.props.param.refuilingDefect,
      landingFaillure: this.props.param.landingFaillure,
      reusabilityOfShip: this.props.param.reusabilityOfShip,
      improvement: this.props.param.improvement,
      firstStageEngine: this.props.param.firstStageEngine,
      itsEngine: this.props.param.itsEngine,
      touristRatio: this.props.param.touristRatio,
      orbitRefulling: this.props.param.orbitRefulling,
      probIncreaseProdOfIts: this.props.param.probIncreaseProdOfIts,
      itsIncreaseOf: this.props.param.itsIncreaseOf,
      maxPop: 10000,
      years: 1000,
      resultOfgrowth: {}
    };
    this.changeNumberValue = this.changeNumberValue.bind(this);
    this.getGrowthProjection = this.getGrowthProjection.bind(this);
  }
  changeNumberValue (key, event) {
    // This set the value of the proper Key. Note, Key is the second argument after "this"!?! and event is something else that arrive magically.
    // console.log('key:', key);
    // console.log('event:', event, event.target.value);
    this.setState({[key]: parseFloat(event.target.value)});
  }
  getGrowthProjection() {
    var updateThisState = function (data) {
      this.setState({resultOfgrowth: data});
    }
    updateThisState = updateThisState.bind(this);
    this.state.resultOfgrowth = {};
    getGrowth(this.state, updateThisState);
  }
  render () {
    const {persPerShip, engineMalfunction, refuilingDefect, landingFaillure, reusabilityOfShip, improvement, firstStageEngine, itsEngine, touristRatio, orbitRefulling, probIncreaseProdOfIts, itsIncreaseOf} = this.state;
    return (
      <div className='container'>
        <div>Param here: {persPerShip}, {engineMalfunction}</div>
        <div>  persPerShip: {persPerShip}</div>

        <div className='row'>

          <div className='col-sm-6'>
            <div className='form-group'>
              <div className='input-group'>
                <div className='input-group-addon'># engineMalfunction</div>
                <input type='number' className='form-control'
                  step='0.01'
                  min='0'
                  value={engineMalfunction}
                  onChange={this.changeNumberValue.bind(this, 'engineMalfunction')} />
              </div>
            </div>
            <div className='form-group'>
              <div className='input-group'>
                <div className='input-group-addon'>refuilingDefect</div>
                <input type='number' className='form-control'
                  step='0.01'
                  min='0'
                  value={this.state.refuilingDefect}
                  onChange={this.changeNumberValue.bind(this, 'refuilingDefect')} />
              </div>
            </div>
            <div className='form-group'>
              <div className='input-group'>
                <div className='input-group-addon'>landingFaillure</div>
                <input type='number' className='form-control'
                  step='0.01'
                  min='0'
                  value={this.state.landingFaillure}
                  onChange={this.changeNumberValue.bind(this, 'landingFaillure')} />
              </div>
            </div>
          </div>

          <div className='col-sm-6'>
            <div className='form-group'>
              <div className='input-group'>
                <div className='input-group-addon'>improvement</div>
                <input type='number' className='form-control'
                  step='0.01'
                  min='0'
                  max='1'
                  value={this.state.improvement}
                  onChange={this.changeNumberValue.bind(this, 'improvement')} />
              </div>
            </div>
          </div>

        </div>

        <div className='row'>
          <div className='col-sm-6'>
            <div className='form-group'>
              <div className='input-group'>
                <div className='input-group-addon'># person per ship</div>
                <input type='number' className='form-control'
                  min='0'
                  value={persPerShip}
                  onChange={this.changeNumberValue.bind(this, 'persPerShip')} />
              </div>
            </div>
          </div>
          <div className='col-sm-6'>
            <div className='form-group'>
              <div className='input-group'>
                <div className='input-group-addon'>reusabilityOfShip</div>
                <input type='number' className='form-control'
                  step='1'
                  min='0'
                  max='50'
                  value={this.state.reusabilityOfShip}
                  onChange={this.changeNumberValue.bind(this, 'reusabilityOfShip')} />
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-sm-6'>
            <div className='form-group'>
              <div className='input-group'>
                <div className='input-group-addon'>firstStageEngine</div>
                <input type='number' className='form-control'
                  min='0'
                  step='1'
                  value={firstStageEngine}
                  onChange={this.changeNumberValue.bind(this, 'firstStageEngine')} />
              </div>
            </div>
          </div>
          <div className='col-sm-6'>
            <div className='form-group'>
              <div className='input-group'>
                <div className='input-group-addon'>itsEngine</div>
                <input type='number' className='form-control'
                  min='0'
                  step='1'
                  value={this.state.itsEngine}
                  onChange={this.changeNumberValue.bind(this, 'itsEngine')} />
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-sm-6'>
            <div className='form-group'>
              <div className='input-group'>
                <div className='input-group-addon'>touristRatio</div>
                <input type='number' className='form-control'
                  min='0'
                  step='0.01'
                  max='1'
                  value={touristRatio}
                  onChange={this.changeNumberValue.bind(this, 'touristRatio')} />
              </div>
            </div>
          </div>
          <div className='col-sm-6'>
            <div className='form-group'>
              <div className='input-group'>
                <div className='input-group-addon'>orbitRefulling</div>
                <input type='number' className='form-control'
                  step='1'
                  min='0'
                  max='50'
                  value={this.state.orbitRefulling}
                  onChange={this.changeNumberValue.bind(this, 'orbitRefulling')} />
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-sm-6'>
            <div className='form-group'>
              <div className='input-group'>
                <div className='input-group-addon'>probIncreaseProdOfIts</div>
                <input type='number' className='form-control'
                  min='0'
                  step='0.01'
                  max='1'
                  value={probIncreaseProdOfIts}
                  onChange={this.changeNumberValue.bind(this, 'probIncreaseProdOfIts')} />
              </div>
            </div>
          </div>
          <div className='col-sm-6'>
            <div className='form-group'>
              <div className='input-group'>
                <div className='input-group-addon'>itsIncreaseOf</div>
                <input type='number' className='form-control'
                  step='1'
                  min='0'
                  max='50'
                  value={this.state.itsIncreaseOf}
                  onChange={this.changeNumberValue.bind(this, 'itsIncreaseOf')} />
              </div>
            </div>
          </div>
        </div>


          engineMalfunction: {engineMalfunction}
          refuilingDefect: {refuilingDefect}
          landingFaillure: {landingFaillure}
          reusabilityOfShip: {reusabilityOfShip}
          improvement: {improvement}
          firstStageEngine: {firstStageEngine}
          itsEngine: {itsEngine}
          touristRatio: {touristRatio}
          orbitRefulling: {orbitRefulling}
          probIncreaseProdOfIts: {probIncreaseProdOfIts}
          itsIncreaseOf: {itsIncreaseOf}
        <p><a className='btn btn-primary btn-lg' onClick={this.getGrowthProjection}>Get the Data!</a></p>
      </div>
    )
  }
}
