import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../Button';
import './AppBar.css';
import logo from '../../media/logo.svg';
/* Media imports */
import c_icon from '../../media/conversation.svg';
import t_icon from '../../media/toolkit.svg';
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
	render(){
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
            <Button
              label={ 'Sign In' }
              type={ 'buttonGreen' }
              style={ { marginLeft: 16 } }
            />
          </div>
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