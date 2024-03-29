/* A light weight button component that defines a consistent UI design */
import React, { Component } from 'react';
import './Button.css';

export default class Button extends Component {
  render() {
    const { type, children, label, className, onClick, ...others } = this.props;
    
    return (
      <div {...others}
        className={ `base ${ type || '' } ${ className }` }
        onClick={ onClick }>
        <div className="innerContainer">
          { label }
          { children }
        </div>
      </div>
    );
  }  
}