import './Message.css';
import React, {Component} from 'react';
import TextArea from './components/TextArea';
import BoxSection from './components/BoxSection';
import Button from './components/Button';
import PasswordSection from './components/PasswordSection';

const CryptoJS = require("crypto-js");
const API_URL = 'http://localhost:3000'

class MessageIndex extends Component {
  state = {
    message: '',
    password: '',
    message_url: null,
    errors: null
  }

  handleMessage = (event) => {
    const message = event.target.value
    this.setState({ message })
  }

  handlePassword = (event) => {
    this.setState({ password: event.target.value})
  }

  saveMessage = () => {
    const { message, password } = this.state
    let data = { message: message, password: false }
    if (password) {
      let messageToSave = CryptoJS.AES.encrypt(message, password).toString();
      data = { message: messageToSave, password: true }
    }
    this.postSaveMeessage(JSON.stringify(data))
  }

  closeErrorsWindow = () => {
    this.setState({errors: null})
  }

  postSaveMeessage = (data) => {
    return fetch(`${API_URL}/api/v1/message`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-HTTP-Method-Override': 'post'
      },
      body: data
    })
      .then(response => response.json())
      .then(response => {
        if ('errors' in response) {
          this.setState({ errors: response.errors })
        }
        console.log('response', response)
        this.setState({ message_url: response.message_url })
      })
  }

  render () {
    const { message, password, message_url, errors } = this.state
    const messageLength = message.length
    const disableButton = messageLength === 0 || messageLength > 500
    if (message_url) {
      return(
        <div className="App-header">
          <BoxSection>
            <strong className='paddingRight'>{message_url}</strong>
          </BoxSection>
          <Button
            disabled={disableButton}
            onClick={() => {navigator.clipboard.writeText(this.state.message_url)}}
            buttonText={'Copy Message URL'}
          />
        </div>
      )
    } else if (errors) {
      return(
        <div className="App-header">
          <BoxSection>
            {errors.map((error, index) =>
              <strong key={index} className='errorWindow'>
                {error}
              </strong>
            ) }     
          </BoxSection>
          <Button
            disabled={disableButton}
            onClick={this.closeErrorsWindow}
            buttonText={'Close errors window'}
          />
        </div>
      )
    }

    return (
      <div className="App-header">
        <BoxSection>
          <header>
          {'Leave Message'}
          </header>
        </BoxSection>
        <div className='padding' >
          <BoxSection>
            <TextArea
              message={message}
              placeholder={'enter message here'}
              onChange={this.handleMessage}
              messageLength={messageLength}
            />
          </BoxSection>
          <BoxSection>
            <PasswordSection
              password={password}
              onChange={this.handlePassword}
              encrypt
            />
          </BoxSection>
        </div>
        <Button
          disabled={disableButton}
          onClick={this.saveMessage}
          buttonText={'Save'}
        />
      </div>
    );
  }
}

export default MessageIndex;
