import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import graphBar from './graphBar.scss'

export default class GraphBar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      nbr: this.props.nbr,
      maxRatio: this.props.max,
      color: this.props.color,
      textColor: this.props.textColor
    }
  }
  render() {
    const {color, maxRatio, nbr, textColor} = this.state;
    console.log(graphBar);
    return (<div className="row">
        <div className={`col-xs-1  ${graphBar.graph_number}`}>{nbr}</div>
        <div className={`col-xs-11 ${graphBar.bar}`} style={{width:nbr*maxRatio,'backgroundColor': color}}><span style={{color:color}}>.</span></div>
    </div>
    )
  }
}
