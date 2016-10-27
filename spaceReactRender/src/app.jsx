import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './index.scss'
import React from 'react'

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
      itsIncreaseOf: this.props.param.itsIncreaseOf
    };
    this.changeNumberValue = this.changeNumberValue.bind(this);
  }
  changeNumberValue (key, event) {
    // This set the value of the proper Key. Note, Key is the second argument after "this"!?! and event is something else that arrive magically.
    // console.log('key:', key);
    // console.log('event:', event, event.target.value);
    this.setState({[key]: parseFloat(event.target.value)});
  }
  render () {
    var {persPerShip, engineMalfunction} = this.state;
    return (
      <div className='container'>
        <div>Param here: {persPerShip}, {engineMalfunction}</div>
        <div>  persPerShip: {persPerShip}</div>
        <div className='row'>

          <div className='col-sm-6'>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-addon"># person per ship</div>
                <input type="number" className="form-control"
                  value={this.state.persPerShip}
                  onChange={this.changeNumberValue.bind(this, 'persPerShip')} />
              </div>
            </div>
          </div>

          <div className='col-sm-6'>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-addon"># person per ship</div>
                <input type="number" className="form-control"
                  value={this.state.engineMalfunction}
                  onChange={this.changeNumberValue.bind(this, 'engineMalfunction')} />
              </div>
            </div>
          </div>

        </div>

          engineMalfunction: 0.01,
          refuilingDefect: 0.02,
          landingFaillure: 0.05,
          reusabilityOfShip: 5,
          improvement: 0.05,
          firstStageEngine: 42,
          itsEngine: 9,
          touristRatio: 0.3,
          orbitRefulling: 4,
          probIncreaseProdOfIts: 0,
          itsIncreaseOf: 1,
        <p><a className='btn btn-primary btn-lg' >Enjoy!</a></p>
      </div>
    )
  }
}
