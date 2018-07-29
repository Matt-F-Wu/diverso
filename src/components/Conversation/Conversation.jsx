import React, { Component } from 'react';
import { toogleIsFetching, setConversation, updateConversation } from './actions';
import { connect } from 'react-redux';
import ChatBubble from '../ChatBubble';
import { fetchConversationHistory, fetchMessage } from '../../api/communication';
import './Conversation.css';

const TYPE_MESSAGE = 'message';
const TYPE_MESSAGE_INPUT = 'message_input';

class Conversation extends Component {
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: "smooth" });
  }

  onActionClick = (action, message) => {
    const { addToConversation } = this.props;

    if (action.type === TYPE_MESSAGE_INPUT) {
      const input = document.getElementById(message.key + '_textarea').value;
      /* Put the user input in a bubble */
      addToConversation([{speaker: 'user', body: [{type: 'text', value: input}]}]);
    } else {
      /* Display user's choice in user bubble */
      addToConversation([{speaker: 'user', body: [{type: 'text', value: action.name}]}]);
    }
    toogleIsFetching(true);
    fetchMessage(action.messageKey).then((resp) => {
      // console.log(resp);
      toogleIsFetching(false);
      addToConversation([resp.data]);
    }).catch((err) => {
      console.log('Error ===>', err);
      toogleIsFetching(false);
    });
  }

  componentDidMount() {
    /* Conversation mounted, pick up where left off if the user has a history, or start with clean slate */
    const { userData } = this.props.user;
    /* If userData is populated, fetch the corresponding conversation history*/
    if (!!userData){
      this.props.mutateFetchingStatus(true);
      fetchConversationHistory(this.props.user.userData.userId).then((history) => {
        this.props.populateConversation(history);
        this.props.mutateFetchingStatus(false);
      }).catch(() => {
        /* TODO: Signal some sort of error */
        /* Below is actually just faking receiving a new message */
        this.props.addToConversation([]);
        this.props.mutateFetchingStatus(false);
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { userData } = nextProps.user;
    if (!!userData && !this.props.user.userData){
      // User is recently set
      console.log('User got set');
      this.props.mutateFetchingStatus(true);
      fetchConversationHistory(userData.userId).then((history) => {
        this.props.populateConversation(history);
        this.props.mutateFetchingStatus(false);
      }).catch(() => {
        /* TODO: Signal some sort of error */
        this.props.mutateFetchingStatus(false);
      });
    }
    return true;
  }

  render() {
    const { conversation } = this.props;
    return (
      <div>
      <div
        className={ 'conversationContainer' }>
        {
          conversation.history.map((msg, i, arr) => 
            <ChatBubble
              key={ i }
              message={ msg }
              onActionClick={ this.onActionClick }
            />
          )
        }
        <div></div>
      </div>
      <div ref={el => { this.el = el; }}></div>
      </div>
    );
  }
}

/* Define Redux Container */
const mapStateToProps = (state) => {
  const { conversation, user } = state;
  return {
    conversation,
    user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    mutateFetchingStatus: (boolean) => {
      dispatch(toogleIsFetching(boolean));
    },
    populateConversation: (history) => {
      dispatch(setConversation(history));
    },
    addToConversation: (addition) => {
      dispatch(updateConversation(addition));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Conversation);