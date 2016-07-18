import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default function Loading() {
  return (
    <div className="center-align" style={{ paddingTop: 100 }}>
      <CircularProgress />
    </div>
  );
}
