import React from 'react'

import styles from './pieGraph.scss'

export default class PieChart extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      nbr: 5
    }
  }
  render() {
    return (<div>
      <h1>PIE CHART</h1>
        <div className={styles.pie} style={{animationDelay: '-20s'}}></div>
        <div className={styles.pie} style={{animationDelay: '-60s'}}></div>
        <div className={styles.pie} style={{animationDelay: '-90s'}}></div>
        <svg viewBox="0 0 32 32">
          <circle r="16" cx="16" cy="16" />
        </svg>
      </div>)
  }
}
