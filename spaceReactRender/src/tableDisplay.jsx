import React from 'react'

export default class TableDisplay extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      resultOfgrowth: this.props.resultOfgrowth
    }
  }
  render () {
    const { resultOfgrowth } = this.state;
    return (
      <div><h1>nbr of steps: {resultOfgrowth.length}</h1></div>
    )
  };
};
