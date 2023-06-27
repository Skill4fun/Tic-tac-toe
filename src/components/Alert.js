////------------------ Alert ------------------
// Custom Alert component for multiple use
import React from 'react';

function Alert({ theme, children }) {
  return (
    <div className={`alert alert-${theme} mt-3 mx-auto text-center`} role="alert" style={{ "width": "250px" }}>
      {children}
    </div>
  );
}

export default Alert;