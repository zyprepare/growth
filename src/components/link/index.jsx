import React from 'react';
import Proptypes from 'prop-types';

const Link = ({ onClick, children, active }) => {
  if (active) {
    return <span>{children}</span>;
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </button>
  );
};

Link.propTypes = {
  onClick: Proptypes.func.isRequired,
  active: Proptypes.bool.isRequired,
  children: Proptypes.string.isRequired,
};

export default Link;
