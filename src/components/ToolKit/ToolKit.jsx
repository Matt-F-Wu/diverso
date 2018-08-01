import React, { Component } from 'react';
import './ToolKit.css';
import { connect } from 'react-redux';
import ChatBubble from '../ChatBubble';
import { fetchUser } from '../../api/communication';
import {
  toogleIsFetching,
  setUser,
} from '../LogIn/actions';

class ToolKit extends Component {
  
  constructor(props) {
    super(props);
    const { user, updateUser, mutateFetchingStatus } = props;
    if ( user.userData && user.userData._id) {
      mutateFetchingStatus(true);
      fetchUser(user.userData._id).then((user) => {
        this.props.updateUser(user.data);
        mutateFetchingStatus(false);
        console.log(user);
      }).catch((err) => {
        mutateFetchingStatus(false);
        console.log(err);
      });
    }
  }

  renderFolders = () => {
    const { bookmarks } = this.props.user.userData;
    const folders = {};
    if(bookmarks){
      bookmarks.forEach((bm) => {
        if (folders[bm.folder] !== undefined) {
          folders[bm.folder] = [...folders[bm.folder], bm.message];
        } else {
          folders[bm.folder] = [bm.message];
        }
      });
    }
    console.log(folders['general'], Object.keys(folders));
    return (
      <div>
        {
          folders && Object.keys(folders).map((f, i) =>
            <div class="">
              <p>{ f }</p>
              {
                folders['general'].map((message, idx) => {
                  return (
                    message &&
                    <ChatBubble
                      key={ i }
                      index={ i }
                      message={ message }
                      bookMarks={ [] }
                      bookMarking={ () => {} }
                      raiseHand={ () => {} }
                      onActionClick={ () => {} } />
                  );
                })  
              }
            </div>
          )
        }
      </div>
    );
  }

  render() {
    return (
      <div className="ToolKitContainer">
        <p>Your bookmarks</p>
        {
          this.renderFolders()
        }
      </div>
    );
  }
}

/* Define Redux Container */
const mapStateToProps = (state) => {
  const { user } = state;
  return {
    user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => {
      dispatch(setUser(user));
    },
    mutateFetchingStatus: (boolean) => {
      dispatch(toogleIsFetching(boolean));
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolKit);
