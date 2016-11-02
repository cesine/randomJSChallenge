import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class GraphSection extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      resultOfgrowth: this.props.resultOfgrowth,
      savedBackup: this.props.savedBackup,
      display: 'Yes'
    }
  }
  render() {
    const {msgArray, display} = this.state;
    return (
      <div>
        <span>{display}</span>
      </div>
    )
  }
}
