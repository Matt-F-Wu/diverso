import React, { Component } from 'react';
import ChatBubble from '../ChatBubble';
import './BookMarkFolder.css';

export default class BookMarkFolder extends Component {
  state = {
    expanded: false,
  }

  render() {
    const { folders, fname, i, idx } = this.props;
    const { expanded } = this.state;
    // group messages by name
    const messagesByName = {};
    folders[fname].forEach((message) => {
      if (messagesByName[message.name]) {
        messagesByName[message.name].push(message);  
      } else {
        messagesByName[message.name] = [message];  
      }
    });
    return (
      <div
        className={ expanded ? 'bmfExpanded' : 'bmfSmall' }
      >
        <div style={ { border: '2px solid #F27E7E' } } className="bmCard">
          <div
            className="textContainer"
            onClick={ () => { this.setState({expanded: !this.state.expanded}); } }>
            { fname }
          </div>
        </div>
        {
          this.state.expanded &&
          <div className="bmContent">
            {
              Object.keys(messagesByName).map((name) => 
                <div className="bmByNameContainer">
                  <div className="greyBoldText bmName" key={ `${ i } ${ idx } p` }>Bookmark: { name }</div>
                  {
                    messagesByName[name].map((message, j) => {
                      return (
                        <ChatBubble
                          key={ `${ i } ${ idx } ${ j }` }
                          message={ message }
                          bookMarks={ [] }
                          bookMarking={ () => {} }
                          raiseHand={ () => {} }
                          onActionClick={ () => {} }
                          hoverable={ false }
                        />
                      );
                    })
                  }
                </div>
              )
            }
          </div>
        }
        { this.state.expanded &&
            <div
              style={ { position: 'absolute', top: 20, right: 20, backgroundColor: '#F27E7E', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer' } }
              onClick={ () => { this.setState({expanded: false}); } }
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={ { width: '100%', height: '100%' } }>
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="#FFF"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
            </div>
        }
      </div>
    );
  }
}