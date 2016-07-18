import React from 'react';

export function NotFound() {
  return (
    <div>
      <p><strong>Error [404]</strong>: {window.location.pathname} does not exist.</p>
    </div>
  );
}
