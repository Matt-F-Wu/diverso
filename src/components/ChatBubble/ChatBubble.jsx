import React, { Component } from 'react';
import './ChatBubble.css';
import Button from '../Button';
import bird_circle from '../../media/bird_circle.svg';
import BMIcon from '../../media/bookmark';

export default class ChatBubble extends Component {
  state={
    showMenu: false,
    bookMarked: false,
    bookMarkingType: {isTop: false, isBottom: false},
  }

  styleChange = (t) => {
    this.setState({
      bookMarked: !this.state.bookMarked,
      bookMarkingType: t,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.bookMarks.length !== this.props.bookMarks.length){
      this.state.bookMarkingType = this.calculateBorderStyle(nextProps.bookMarks);
      this.state.bookMarked = nextProps.bookMarks.includes(nextProps.index);
    }
    return true;
  }

  calculateBorderStyle = (bookMarks) => {
    const index = this.props.index;
    let isTop = true;
    let isBottom = true;   
    // Could have bottom neighbor
    if ( bookMarks.includes(index + 1) ){
      // not bottom
      isBottom = false;
    }
    // Could have top neighbor
    if ( bookMarks.includes(index - 1) ){
      // not top
      isTop = false;
    }
    return {isTop, isBottom};
  }

  onClickBookmark = () => {
    if (this.state.bookMarked){
      // this.setState({
      //   bookMarked: !this.state.bookMarked,
      // });
      this.props.bookMarking(this.props.index, true);
      return;  
    }
    
    const { bookMarks } = this.props;
    // this.styleChange(this.calculateBorderStyle(bookMarks));
    // fire callback in the end
    this.props.bookMarking(this.props.index);
  }

	render() {
    /* hostRef needed for Pose animation */
		const { hostRef, message, onActionClick } = this.props;
    const { bookMarkingType } = this.state;
    // border style picking
    let borderStyle = '';
    if (this.state.bookMarked) {
      borderStyle = bookMarkingType.isTop
      ? bookMarkingType.isBottom ? 'fullBookmark' : 'topBookmark'
      : bookMarkingType.isBottom ? 'bottomBookmark' : 'middleBookmark';
    } else {
      borderStyle += 'noBookmark';
    }
    
    // console.log(borderStyle);
    const bubbleClassName = message.speaker === 'user'? 'userBubble' : 'programBubble';
    const bubbleRowClassName = message.speaker === 'user'? 'userBubbleRow' : 'programBubbleRow';
		return (
    <div className={ `jsx_container ${ borderStyle }` }>
      <div ref={ hostRef } className={ `bubbleRow ${ bubbleRowClassName }` }>
        { message.speaker === 'program' && (
            <div
              className={ 'avatarContainer' }
              onClick={ this.onClickBookmark }
            >
              <img src={ bird_circle } className="avatar" />
            </div>
          )
        }
        <div className="flexRow bubbleColumn"
          onMouseOver={() => {this.setState({showMenu: true})}}
          onMouseLeave={() => {this.setState({showMenu: false})}}
        >
          <div className="flexColumn" style={{width: 'calc(100% - 60px)', minWidth: 'calc(100% - 60px)'}}>
            {
              message.body.map((ele) => 
                ele.type === 'text'
                ? <div
                    className={ `bubbleBase ${ bubbleClassName }` }>
                    { ele.value }
                  </div>
                : <div className="jsx_container" dangerouslySetInnerHTML={{ __html: ele.value}}></div>
              )
            }
            {/*Display user's choices here*/}
            {
            message.actions && message.actions.length > 0 && (
            <div className={ 'bubbleBase choiceBubble' }>
              {
                message.actions.map((a, i) => 
                  <Button key={ i }
                    label={ a.name }
                    type="buttonRed"
                    className="choiceButtonWithMargin"
                    onClick={ () => onActionClick(a, message) }
                  />
                )
              }
            </div>
            )
            }
          </div>
          {
            this.state.showMenu &&
            <div className="floatingMenu">
                <BMIcon onClick={ this.onClickBookmark } marked={ this.state.bookMarked }/>
            </div>
          }
        </div>
        { this.props.children }
      </div>
      {
        message.selection && (
          <div className={ `bubbleRow userBubbleRow` }>
            <div
              className={ 'bubbleBase userBubble' }>
              { message.selection }
            </div>
          </div>
        )
      }
    </div>
    );
	}
}