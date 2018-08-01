import React, { Component } from 'react';
import './ToolKit.css';
import { connect } from 'react-redux';
import Dialog from '../Dialog';
import BookMarkFolder from '../BookMarkFolder';
import { fetchUser } from '../../api/communication';
import {
  toogleIsFetching,
  setUser,
} from '../LogIn/actions';

class ToolKit extends Component {
  state = {
    folderChosen: null,
    showDialog: false,
    dialogTitle: '',
    dialogBody: '',
    folders: [],
  }

  static getDerivedStateFromProps(props, state) {
    const { bookmarks } = props.user.userData;
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
    return { folders: folders };
  }
  
  constructor(props) {
    super(props);
    const { user, updateUser, mutateFetchingStatus } = props;
    if ( user.userData && user.userData._id) {
      mutateFetchingStatus(true);
      fetchUser(user.userData._id).then((user) => {
        this.props.updateUser(user.data);
        mutateFetchingStatus(false);
      }).catch((err) => {
        mutateFetchingStatus(false);
        this.openDialog('Sorry', 'Cannot sync your bookmarks with our server at the moment, try refresh!');
      });
    }
  }

  openDialog = (dialogTitle, dialogBody) => {
    this.setState({
      dialogTitle,
      dialogBody,
      showDialog: true,
    });
  }

  cancelDialog = () => {
    this.setState({
      showDialog: false,
    });
  }

  renderFolders = () => {
    const { folders } = this.state;
    
    return (
      <div className="panelFlexFull">
        {
          folders && Object.keys(folders).map((f, i) =>
            <BookMarkFolder
              folders={folders}
              fname={ f }
              i={ i }
              key={ i }
            />
          )
        }
      </div>
    );
  }

  render() {
    const { userData } = this.props.user;
    const { folders } = this.state;
    if (!userData.username) {
      return null;
    }
    return (
      <div className="ToolKitContainer">
        <div
          className="userInfoBM"
          style={ {
            display: 'flex',
            flexDirection: 'column',
            padding: 32,
            width: '20%',
            flexWrap: 'wrap',
          } }
        >
          <p className="greyBoldText">{ userData.username }</p>
          <p><span className="pinkText">{ userData.bookmarks.length }</span> bookmarks</p>
          <p>in <span className="pinkText">{ Object.keys(folders).length }</span> folders</p>
        </div>
        { this.renderFolders() }
        {
          this.state.showDialog &&
          <Dialog
            labelPos="Okay" clickPos={ this.cancelDialog } title={ this.state.dialogTitle } body={ this.state.dialogBody }
          />
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
