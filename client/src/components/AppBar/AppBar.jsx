import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../Button';
import LogIn from '../LogIn';
import './AppBar.css';
import logo from '../../media/logo.svg';
/* Media imports */
import c_icon from '../../media/conversation.svg';
import t_icon from '../../media/toolkit.svg';
import a_icon from '../../media/about.svg';
import {
  setUser,
} from '../LogIn/actions';
import Dialog from '../Dialog';
import { logoutUser } from '../../api/communication';
/* States needed:
user: Object *undefined meaning user is not logged in*
*/

// Top Link Text Style
const TopLinkTextStyle = {
  textDecoration: 'none',
  color: 'black' };

// Simple pure component
class TopNavLink extends Component {
  render(){
    const { icon, to, className, ...others } = this.props;
    return (
      <Link
        {...others}
        to={to}
        className={ `${ window.location.pathname === to ? 'activeLink' : 'inactiveLink' } ${className}` }
        style={ {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textDecoration: 'none',
          color: 'black',
        } } >
        <img src={ icon } />
      </Link>
    );
  }
}

class AppBar extends Component {
  state = {
    modalOpen: false,
    showDialog: false,
    dialogTitle: '',
    dialogBody: '',
  }

  constructor(props) {
    super(props);
    /* global sessionStorage */
    const userData = sessionStorage.getItem('diverso_session_user') || {};
    const { userLoggedIn } = props;
    /* global JSON */
    if (userData !== {}) {
      console.log(userData);
      try{
        let userDataObj = JSON.parse(userData);
        userLoggedIn(userDataObj);
      } catch(err) {
        userLoggedIn({});
        console.log(err);
      }
    }
  }

  cancelDialog = () => {
    this.setState({
      showDialog: false,
    });
  }

  reportError = (dialogTitle, dialogBody) => {
    this.setState({
      dialogTitle,
      dialogBody,
      showDialog: true,
    });
  }

  logout = () => {
    this.props.userLogOut();
    sessionStorage.removeItem('diverso_session_user');
    // TODO? Make api call to log out from server
    logoutUser();
  }

	render(){
    const { userData } = this.props.user;
    
		return (
			<div 
        className={ 'container' } 
        onClick={ () => {
          this.forceUpdate();
      } }>
          <Link to="/dialog" style={ { height: '100%', marginTop: 10 } }>
            <img src={ logo } className={ 'logo' }/>
          </Link>
          <div className="flexRow flexCenter">
            { userData.username && 
              <Link to="/dialog" style={ { height: '100%' } } className="marginHMedium">
                <Button
                  label={ userData.username.substring(0, 1).toUpperCase() }
                  className="userIcon"
                />
              </Link>
            }
            <TopNavLink icon={ t_icon }
              text={ "ToolKit" }
              to="/toolkit"
              className="marginHMedium"
            />
            <TopNavLink icon={ a_icon }
              text={ "About" }
              to="/about"
              className="marginHMedium"
            />
            { !userData.username &&
              <Button
                onClick={ () => { this.setState({modalOpen: true}); } }
                label={ 'Sign In' }
                type={ 'buttonGreen' }
                style={ { marginLeft: 16 } }
              />
            }
            {
              userData.username &&
              <Button
                onClick={ this.logout }
                label={ 'Log Out' }
                type={ 'buttonRed' }
                style={ { marginLeft: 16 } }
              />
            }
          </div>
          { this.state.modalOpen &&
            <LogIn
              onCancel={() => { this.setState({modalOpen: false}); }}
              reportError={ this.reportError }
            />
          }
          { this.state.showDialog &&
            <Dialog
              labelPos="Okay" clickPos={ this.cancelDialog } title={ this.state.dialogTitle } body={ this.state.dialogBody }
            /> 
          }
			</div>
		);
	}
}

/* Define Redux Container */
const mapDispatchToProps = (dispatch) => {
  return {
    userLoggedIn: (user) => {
      dispatch(setUser(user));
    },
    userLogOut: () => {
      dispatch(setUser({}));
    },
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppBar);