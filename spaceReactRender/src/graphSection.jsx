import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import styles from './index.scss'
import BarGraph from './graph/barGraph.jsx'

export default class GraphSection extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      resultOfgrowth: this.props.resultOfgrowth,
      savedBackup: this.props.savedBackup,
      display: 'Yes',
      displayGraph: ''
    }
    this.growthVsDeath = this.growthVsDeath.bind(this);
  }
  growthVsDeath() {
    this.setState({displayGraph:'growthVsDeath'});
  }
  render() {
    const {display, resultOfgrowth, displayGraph, savedBackup} = this.state;
    return (
      <div>
        Graph that could be fun:
        <ul>
          <li onClick={this.growthVsDeath}>Population Growth vs Death occurence</li>
          <li>Nbr ship lost over time</li>
          <li>Pie Shart / bar of type of defect over time.</li>
          <li>Comparing Current run vs previous run</li>
        </ul>

        {displayGraph == 'growthVsDeath' && <BarGraph resultOfgrowth={resultOfgrowth} savedBackup={savedBackup}></BarGraph>}
      </div>
    )
  }
}
