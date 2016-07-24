import React from 'react';
import { blueGrey800 } from 'material-ui/styles/colors';

export default function PublicLayout({ children }) {
  document.body.style.backgroundColor = blueGrey800;

  return (
    <div>
      {children}
    </div>
  );
}

PublicLayout.propTypes = {
  children: React.PropTypes.element,
};
