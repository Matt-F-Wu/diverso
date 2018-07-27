import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../Button';
import './AppBar.css';
import logo from '../../media/logo.svg';
/* Media imports */
import c_icon from '../../media/conversation.svg';
import t_icon from '../../media/toolkit.svg';
import m_icon from '../../media/map.svg';
import a_icon from '../../media/about.svg';
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
    const { icon, text, to } = this.props;
    return (
      <Link
        to={to}
        className={ window.location.pathname === to ? 'activeLink' : 'inactiveLink' }
        style={ {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textDecoration: 'none',
          color: 'black',
        } } >
        <img src={ icon } />
        <span>{ text }</span>
      </Link>
    );
  }
}

class AppBar extends Component {
	render(){
		return (
			<div 
        className={ 'container' } 
        onClick={ () => {
          this.forceUpdate();
      } }>
        <img src={ logo } className={ 'logo' }/>
          <TopNavLink icon={ c_icon }
            text={ "Let's Talk" }
            to="/dialog"
          />
          <TopNavLink icon={ t_icon }
            text={ "ToolKit" }
            to="/toolkit"
          />
          <TopNavLink icon={ m_icon }
            text={ "Theory Map" }
            to="/map"
          />
          <TopNavLink icon={ a_icon }
            text={ "About" }
            to="/about"
          />
        <Button
          label={ 'Sign In' }
          type={ 'buttonGreen' }
        />
			</div>
		);
	}
}

/* Define Redux Container */
const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(
  mapStateToProps,
  null
)(AppBar);