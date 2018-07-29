import React, { Component } from 'react';
import {
  toogleIsFetching,
  setConversation,
  updateConversation,
  updateLastMessage } from './actions';
import { connect } from 'react-redux';
import ChatBubble from '../ChatBubble';
import { fetchConversationHistory, fetchMessage } from '../../api/communication';
import done_icon from '../../media/done.svg';
import './Conversation.css';

const TYPE_MESSAGE = 'message';
const TYPE_MESSAGE_INPUT = 'message_input';

class Conversation extends Component {
  state = {
    bookMarks: [],
  }

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
    const { addToConversation, handleUserSelection } = this.props;
    const { history } = this.props.conversation;
    if (history[history.length - 1] !== message) {
      if (action.name === message.selection) {
        // This action has already been taken, do nothing
        return;
      } else {
        // replay this message at the bottom and take new action
        addToConversation([message]);
      }
    }

    if (action.type === TYPE_MESSAGE_INPUT) {
      const input = document.getElementById(message.key + '_textarea').value;
      /* Put the user input in a bubble */
      handleUserSelection(input);
    } else {
      /* Display user's choice in user bubble */
      handleUserSelection(action.name);
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

  bookMarking = (index, remove) => {
    if (remove) {
      this.setState({
        bookMarks: this.state.bookMarks.filter((b) => b !== index)
      });
      return;
    }
    this.setState({
      bookMarks: [...this.state.bookMarks, index],
    });
  }

  submitBookmarks = () => {
    // empty bookmarks
    this.setState({
      bookMarks: [],
    });

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
              index={ i }
              message={ msg }
              onActionClick={ this.onActionClick }
              bookMarks={ this.state.bookMarks }
              bookMarking={ this.bookMarking }
            />
          )
        }
        <div></div>
      </div>
      { this.state.bookMarks.length > 0 &&
        <img src={ done_icon } width="100" height="100" className="floatingButton" onClick={ this.submitBookmarks }/>
      }
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
    handleUserSelection: (selection) => {
      dispatch(updateLastMessage({selection}));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Conversation);