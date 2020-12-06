import '../Message.css';
import React, {Component} from 'react';

export class PasswordSection extends Component {

  render () {
    const { password, onChange, encrypt } = this.props

    return (
      <div>
        <label className='paddingRight xLarge'>
          Password:
        </label>
        <input
          id={'pass'}
          value={password}
          placeholder={'password'}
          type={'password'}
          onChange={onChange}
        />
        <div className='sizeBottomDiv'> 
          {encrypt &&
           <span className="addendum floatRight">* strongly recommended use pass to encrypt your message</span>
          }
        </div>
      </div> 
    )
  }
}

export default PasswordSection
