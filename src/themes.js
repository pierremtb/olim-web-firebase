import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  black,
  white,
  lightBlack,
  darkBlack,
  blueGrey900,
  blueGrey800,
  yellow500,
  fullBlack
} from 'material-ui/styles/colors';
import { fade, emphasize } from 'material-ui/utils/colorManipulator';

export const accentColor = yellow500;
export const primaryColor = blueGrey800;
export const primaryDarkColor = blueGrey900;
export const disabledColor = fade(black, 0.38);
export const avatarBackgroundColor = emphasize(white, 0.26);
export const primaryTextColor = fade(darkBlack, 0.87);
export const secondaryTextColor = fade(darkBlack, 0.54);
export const hintTextColor = fade(darkBlack, 0.38);

export const globalTheme = getMuiTheme({
  palette: {
    accent1Color: accentColor,
    primary1Color: accentColor,
  },
  floatingActionButton: {
    iconColor: lightBlack,
  },
});


export const sometLightTheme = getMuiTheme({
  palette: {
    leftIconColor: white,
    primary1Color: primaryColor,
    accent1Color: accentColor,
    textColor: darkBlack,
  },
  textField: {
    focusColor: accentColor,
  },
});

export const fabStyle = {
  position: 'fixed',
  right: '1rem',
  bottom: '1rem',
};

export const loginCardStyle = {
  padding: 16,
};

export const loginTextFieldStyle = {
  marginLeft: 20,
};

export const pageActionStyle = {
  color: '#FFF',
  marginRight: '1rem',
  marginBottom: '0rem',
};

export const datePickerFieldStyle = {
  color: 'white !default',
  fontSize: '2.5rem',
  fontWeight: '300',
  paddingBottom: '15px',
};

export const datePickerStyle = {
  display: 'inline-block',
  color: darkBlack,
};

export const textFieldStyleDark = {
  color: 'white',
  fontSize: '2.5rem',
  height: '4rem',
  fontWeight: '300',
  paddingBottom: '15px',
};

export const normalTextFieldStyleDark = {
  color: 'white',
};

export const hintTextFieldStyleDark = {
  color: 'rgba(255,255,255,0.7)',
  paddingBottom: '15px',
};

export const workoutCardTextStyle = {
  height: '15rem',
  overflowY: 'auto',
};

export const planCardTextStyle = {
  height: '9rem',
  overflowY: 'auto',
};

export const disabledTextStyle = {
  color: disabledColor,
};

export const secondaryTextStyle = {
  color: fade(black, 0.54),
};
