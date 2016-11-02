import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class HelpComponentList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      msgArray: this.props.msgArray
    }
  }
  render() {
    const {msgArray} = this.state;
    return (
      <ul>
        {msgArray.map((string, index) => {
          return (<li key={index}>{string}</li>)
        })}
      </ul>
    )
  }
}
