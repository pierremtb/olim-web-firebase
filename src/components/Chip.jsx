import React from 'react';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import { lightBlack } from 'material-ui/styles/colors';
import { chipBackgroundColor, chipDeleteIconColor, chipTextColor, chipBoxShadow } from '../themes.js';

const paperStyle = {
  background: chipBackgroundColor,
  borderRadius: 16,
  height: 32,
  boxShadow: chipBoxShadow,
  display: 'inline-block',
  verticalAlign: 'top',
};

const labelStyle = {
  fontSize: 14,
  color: chipTextColor,
  marginLeft: 8,
  marginRight: 8,
  marginTop: 8,
  display: 'inline-block',
  verticalAlign: 'top',
};

const deleteStyle = {
  fontSize: 24,
  display: 'inline-block',
  verticalAlign: 'top',
  background: '#A6A6A6',
  width: 23,
  marginRight: 4,
  marginTop: 4,
  height: 23,
  borderRadius: '50%',
};

const deleteIconStyle = {
  color: chipBackgroundColor,
  fontSize: 18,
  textAlign: 'center',
  marginLeft: 2.7,
  cursor: 'pointer',
  transform: 'translateY(-1.5px)',
};

export class Chip extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.leftIcon);
  }

  render() {
    return (
      <div style={paperStyle}>
        <Avatar
          size={32}
          backgroundColor={this.props.leftColor}
          color="white"
          icon={this.props.leftIcon ?
            <FontIcon className="material-icons">{this.props.leftIcon}</FontIcon>
            : null
          }
        >
          {!this.props.leftIcon ? this.props.leftChar : null}
        </Avatar>
        <span style={labelStyle}>{this.props.text}</span>
        <div style={deleteStyle} onClick={this.props.onDeleteButtonClick}>
          <FontIcon className="material-icons" style={deleteIconStyle}>clear</FontIcon>
        </div>
      </div>
    );
  }
}


Chip.propTypes = {
  deletable: React.PropTypes.bool,
  text: React.PropTypes.string,
  leftIcon: React.PropTypes.string,
  leftChar: React.PropTypes.string,
  leftColor: React.PropTypes.string,
  onDeleteButtonClick: React.PropTypes.func,
};

