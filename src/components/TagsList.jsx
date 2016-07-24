import React from 'react';
import Paper from 'material-ui/Paper';
import List from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Tag from './Tag.jsx';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import EmptyMessage from './EmptyMessage.jsx';
import SubHeader from 'material-ui/Subheader';
import Dialog from 'material-ui/Dialog';
import RegexTextField from './RegexTextField.jsx';
import C from '../constants';
import * as Colors from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';


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
      snackMessage: '',
      snackOpened: false,
      deletedTag: null,
      tagIconDialogOpened: false,
      tagColorDialogOpened: false,
    };
    this.getRouteName = this.getRouteName.bind(this);
    this.handleTagDialogOpen = this.handleTagDialogOpen.bind(this);
    this.handleTagDialogClose = this.handleTagDialogClose.bind(this);
    this.handleTagNameChange = this.handleTagNameChange.bind(this);
    this.handleTagIconChange = this.handleTagIconChange.bind(this);
    this.handleTagColorChange = this.handleTagColorChange.bind(this);
    this.handleTagCommentsChange = this.handleTagCommentsChange.bind(this);
    this.insertNewTag = this.insertNewTag.bind(this);
    this.updateCurrentTag = this.updateCurrentTag.bind(this);
    this.handleSnackUndo = this.handleSnackUndo.bind(this);
    this.openSnack = this.openSnack.bind(this);
    this.closeSnack = this.closeSnack.bind(this);
    this.removeTagUndoable = this.removeTagUndoable.bind(this);
    this.handleTagIconDialogOpen = this.handleTagIconDialogOpen.bind(this);
    this.handleTagIconDialogClose = this.handleTagIconDialogClose.bind(this);
    this.handleTagColorDialogOpen = this.handleTagColorDialogOpen.bind(this);
    this.handleTagColorDialogClose = this.handleTagColorDialogClose.bind(this);
  }

  getRouteName() {
    if (this.props.route) {
      if (this.props.route.name) {
        return this.props.route.name;
      }
    }
    return '';
  }

  insertNewTag() {
    const { tagNameValue, tagIconValue, tagColorValue, tagCommentsValue } = this.state;
    if (tagNameValue === '') {
      alert('A name is needed');
      return;
    }
    if (tagColorValue === '') {
      alert('A color is needed');
      return;
    }
    if (tagIconValue === '') {
      alert('An icon is needed');
      return;
    }
    if (tagCommentsValue === '') {
      alert('A description is needed');
      return;
    }

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

  removeTagUndoable(tag) {
    this.props.removeTag(tag);
    this.openSnack(tag);
  }

  handleSnackUndo() {
    if (this.state.deletedTag) {
      this.props.insertTag(this.state.deletedTag);
      this.setState({ deletedTag: null });
      this.closeSnack();
    }
  }

  openSnack(tag) {
    this.setState({
      snackOpened: true,
      snackMessage: `Tag '#${tag.name}' has been removed.`,
      deletedTag: tag,
    });
  }

  closeSnack() {
    this.setState({ snackOpened: false });
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

  handleTagIconDialogOpen() {
    this.setState({ tagIconDialogOpened: true });
  }

  handleTagIconDialogClose() {
    this.setState({ tagIconDialogOpened: false });
  }

  handleTagColorDialogOpen() {
    this.setState({ tagColorDialogOpened: true });
  }

  handleTagColorDialogClose() {
    this.setState({ tagColorDialogOpened: false });
  }

  handleTagNameChange(event) {
    this.setState({ tagNameValue: event.target.value });
  }

  handleTagIconChange(icon) {
    this.setState({ tagIconValue: icon });
    this.handleTagIconDialogClose();
  }

  handleTagColorChange(color) {
    this.setState({ tagColorValue: color });
    this.handleTagColorDialogClose();
  }

  handleTagCommentsChange(event) {
    this.setState({ tagCommentsValue: event.target.value });
  }

  render() {
    let tags = this.props.tags;
    if (this.props.routeParams) {
      if (this.props.routeParams.query) {
        tags = tags.filter(tag =>
          tag.name.toUpperCase().indexOf(this.props.routeParams.query.toUpperCase()) !== -1);
      }
    }
    return (
      <div>
        {tags.length > 0 ?
          <Paper>
            <List>
              {tags.map(tag =>
                <Tag
                  name={tag.name}
                  comments={tag.comments}
                  icon={tag.icon ? tag.icon : null}
                  color={tag.color ? tag.color : null}
                  tagKey={tag.key}
                  onDeleteClick={this.removeTagUndoable}
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
          <EmptyMessage
            iconName="label_outline"
            message="No tags, add one!"
          />
        }
        <FloatingActionButton
          secondary
          style={{
            position: 'fixed',
            right: 20,
            bottom: 20,
            display: this.getRouteName() === 'Search' ? 'none' : 'block',
          }}
          iconStyle={{ color: Colors.lightBlack }}
          onTouchTap={this.handleTagDialogOpen}
        >
          <FontIcon className="material-icons">add</FontIcon>
        </FloatingActionButton>
        <Dialog
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
          <span style={{ display: 'inline-block', fontSize: 35, marginRight: 5 }}>
            #
          </span>
          <div style={{ display: 'inline-block' }}>
            <RegexTextField
              fullWidth
              style={{
                fontSize: 35,
                height: '4rem',
                fontWeight: '300',
                paddingBottom: '-10px',
              }}
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
          <div style={{ display: 'inline-block', marginBottom: 30 }}>
            <TextField
              hintText="Comments"
              value={this.state.tagCommentsValue}
              onChange={this.handleTagCommentsChange}
            />
          </div>
          <SubHeader>Icon</SubHeader>
          <div style={{ display: 'inline-block' }}>
            <FontIcon
              className="material-icons"
              style={{ verticalAlign: 'middle', fontSize: 35, marginRight: 13 }}
            >
              {this.state.tagIconValue}
            </FontIcon>
            <RaisedButton
              label="Choose an icon..."
              onTouchTap={this.handleTagIconDialogOpen}
              style={{ verticalAlign: 'middle' }}
            />
            <Dialog
              title="Choose an icon"
              modal={false}
              open={this.state.tagIconDialogOpened}
              onRequestClose={this.handleTagIconDialogClose}
              autoScrollBodyContent
            >
              <div className="row">
                {C.MdIcons.map(icon => (
                  <IconButton
                    iconClassName="material-icons"
                    style={{
                      padding: 10,
                      cursor: 'pointer',
                    }}
                    onTouchTap={() => this.handleTagIconChange(icon)}
                  >
                    {icon}
                  </IconButton>
                ))}
              </div>
            </Dialog>
          </div>
          <SubHeader>Color</SubHeader>
          <div style={{ display: 'inline-block' }}>
            <div
              style={{
                background: this.state.tagColorValue,
                verticalAlign: 'middle',
                width: 28,
                height: 28,
                marginLeft: 3,
                marginRight: 17,
                borderRadius: '50%',
              }}
            ></div>
            <RaisedButton
              label="Choose a color..."
              onTouchTap={this.handleTagColorDialogOpen}
              style={{ verticalAlign: 'middle' }}
            />
            <Dialog
              title="Choose a color"
              modal={false}
              open={this.state.tagColorDialogOpened}
              onRequestClose={this.handleTagColorDialogClose}
              autoScrollBodyContent
            >
              <div className="row">
                {C.MdColors.map(color => (
                  <div className="col s1">
                    <div
                      style={{
                        background: color,
                        width: 40,
                        height: 40,
                        margin: 10,
                        borderRadius: '50%',
                      }}
                      onClick={() => this.handleTagColorChange(color)}
                    ></div>
                  </div>
                ))}
              </div>
            </Dialog>
          </div>
        </Dialog>
        <Snackbar
          open={this.state.snackOpened}
          message={this.state.snackMessage}
          action="undo"
          autoHideDuration={4000}
          onActionTouchTap={this.handleSnackUndo}
          onRequestClose={this.closeSnack}
          style={{
            top: 0,
            marginLeft: 280,
            bottom: 'auto',
            transform: this.state.snackOpened ?
                'translate3d(0, 0, 0)' :
                'translate3d(0, -50px, 0)',
          }}
          />
      </div>
    );
  }
}

TagsList.propTypes = {
  tasks: React.PropTypes.array,
  tags: React.PropTypes.array,
  route: React.PropTypes.object,
  routes: React.PropTypes.array,
  routeParams: React.PropTypes.object,
  insertTag: React.PropTypes.func,
  updateTag: React.PropTypes.func,
  removeTag: React.PropTypes.func,
};
