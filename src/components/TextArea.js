import '../Message.css';
import React, {Component} from 'react';

export class TextArea extends Component {

  render () {
    const { message, placeholder, messageLength, disable, onChange, readOnly} = this.props

    return (
      <div className="directionColumn">
        <label className='paddingBottom'>
          Message:
        </label>
        <textarea
          id={'message'}
          value={message}
          readOnly={readOnly}
          placeholder={placeholder}
          onChange={onChange}
          className='textAreaSize'
        />
        <div className='sizeBottomDiv'> 
          {messageLength > 750 &&
           <span className="addendum floatLeft">* sorry your message is too long</span>
          }
          <span className="addendum floatRight">{`${messageLength}/750`} </span>  
        </div>
      </div>
    )
  }
}

export default TextArea
