import React from 'react';
import Paper from 'material-ui/Paper';
import List from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import { Tag } from './Tag.jsx';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import RegexTextField from './RegexTextField.jsx';
import * as Colors from 'material-ui/styles/colors';
// import { insertTag, updateTag, removeTag } from '../../api/tags/methods';

export default class TagsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagDialogOpened: false,
      tagNameValue: '',
      currentKey: false,
      tagIconValue: 'label_outline',
      tagColorValue: Colors.pink400,
      tagCommentsValue: '',
    };
    this.handleTagDialogOpen = this.handleTagDialogOpen.bind(this);
    this.handleTagDialogClose = this.handleTagDialogClose.bind(this);
    this.handleTagNameChange = this.handleTagNameChange.bind(this);
    this.handleTagIconChange = this.handleTagIconChange.bind(this);
    this.handleTagColorChange = this.handleTagColorChange.bind(this);
    this.handleTagCommentsChange = this.handleTagCommentsChange.bind(this);
    this.insertNewTag = this.insertNewTag.bind(this);
    this.updateCurrentTag = this.updateCurrentTag.bind(this);
  }

  insertNewTag() {
    const tag = {
      name: this.state.tagNameValue,
      icon: this.state.tagIconValue,
      color: this.state.tagColorValue,
      comments: this.state.tagCommentsValue,
    };
    this.props.insertTag(tag);
    this.handleTagDialogClose();
  }

  updateCurrentTag() {
    const tag = {
      name: this.state.tagNameValue,
      icon: this.state.tagIconValue,
      color: this.state.tagColorValue,
      comments: this.state.tagCommentsValue,
      key: this.state.currentKey,
    };
    this.props.updateTag(tag);
    this.handleTagDialogClose();
  }

  handleTagDialogOpen() {
    this.setState({ tagDialogOpened: true });
  }

  handleTagDialogClose() {
    this.setState({
      tagDialogOpened: false,
      currentKey: false,
      tagNameValue: '',
      tagIconValue: 'label_outline',
      tagColorValue: Colors.pink400,
      tagCommentsValue: '',
    });
  }

  handleTagNameChange(event) {
    this.setState({ tagNameValue: event.target.value });
  }

  handleTagIconChange(event) {
    this.setState({ tagIconValue: event.target.value.replace(/ /g, '_') });
  }

  handleTagColorChange(event) {
    const text = event.target.value;
    const color = Colors[text] ? Colors[text] : text;
    this.setState({ tagColorValue: color });
  }

  handleTagCommentsChange(event) {
    this.setState({ tagCommentsValue: event.target.value });
  }

  render() {
    return (
      <div>
        {this.props.tags.length > 0 ?
          <Paper>
            <List>
              {this.props.tags.map(tag =>
                <Tag
                  name={tag.name}
                  comments={tag.comments}
                  icon={tag.icon ? tag.icon : null}
                  color={tag.color ? tag.color : null}
                  tagKey={tag.key}
                  onDeleteClick={this.props.removeTag}
                  onEditClick={() => {
                    this.setState({
                      tagDialogOpened: true,
                      currentKey: tag.key,
                      tagNameValue: tag.name,
                      tagIconValue: tag.icon,
                      tagColorValue: tag.color,
                      tagCommentsValue: tag.comments,
                    });
                  }}
                />
              )}
            </List>
          </Paper>
          :
          <p style={{ textAlign: 'center' }}>
            <FontIcon className="material-icons">add</FontIcon>
            <br />
            <span>No tag added yet!</span>
          </p>
        }
        <FloatingActionButton
          secondary
          style={{ position: 'fixed', right: 20, bottom: 20 }}
          iconStyle={{ color: Colors.lightBlack }}
          onTouchTap={this.handleTagDialogOpen}
        >
          <FontIcon className="material-icons">add</FontIcon>
        </FloatingActionButton>
        <Dialog
          title="Add a tag"
          actions={[
            <FlatButton
              label="Cancel"
              secondary
              onTouchTap={this.handleTagDialogClose}
            />,
            <FlatButton
              label="Save"
              primary
              onTouchTap={() => {
                if (!this.state.currentKey) {
                  this.insertNewTag();
                } else {
                  this.updateCurrentTag();
                }
              }}
            />,
          ]}
          modal
          open={this.state.tagDialogOpened}
        >
          <span style={{ display: 'inline-block', fontSize: 20, marginRight: 18 }}>
            #
          </span>
          <div style={{ display: 'inline-block' }}>
            <RegexTextField
              hintText="Name of the new tag"
              errorRegex="2-20 caractères. Letters, numbers, _ and -"
              errorUnavailable="This Tag already exists"
              regex={/^[a-zA-Z0-9_-]{1,20}$/}
              unavailableValues={this.props.tags.map(tag => tag.name)}
              value={this.state.tagNameValue}
              onChange={this.handleTagNameChange}
            />
          </div>
          <br />
          <FontIcon
            className="material-icons"
            style={{ display: 'inline-block', marginLeft: -3, fontSize: 20, marginRight: 13 }}
          >
            {this.state.tagIconValue}
          </FontIcon>
          <div style={{ display: 'inline-block' }}>
            <RegexTextField
              hintText="Google's MD icon name"
              errorRegex="Unconform name"
              errorUnavailable="This Tag already exists"
              regex={/^[a-zA-Z_ -]{3,30}$/}
              unavailableValues={[]}
              value={this.state.tagIconValue}
              onChange={this.handleTagIconChange}
            />
          </div>
          <br />
          <div
            style={{
              display: 'inline-block',
              marginLeft: 0,
              width: 15,
              height: 15,
              borderRadius: '50%',
              marginRight: 18,
              background: this.state.tagColorValue,
            }}
          ></div>
          <div style={{ display: 'inline-block' }}>
            <TextField
              hintText="Color (orange or orange500 or #545454 or rgb(1,2,3))"
              value={this.state.tagColorValue}
              onChange={this.handleTagColorChange}
            />
          </div>
          <br />
          <FontIcon
            className="material-icons"
            style={{ display: 'inline-block', marginLeft: -3, fontSize: 20, marginRight: 13 }}
          >
            comment
          </FontIcon>
          <div style={{ display: 'inline-block' }}>
            <TextField
              hintText="Comments"
              value={this.state.tagCommentsValue}
              onChange={this.handleTagCommentsChange}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}

TagsList.propTypes = {
  tasks: React.PropTypes.array,
  tags: React.PropTypes.array,
  insertTag: React.PropTypes.func,
  updateTag: React.PropTypes.func,
  removeTag: React.PropTypes.func,
};
