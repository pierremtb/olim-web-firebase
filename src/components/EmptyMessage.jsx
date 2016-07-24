import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import { secondaryTextColor, hintTextColor } from '../themes.js';

const style = {
  container: {
    textAlign: 'center',
    marginTop: 200,
  },
  icon: {
    fontSize: 100,
    color: hintTextColor,
  },
  message: {
    fontSize: 40,
    marginTop: -5,
    fontWeight: 30,
    color: secondaryTextColor,
  },
};

export default function EmptyMessage(props) {
  return (
    <div style={style.container}>
      <FontIcon
        className="material-icons"
        style={style.icon}
      >
        {props.iconName}
      </FontIcon>
      <p
        style={style.message}
      >
        {props.message}
      </p>
    </div>
  );
}

EmptyMessage.propTypes = {
  iconName: React.PropTypes.string,
  message: React.PropTypes.string,
};
