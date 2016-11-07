import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import GraphBar from './graphBar.jsx'
import styles from './index.scss'

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
    const {display, resultOfgrowth, displayGraph} = this.state;
    let maximumWidthRatio = 500/resultOfgrowth[resultOfgrowth.length - 1].martian;
    // 500 is a arbritary number of the maximum nbr of pixel width the table is allowed to take.
    return (
      <div>
        <span>{display}</span>
        Graph that could be fun:
        <ul>
          <li onClick={this.growthVsDeath}>Population Growth vs Death occurence</li>
          <li>Total death</li>
          <li>Nbr ship lost over time</li>
          <li>Pie Shart / bar of type of defect over time.</li>
          <li>Comparing Current run vs previous run</li>
        </ul>

        <h3>Population Growth</h3>
        {displayGraph == 'growthVsDeath' && <div className='row'>
            <div className='col-xs-2'>Years</div>
            <div className='col-xs-10'>Data</div>
        </div>}
        {displayGraph == 'growthVsDeath' && resultOfgrowth.map((item, index)=> {
          return (<div key={index} className='row'>
            <div className={`col-xs-1 ${styles.vcenter}`}>
              <div>{Math.round(index*22/12)}</div>
            </div>
            <div className={`col-xs-11 ${styles.vcenter}`}>
              <GraphBar nbr={item.martian} max={maximumWidthRatio} color='rgba(0, 0, 255, 0.7)' textColor='white'></GraphBar>
              <GraphBar nbr={item.cummulativeLife} max={maximumWidthRatio} color='#ec581f' textColor='black'></GraphBar>
            </div>
          </div>);
        })}
        <div>

        </div>
      </div>
    )
  }
}
