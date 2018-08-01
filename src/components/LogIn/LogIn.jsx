import React, { Component } from 'react';
import { loginUser, registerUser } from '../../api/communication';
import './LogIn.css';
import { connect } from 'react-redux';
import {
  toogleIsFetching,
  setUser,
} from './actions';


/* global sessionStorage */
class LogIn extends Component {
  state = {
    isRegister: false,
    warning: null,
    username: '',
    password: '',
    passwordRepeat: '',
    occupation: '',
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if (name.includes('password')){
      this.setState({
        warning: null,
      });
    }
    this.setState({
      [name]: value
    });
  }

  loginRegister = (e) => {
    e.preventDefault();
    const { userLoggedIn, mutateFetchingStatus, reportError } = this.props;
    if (!this.state.isRegister) {
      const { username, password } = this.state;
      mutateFetchingStatus(true);
      loginUser(
        username,
        password,
      ).then((user) => {
        // console.log(JSON.stringify(user) );
        mutateFetchingStatus(false);
        userLoggedIn(user.data);
        sessionStorage.setItem('diverso_session_user', JSON.stringify(user.data));
        this.cancelModal({target: {id: 'modal'}});
      }).catch((err) => {
        mutateFetchingStatus(false);
        console.log(err.response);
        reportError('Login Failed', err.response.data);
        this.cancelModal({target: {id: 'modal'}});
      });
    } else {
      const { username, password, passwordRepeat, occupation } = this.state;
      if (password !== passwordRepeat) {
        // TODO: warn user 2 passwords don't match
        this.setState({
          warning: "Passwords don't match",
        });
        return;
      }
      mutateFetchingStatus(true);
      registerUser({
        username,
        password,
        occupation,
      }).then(() => {
        loginUser(username, password)
        .then((user) => {
          mutateFetchingStatus(false);
          userLoggedIn(user.data);
          sessionStorage.setItem('diverso_session_user', JSON.stringify(user.data) );
          this.cancelModal({target: {id: 'modal'}});
        }).catch((err) => {
          mutateFetchingStatus(false);
          console.log(err.response);
          reportError('Login Failed', err.response.data);
          this.cancelModal({target: {id: 'modal'}});
        });
      }).catch((err) => {
        mutateFetchingStatus(false);
        console.log(err.response);
        reportError('Registration Failed', err.response.data);
        this.cancelModal({target: {id: 'modal'}});
      });
    }
  }

  cancelModal = (e) => {
    console.log(e.target.id)
    if (e.target.id !== 'modal') {
      return;
    }
    const { onCancel } = this.props;
    onCancel();
  }

  render() {
    const { isRegister, warning } = this.state;
    
    return (
      <div id="modal" className="fullWindow" onClick={ this.cancelModal }>
        <form onSubmit={ this.loginRegister } className="loginForm">
          <h3 style={ {color: '#757575'} }>{isRegister? 'Register' : 'Log In'}</h3>
          <div className="group">
            <input
              className="loginInput"
              required
              name="username" 
              value={ this.state.username }
              onChange={ this.handleInputChange } />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label className="loginLabel">Email</label>
          </div>
          
          <div className="group">
            <input
              className="loginInput"
              required
              name="password"
              value={ this.state.password }
              onChange={ this.handleInputChange } />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label className="loginLabel">Password</label>
          </div>
          { warning }
          { this.state.isRegister && (
            <div>
              <div className="group">
                <input
                  className="loginInput"
                  required
                  name="passwordRepeat"
                  value={ this.state.passwordRepeat }
                  onChange={ this.handleInputChange } />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label className="loginLabel">Repeat Password</label>
              </div>
              { warning }
              <div className="group">
                <input
                  required="false"
                  className="loginInput"
                  name="occupation"
                  value={ this.state.occupation }
                  onChange={ this.handleInputChange } />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label className="loginLabel">{ 'Occupation (optional)' }</label>
              </div>

            </div>
            )
          }
          
          <a
            onClick={ () => { this.setState({isRegister: !this.state.isRegister}); } }
            className="signUpLink"
          >{isRegister? "Log In" : "Don't have an account? Sign Up!" }</a>
          
          <input type="submit" value={isRegister? "Register" : "Log In"} className="base buttonGreen"/>
        </form>
      </div>
    );
  }
}

/* Define Redux Container */
const mapDispatchToProps = (dispatch) => {
  return {
    userLoggedIn: (user) => {
      console.log('calling...');
      dispatch(setUser(user));
    },
    mutateFetchingStatus: (boolean) => {
      dispatch(toogleIsFetching(boolean));
    },
  }
};

export default connect(
  null,
  mapDispatchToProps
)(LogIn);
