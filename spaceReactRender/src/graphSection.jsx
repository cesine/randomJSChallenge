import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import styles from './index.scss'
import BarGraph from './graph/barGraph.jsx'
import PieChart from './graph/pieChart.jsx'

export default class GraphSection extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      resultOfgrowth: this.props.resultOfgrowth,
      savedBackup: this.props.savedBackup,
      deathRatio: this.deathRatio(this.props.resultOfgrowth),
      display: 'Yes',
      displayGraph: ''
    }
    this.growthVsDeath = this.growthVsDeath.bind(this);
    this.pieChart = this.pieChart.bind(this);
  }
  growthVsDeath() {
    this.setState({displayGraph:'growthVsDeath'});
  }
  pieChart() {
    this.setState({displayGraph:'pieChart'});
  }
  deathRatio(item) {
    return [
        {
            percentage: 0.45,
            label: 'Thing 1'

        },
        {
            percentage: 0.21,
            label: "Thing Two"
        },
        {
            percentage: 0.11,
            label: "Another Thing"
        },
        {
            percentage: 0.23,
            label: "Pineapple"
        }
    ];
  }
  render() {
    const {display, resultOfgrowth, displayGraph, savedBackup, deathRatio} = this.state;
    return (
      <div>
        Graph that could be fun:
        <ul>
          <li onClick={this.growthVsDeath}>Population Growth vs Death occurence</li>
          <li onClick={this.pieChart}>Nbr ship lost over time</li>
          <li>Pie Shart / bar of type of defect over time.</li>
          <li>Comparing Current run vs previous run</li>
        </ul>

        {displayGraph == 'growthVsDeath' && <BarGraph resultOfgrowth={resultOfgrowth} savedBackup={savedBackup}></BarGraph>}
        {displayGraph == 'pieChart' && <PieChart deathRatio={deathRatio}></PieChart>}
      </div>
    )
  }
}
