import React, { Component } from 'react';
import './MessageForm.css';
import { fetchNextMessage, addUpdateMessage } from '../../api/communication';

// Assuming that there can be multiple parents of a message
// But for easy manipulation, only allow them to select one, they can easily add later on
export default class MessageForm extends Component {
  state = {
    parentKey: '',
    parentAction: '',
    parentStatusMessage: '',
    editPaneVisible: false,
    actionExist: false,
    relink: false,
    messageKey: '',
    messageBody: [],
    messageActions: [],
  };

  parentTriggeredReset = () => {
    this.setState({
      editPaneVisible: false,
      actionExist: false,
      relink: false,
      parentStatusMessage: '',
      messageKey: '',
      messageBody: [],
      messageActions: [],
    });
  }

  handleParentInputChange = (event) => {
    this.handleInputChange(event);
    /*If the parent is changed, must do a parent query
    before entering the new/updated message*/
    if (this.state.parentStatusMessage || this.state.editPaneVisible) {
      this.parentTriggeredReset(); 
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleMessageBodyChange = (index) => {
    return (event) => {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      if (index >= this.state.messageBody.length) {
        /* This is a new action, push one to the array */
        this.state.messageBody.push({type: '', value: ''});
      }

      if (name === 'messageBodyType') {
        this.state.messageBody[index].type = value;  
      } else if (name === 'messageBodyValue') {
        this.state.messageBody[index].value = value;
      } else {
        /* TODO: more field possible ? */
      }

      this.forceUpdate();
    }
  }

  handleMessageActionsChange = (index) => {
    return (event) => {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      if (index >= this.state.messageActions.length) {
        /* This is a new action, push one to the array */
        this.state.messageActions.push({});
      }

      if (name === 'actionsMessageKey') {
        this.state.messageActions[index].messageKey = value;  
      } else if (name === 'actionsName') {
        this.state.messageActions[index].name = value;
      } else if (name === 'actionsType') {
        this.state.messageActions[index].type = value;
      } else {
        /* TODO: more field possible ? */
      }

      this.forceUpdate();
    }
  }

  handleSubmitMessage = (event) => {
    event.preventDefault();
    const {
      parentKey,
      parentAction,
      relink,
      messageKey,
      messageType,
      messageBody,
      messageActions } = this.state;

    if (this.state.relink) {
      addUpdateMessage({
        parentKey,
        parentAction,
        relink,
      });
    } else {
      addUpdateMessage({
        parentKey,
        parentAction,
        relink,
        messageKey,
        messageBody,
        messageActions,
      });
    }
  }

  handleFindParent = (event) => {
    event.preventDefault();
    /* Find the message following the specified action if there is any */
    const { parentKey, parentAction } = this.state;
    fetchNextMessage(parentKey, parentAction)
      .then((resp) => {
          console.log(resp);
          this.setState({
            parentStatusMessage: 'Action already exist! Allowing Update',
            messageKey: resp.data.key,
            messageBody: resp.data.body,
            messageActions: resp.data.actions,
            editPaneVisible: true,
            actionExist: true,
          });
      })
      .catch((reason) => {
        const { response } = reason;
        console.log(response);
        if (response.status === 400) {
          this.setState({
            parentStatusMessage: 'Parent does not exist!'
          });
        } else if (response.status === 404) {
          this.setState({
            parentStatusMessage: `Creating new action for parent with key ${ parentKey }`,
            editPaneVisible: true,
            actionExist: false,
          });
        } else {
          this.setState({
            parentStatusMessage: 'Sorry, server error, please try again later!'
          });
        }
      });
  }

  render() {
    return (
      <div className="MessageFormContainer">
        <h3>Create or Update a Message</h3>
        <div className="formSection">
          <p>What is the parent of this Message?</p>
          <form onSubmit={ this.handleFindParent }>
            <label>
              Parent message's key
              <input
                name="parentKey" 
                value={ this.state.parentKey }
                onChange={ this.handleParentInputChange } />
            </label>
            <label>
              Parent message's action name
              <input
                name="parentAction"
                value={ this.state.parentAction }
                onChange={ this.handleInputChange } />
            </label>
            <input type="submit" value="Find" className="base buttonGreen"/>
          </form>
        </div>
        <p className="statusMessage">{ this.state.parentStatusMessage }</p>
        <div className="formSection">
          { this.state.editPaneVisible && (
            <form onSubmit={ this.handleSubmitMessage }>
              <label>
                <span className="formTitle">Message Key ( Alphanumeric and _ )</span>
                <input
                  required
                  pattern="[a-zA-Z0-9_]+"
                  name="messageKey" 
                  value={ this.state.messageKey }
                  onChange={ this.handleInputChange } />
              </label>

              <label>
                <span>
                I am just linking to another existing Message
                <input
                  style={ { marginLeft: 8 } }
                  name="relink"
                  type="checkbox"
                  checked={this.state.relink}
                  onChange={this.handleInputChange} />
                </span>
              </label>
              { !this.state.relink && (
                <div>
                <span className="formTitle">Message Body</span>
                {
                  [...this.state.messageBody,
                    {type: '', value: ''}].map((mb, i) =>
                      <div key={ i } className="actionBubble">
                        <label>
                          <span>Segment Type ( text, JSX )</span>
                          <input
                            pattern="[a-zA-Z0-9_]+"
                            name="messageBodyType" 
                            value={ mb.type }
                            onChange={ this.handleMessageBodyChange(i) } />
                        </label>
                        <label>
                          <span>Segment content</span>
                          <textarea
                            name="messageBodyValue"
                            value={ mb.value }
                            onChange={ this.handleMessageBodyChange(i) } />
                        </label>
                    </div>
                    )
                }
                <label>
                  <span className="formTitle">Message Actions</span>
                  {
                    [...this.state.messageActions,
                      {name: '', messageKey: ''}].map((ma, i) =>
                      <div key={ i } className="actionBubble">
                        <label>
                          Action Name
                          <input
                            name="actionsName"
                            value={ ma.name }
                            onChange={ this.handleMessageActionsChange(i) } />
                        </label>
                        <label>
                          Action Type
                          <input
                            name="actionsType"
                            value={ ma.type }
                            onChange={ this.handleMessageActionsChange(i) } />
                        </label>
                        <label>
                          Which Message Does This Action Lead to? Enter the Message Key
                          <input
                            name="actionsMessageKey"
                            value={ ma.messageKey }
                            onChange={ this.handleMessageActionsChange(i) } />
                        </label>
                      </div>
                    )
                  }
                </label>
                </div>
              )}
              <input type="submit" value="Submit" className="base buttonGreen"/>
            </form>
          )}
        </div>
      </div>
    );
  }
}