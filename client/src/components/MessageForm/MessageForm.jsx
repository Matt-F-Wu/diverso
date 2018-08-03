import React, { Component } from 'react';
import './MessageForm.css';
import { fetchNextMessage, addUpdateMessage, searchMessage } from '../../api/communication';

// Assuming that there can be multiple parents of a message
// But for easy manipulation, only allow them to select one, they can easily add later on
export default class MessageForm extends Component {
  state = {
    parentKey: '',
    parentAction: '',
    parentStatusMessage: '',
    actionExist: false,
    relink: false,
    key: '',
    searchQ: '',
    body: [],
    actions: [],
  };

  parentTriggeredReset = () => {
    this.setState({
      actionExist: false,
      relink: false,
      parentStatusMessage: '',
      key: '',
      searchQ: '',
      body: [],
      actions: [],
    });
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleBodyChange = (index) => {
    return (event) => {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      if (index >= this.state.body.length) {
        /* This is a new action, push one to the array */
        this.state.body.push({type: '', value: ''});
      }

      if (name === 'bodyType') {
        this.state.body[index].type = value;  
      } else if (name === 'bodyValue') {
        this.state.body[index].value = value;
      } else {
        /* TODO: more field possible ? */
      }

      this.forceUpdate();
    }
  }

  handleActionsChange = (index) => {
    return (event) => {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      if (index >= this.state.actions.length) {
        /* This is a new action, push one to the array */
        this.state.actions.push({});
      }

      if (name === 'actionskey') {
        this.state.actions[index].key = value;  
      } else if (name === 'actionsName') {
        this.state.actions[index].name = value;
      } else if (name === 'actionsType') {
        this.state.actions[index].type = value;
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
      key,
      messageType,
      body,
      actions } = this.state;

    if (this.state.relink) {
      addUpdateMessage({
        parentKey,
        parentAction,
        relink,
      }).then((resp) => {
        this.parentTriggeredReset();
        alert('Message added successfully!', resp);
      }).catch(() => {
        alert('Something went wrong, text Hao');
      });
    } else {
      addUpdateMessage({
        parentKey,
        parentAction,
        relink,
        key,
        body,
        actions,
      }).then((resp) => {
        this.parentTriggeredReset();
        alert('Message added successfully!', resp);
      }).catch(() => {
        alert('Something went wrong, text Hao');
      });
    }
  }

  handleQuery = (event) => {
    event.preventDefault();
    /* Find the message following the specified action if there is any */
    const { searchQ } = this.state;
    searchMessage(searchQ).then((resp) => {
      console.log(resp);
      this.setState(resp.data);
    }).catch((err) => {
      console.log(err);
      alert('Message not found!');
      this.setState({
        parentStatusMessage: 'Message not found!',
      })
    });
  }

  render() {
    return (
      <div className="MessageFormContainer">
        <div className="formSection">
          <p>Search for a message</p>
          <form onSubmit={ this.handleQuery }>
            <label>
              <input
                name="searchQ" 
                value={ this.state.searchQ }
                onChange={ this.handleInputChange } />
            </label>
            <input type="submit" value="Find" className="base buttonGreen"/>
          </form>
        </div>
        <h3>Create or Update a Message</h3>
        <p className="statusMessage">{ this.state.parentStatusMessage }</p>
        <div className="formSection">
          <form onSubmit={ this.handleSubmitMessage }>
            <label>
              Parent message's key
              <input
                name="parentKey" 
                value={ this.state.parentKey }
                onChange={ this.handleInputChange } />
            </label>
            <label>
              Parent message's action name
              <input
                name="parentAction"
                value={ this.state.parentAction }
                onChange={ this.handleInputChange } />
            </label>
            <label>
              <span className="formTitle">Message Key ( Alphanumeric and _ )</span>
              <input
                required
                pattern="[a-zA-Z0-9_]+"
                name="key" 
                value={ this.state.key }
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
                [...this.state.body,
                  {type: '', value: ''}].map((mb, i) =>
                    <div key={ i } className="actionBubble">
                      <label>
                        <span>Segment Type ( text, JSX )</span>
                        <input
                          pattern="[a-zA-Z0-9_]+"
                          name="bodyType" 
                          value={ mb.type }
                          onChange={ this.handleBodyChange(i) } />
                      </label>
                      <label>
                        <span>Segment content</span>
                        <textarea
                          name="bodyValue"
                          value={ mb.value }
                          onChange={ this.handleBodyChange(i) } />
                      </label>
                  </div>
                  )
              }
              <label>
                <span className="formTitle">Message Actions</span>
                {
                  [...this.state.actions,
                    {name: '', key: ''}].map((ma, i) =>
                    <div key={ i } className="actionBubble">
                      <label>
                        Action Name
                        <input
                          name="actionsName"
                          value={ ma.name }
                          onChange={ this.handleActionsChange(i) } />
                      </label>
                      <label>
                        Action Type
                        <input
                          name="actionsType"
                          value={ ma.type }
                          onChange={ this.handleActionsChange(i) } />
                      </label>
                      <label>
                        Which Message Does This Action Lead to? Enter the Message Key
                        <input
                          name="actionskey"
                          value={ ma.key }
                          onChange={ this.handleActionsChange(i) } />
                      </label>
                    </div>
                  )
                }
              </label>
              </div>
            )}
            <input type="submit" value="Submit" className="base buttonGreen"/>
          </form>
        </div>
      </div>
    );
  }
}