import '../Message.css';
import React, {Component} from 'react';

export default class Button extends Component {

  render () {
    const { disable, onClick, buttonText} = this.props

    return (
      <button
        type='button'
        className='greenButton'
        disabled={disable}
        onClick={onClick}
      >
        {buttonText}
      </button>
    )
  }
}
