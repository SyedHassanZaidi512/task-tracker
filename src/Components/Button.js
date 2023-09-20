import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Button = ({color, text, onClick}) => {
  return (
    <div>
      <button className="btn" style={{backgroundColor: color}} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

Button.defaultProps = {
  color: 'steelblue'
};
Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func
};
export default Button;
