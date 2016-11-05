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
    const {display, resultOfgrowth} = this.state;
    let maximumWidthRatio = 500/resultOfgrowth[resultOfgrowth.length - 1].martian;
    // 500 is a arbritary number of the maximum nbr of pixel width the table is allowed to take. 
    return (
      <div>
        <span>{display}</span>
        Graph that could be fun:
        <ul>
          <li>Population Growth - dot line</li>
          <li>Total death</li>
          <li>Nbr ship lost over time</li>
          <li>Pie Shart / bar of type of defect over time.</li>
          <li>Comparing Current run vs previous run</li>
        </ul>

        <h3>Population Growth</h3>
        {resultOfgrowth.map((item, index)=> {
          return (
            <div className="row" key={index}>
              <div className="col-xs-2">{item.martian}</div>
              <div className="col-xs-3" style={{width:item.martian*maximumWidthRatio,'backgroundColor': 'blue'}}>{item.martian}</div>
          </div>);
        })}
        <div>

        </div>
      </div>
    )
  }
}
