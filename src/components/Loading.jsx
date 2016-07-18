import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export function Loading() {
  return (
    <div className="center-align" style={{ paddingTop: 100 }}>
      <CircularProgress />
    </div>
  );
}
