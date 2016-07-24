import React from 'react';
import { ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import { grey600, white } from 'material-ui/styles/colors';
import { avatarBackgroundColor } from '../themes.js';

export default class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
    };
    this.removeTag = this.removeTag.bind(this);
  }

  removeTag() {
    const { name, icon, color, comments, tagKey } = this.props;
    this.props.onDeleteClick({ name, icon, color, comments, key: tagKey });
  }

  render() {
    return (
      <ListItem
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
        leftAvatar={
          <Avatar
            backgroundColor={!this.props.color ? avatarBackgroundColor : this.props.color}
            color={white}
            icon={this.props.icon ?
              <FontIcon className="material-icons">{this.props.icon}</FontIcon>
            : null}
          >
            {!this.props.icon ? this.props.name.charAt(0).toUpperCase() : null}
          </Avatar>
        }
        primaryText={`#${this.props.name}`}
        secondaryText={this.props.comments}
      >
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 12,
          }}
        >
          <IconButton
            iconClassName="material-icons"
            tooltip="Delete"
            iconStyle={{ color: grey600 }}
            onTouchTap={this.removeTag}
            style={{
              position: 'absolute',
              right: 0,
            }}
          >
            delete
          </IconButton>
          <IconButton
            iconClassName="material-icons"
            tooltip="Edit"
            onTouchTap={this.props.onEditClick}
            iconStyle={{ color: grey600 }}
            style={{
              position: 'absolute',
              right: 48,
            }}
          >
            edit
          </IconButton>
        </div>
      </ListItem>
    );
  }
}

Tag.propTypes = {
  name: React.PropTypes.string,
  comments: React.PropTypes.string,
  icon: React.PropTypes.string,
  color: React.PropTypes.string,
  tagKey: React.PropTypes.string,
  onEditClick: React.PropTypes.func,
  onDeleteClick: React.PropTypes.func,
};
