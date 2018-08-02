import React, { Component } from 'react';
import Button from '../Button';
import './Dialog.css';

export default class Dialog extends Component {
  render() {
    const { labelPos, labelNeg, clickPos, clickNeg, title, body } = this.props;
    return (
      <div className="fullWindow" style={ { zIndex: 120 } }>
        <div className="loginForm">
          <div className="dialogBody">
            <h2>{ title }</h2>
            <p>{ body }</p>
          </div>
          <div className="dialogActions">
            { labelNeg &&
              <Button
                className="marginHSmall"
                label={ labelNeg }
                type="buttonRed"
                onClick={ clickNeg }/>
            }
            { labelPos &&
              <Button
                className="marginHSmall"
                label={ labelPos }
                type="buttonRed"
                onClick={ clickPos }/>
            }
          </div>
        </div>
      </div>
    );
  }
}
