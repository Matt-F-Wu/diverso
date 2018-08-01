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
    return (
      <div
        className={ expanded ? 'bmfExpanded' : 'bmfSmall' }
      >
        <div style={ { border: '2px solid #F27E7E' } } class="bmCard">
          <div
            className="textContainer"
            onClick={ () => { this.setState({expanded: !this.state.expanded}); } }>
            { fname }
          </div>
        </div>
        {
          this.state.expanded &&
          <div class="bmContent">
            {
              folders[fname].map((message, idx) => {
                return (
                  message &&
                  <ChatBubble
                    key={ `${ i } ${ idx }` }
                    message={ message }
                    bookMarks={ [] }
                    bookMarking={ () => {} }
                    raiseHand={ () => {} }
                    onActionClick={ () => {} } />
                );
              })  
            }
          </div>
        } 
      </div>
    );
  }
}