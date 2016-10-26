import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './index.scss'
import React from 'react'

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      someValue: 12
    };
  }
  render () {
    const {someValue} = this.state;
    const {persPerShip, engineMalfunction} = this.props.param;
    return (
      <div>
        <p>This React project just works including <span className={styles.blueBg}>module</span> local styles.</p>
        <p>Global bootstrap css import works too as you can see on the following button.</p>
        <p><a className='btn btn-primary btn-lg' >Enjoy!</a></p>
        <div>Param here: {someValue}, {persPerShip}, {engineMalfunction}</div>
      </div>
    )
  }
}
