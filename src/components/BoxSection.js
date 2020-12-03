import '../Message.css';
import React, {Component} from 'react';
import classNames from 'classnames'

export default class BoxSection extends Component {


  render () {
    const { children, className } = this.props
    return (
      <div className={classNames('box', className)}>
        {children}
      </div>
    )
  }
}