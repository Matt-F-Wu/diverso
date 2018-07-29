import React, { Component } from 'react';
import './ChatBubble.css';
import Button from '../Button';
import bird_circle from '../../media/bird_circle.svg';

export default class ChatBubble extends Component {

	render() {
    /* hostRef needed for Pose animation */
		const { hostRef, message, onActionClick } = this.props;

    const bubbleClassName = message.speaker === 'user'? 'userBubble' : 'programBubble';
    const bubbleRowClassName = message.speaker === 'user'? 'userBubbleRow' : 'programBubbleRow';
		return (
      <div ref={ hostRef } className={ `bubbleRow ${ bubbleRowClassName }` }>
        { message.speaker === 'program' && (
            <div className="avatarContainer">
              <img src={ bird_circle } className="avatar" />
            </div>
          )
        }
        <div className="bubbleColumn">
          {
            message.body.map((ele) => 
              ele.type === 'text'
              ? <div
                  className={ `bubbleBase ${ bubbleClassName }` }>
                  { ele.value }
                </div>
              : <div className="jsx_container" dangerouslySetInnerHTML={{ __html: ele.value}}></div>
            )
          }
          {/*Display user's choices here*/}
          {
          message.actions && message.actions.length > 0 && (
          <div className={ 'bubbleBase choiceBubble' }>
            {
              message.actions.map((a, i) => 
                <Button key={ i }
                  label={ a.name }
                  type="buttonRed"
                  className="choiceButtonWithMargin"
                  onClick={ () => onActionClick(a, message) }
                />
              )
            }
          </div>
          )
          }
        </div>

        { this.props.children }
      </div>
    );
	}
}