import React from 'react';
import PropTypes from 'prop-types';

const Page = ({ children, cool }) => {
  return (
    <div>
      <h2>I'm the page!</h2>
      {children}
    </div>
  );
};

Page.propTypes = {
  cool: PropTypes.string,
  children: PropTypes.any,
};

export default Page;
