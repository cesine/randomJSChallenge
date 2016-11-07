import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import GraphBar from './graphBar.jsx'
import styles from './graphBar.scss'

export default class BarGraph extends React.Component {
  // This is the Graph itself.
  constructor (props) {
    super(props);
    this.state = {
      resultOfgrowth: this.props.resultOfgrowth
    }
  }
  render() {
    let maxMartian = this.props.resultOfgrowth[this.props.resultOfgrowth.length - 1].martian;
    let maximumWidthRatio = 500/maxMartian;
    let graphSeparator = maxMartian/5;
    if (graphSeparator > 1000) {
      graphSeparator = Math.round(maxMartian/5/1000)*1000;
    }
    const {resultOfgrowth} = this.state;
    return (<div>
        <h3>Population Growth</h3>
        <div className={styles.graph_header}>
          <div className='col-xs-2'>Years</div>
          <div className='col-xs-10'>Data Grid: {graphSeparator}</div>
        </div>
        <div className={`${styles.fix_graph_container}`}>
          {resultOfgrowth.map((item, index)=> {
            return (<div key={index} className='row'>
              <div className={`col-xs-1 ${styles.vcenter}`}>
                <div>{Math.round(index*22/12)}</div>
              </div>
              <div className={`col-xs-11 ${styles.vcenter}`}>
                <div style={{'backgroundSize': graphSeparator*maximumWidthRatio + 'px', 'backgroundImage': 'linear-gradient(to right, grey 1px, transparent 1px)'}}>
                  <GraphBar nbr={item.martian} max={maximumWidthRatio} color='rgba(0, 196, 255, 0.55)' textColor='black'></GraphBar>
                  <GraphBar nbr={item.cummulativeLife} max={maximumWidthRatio} color='#ec581f' textColor='black'></GraphBar>
                </div>
              </div>
            </div>);
          })}
        </div>
      </div>)
  }
}
