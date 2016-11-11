import React from 'react'

import styles from './pieGraph.scss'

var rawData = [
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
// Started inpiration from: https://www.smashingmagazine.com/2015/07/designing-simple-pie-charts-with-css/
// But Selected in SVG: https://danielpataki.com/svg-pie-chart-javascript/
  export default class PieChart extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        size: 230,
        radius: 115,
        sectors: this.calculateSectors(this.props.deathRatio, 230)
    }
    this.calculateSectors = this.calculateSectors.bind(this);
  }
  calculateSectors( data, size ) {
    var sectors = [];
    var colors = ["#61C0BF", "#DA507A", "#BB3D49", "#DB4547", "#178ad6", "#17d6c7", "#17d66f"]
    var l = size / 2;
    var a = 0; // Angle
    var aRad = 0; // Angle in Rad
    var z = 0; // Size z
    var x = 0; // Side x
    var y = 0; // Side y
    var X = 0; // SVG X coordinate
    var Y = 0; // SVG Y coordinate
    var R = 0; // Rotation
    var arcSweep = 0;

    data.map( function(item, key ) {
        a = 360 * item.percentage;
        var aCalc = ( a > 180 ) ? 360 - a : a;
        aRad = aCalc * Math.PI / 180;
        z = Math.sqrt( 2*l*l - ( 2*l*l*Math.cos(aRad) ) );
        if( aCalc <= 90 ) {
            x = l*Math.sin(aRad);
        }
        else {
            x = l*Math.sin((180 - aCalc) * Math.PI/180 );
        }

        y = Math.sqrt( z*z - x*x );
        Y = y;

        if( a <= 180 ) {
            X = l + x;
            arcSweep = 0;
        }
        else {
            X = l - x;
            arcSweep = 1;
        }

        sectors.push({
            percentage: item.percentage,
            label: item.label,
            color: colors[key],
            arcSweep: arcSweep,
            L: l,
            X: X,
            Y: Y,
            R: R
        });

        R = R + a;
    })


    return sectors
  }
  render() {
    const {size, sectors, radius} = this.state;
    return (<div>
      <h1>PIE CHART</h1>
        <svg style={{width: 230+'px', 'height': 230+'px'}}>
          {sectors.map((item, index) => {
            return (<path key={index} fill={item.color} d={`M${radius},${radius} L${radius},0 A${radius},${radius} 1 0,1 ${item.X}, ${item.Y} z`} transform={`rotate(${item.R}, ${radius}, ${radius})`}></path>)
          })}
        </svg>
      </div>)
  }
}
