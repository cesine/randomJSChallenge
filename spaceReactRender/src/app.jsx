import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './index.scss'
import React from 'react'

// modules
import TableDisplay from './tableDisplay.jsx'

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
      resultOfgrowth: []
    };
    this.changeNumberValue = this.changeNumberValue.bind(this);
    this.getGrowthProjection = this.getGrowthProjection.bind(this);
    this.updateThisState = this.updateThisState.bind(this);
  }
  changeNumberValue (key, event) {
    // This set the value of the proper Key. Note, Key is the second argument after "this"!?! and event is something else that arrive magically.
    // console.log('key:', key);
    // console.log('event:', event, event.target.value);
    this.setState({[key]: parseFloat(event.target.value)});
  }
  updateThisState(data) {
    this.setState({
      resultOfgrowth: data
    });
    console.log("after the setState.");
  }
  getGrowthProjection() {
    this.state.resultOfgrowth = [];
    getGrowth(this.state, this.updateThisState);
  }
  render () {
    const {persPerShip, engineMalfunction, refuilingDefect, landingFaillure, reusabilityOfShip, improvement, firstStageEngine, itsEngine, touristRatio, orbitRefulling, probIncreaseProdOfIts, itsIncreaseOf, resultOfgrowth} = this.state;
    return (
      <div className='container'>
        <div>Param here: {persPerShip}, {engineMalfunction}</div>
        <div>  persPerShip: {persPerShip}</div>

        <div className='row'>

          <div className='col-md-6'>
            <div className='form-group'>
                <label className='col-sm-6 control-label'># Engine Malfunction</label>
                <div className='col-sm-6'>
                  <input type='number' className='form-control'
                  step='0.01'
                  min='0'
                  value={engineMalfunction}
                  onChange={this.changeNumberValue.bind(this, 'engineMalfunction')} />
                </div>
            </div>
            <div className='form-group'>
                <label className='col-sm-6 control-label'>Refuiling Defect</label>
                <div className='col-sm-6'>
                  <input type='number' className='form-control'
                    step='0.01'
                    min='0'
                    value={this.state.refuilingDefect}
                    onChange={this.changeNumberValue.bind(this, 'refuilingDefect')} />
                </div>
            </div>
            <div className='form-group'>
                <label className='col-sm-6 control-label'>Landing Faillure</label>
                <div className='col-sm-6'>
                  <input type='number' className='form-control'
                    step='0.01'
                    min='0'
                    value={this.state.landingFaillure}
                    onChange={this.changeNumberValue.bind(this, 'landingFaillure')} />
                </div>
            </div>
          </div>

          <div className='col-md-6'>
            <div className='form-group'>
                <label className='col-sm-6 control-label'>Improvement</label>
                <div className='col-sm-6'>
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
          <div className='col-md-6'>
            <div className='form-group'>
                <label className='col-sm-6 control-label'>Person per ship</label>
                <div className='col-sm-6'>
                  <input type='number' className='form-control'
                    min='0'
                    value={persPerShip}
                    onChange={this.changeNumberValue.bind(this, 'persPerShip')} />
                </div>
              </div>
          </div>
          <div className='col-sm-6'>
            <div className='form-group'>
                <label className='col-xs-6 control-label'>Reusability of ship</label>
                <div className='col-xs-6'>
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
          <div className='col-md-6'>
            <div className='form-group'>
                <label className='col-sm-6 control-label'>First Stage Engine</label>
                <div className='col-sm-6'>
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
                <label className='col-sm-6 control-label'>ITS Engine</label>
                <div className='col-sm-6'>
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
          <div className='col-md-6'>
            <div className='form-group'>
                <label className='col-sm-6 control-label'>Tourist Ratio</label>
                <div className='col-sm-6'>
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
                <label className='col-sm-6 control-label'>Orbit Refulling</label>
                <div className='col-sm-6'>
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
          <div className='col-md-6'>
            <div className='form-group'>
                <label className='col-sm-6 control-label'>Increase Production of ITS</label>
                <div className='col-sm-6'>
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
                <label className='col-sm-6 control-label'>ITS Increase Of</label>
                <div className='col-sm-6'>
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
        {resultOfgrowth.length > 0 && <TableDisplay resultOfgrowth={resultOfgrowth}></TableDisplay>}
      </div>
    )
  }
}
