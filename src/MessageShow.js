import './Message.css';
import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import Button from './components/Button';
import TextArea from './components/TextArea';
import BoxSection from './components/BoxSection';
import PasswordSection from './components/PasswordSection';

const CryptoJS = require("crypto-js");
const API_URL = 'http://localhost:3000'

class MessageShow extends Component {
  state = { 
    message: '', 
    password: '',
    has_password: null,
    error: null,
    incorrect: false
   }

  handlePassword = (event) => {
    this.setState({ password: event.target.value})
  }

  decryptMessage = () => {
    const { message, password } = this.state
    try {
      let bytes = CryptoJS.AES.decrypt(message, password);
      let decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);
      if (!decryptedMessage) {throw (decryptedMessage)}
      this.setState({ message: decryptedMessage, has_password: false })
    } catch {
      this.setIncorrectMessage()
    }
  }

  setIncorrectMessage() {
    this.setState({
      incorrect: true
    });
    setTimeout(() => {
        this.setState({
          incorrect: false
        });
    }, 1000)
  }

  async componentDidMount () {
    const id = this.props.match.params.id
    const response = await fetch(`${API_URL}/api/v1/message/${id}`);
    const json = await response.json();
      if ('error' in json) {
       return this.setState({error: json.error})
      }
    this.setState({ message: json.message, has_password: json.password })
  }

  render () {
    const { message, password, has_password, error, incorrect} = this.state
    const messageLength = message.length

    if (error) {
      return(
        <div className="App-header">
          <BoxSection>
            <strong className='errorWindow'>{error}</strong>
          </BoxSection>
          <Link to={`/app`}>
            <Button
              buttonText={'Main Page'}
            />
          </Link> 
        </div>
      )
    }
    return (
      <div className="App-header">
        {incorrect &&
          <BoxSection className='incorrectWindow'>
            <strong className='errorWindow'>{'Incorrect password'}</strong>
          </BoxSection>
        }
        <BoxSection>
          <header>
            {'Read Message'}
          </header>
        </BoxSection>
        <div className='padding' >
          <BoxSection>
            <TextArea
              placeholder={message}
              messageLength={messageLength}
              readOnly
            />
          </BoxSection>
          {has_password && 
            <BoxSection>
              <PasswordSection
                password={password}
                onChange={this.handlePassword}
              />
            </BoxSection>
          }
        </div>
        <div>
          <Link to={`/app`}>
            <Button
              buttonText={'Main Page'}
            />
          </Link>  
          {has_password && 
            <Button
              onClick={this.decryptMessage}
              buttonText={'Decrypt Message'}
            />
          }
        </div>
      </div>
    );
  }
}

export default MessageShow;
