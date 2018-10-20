import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class SnackBar extends React.Component {
  state = {};

  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick={false}
          pauseOnVisibilityChange
        />
        {children}
      </React.Fragment>
    );
  }
}

SnackBar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default SnackBar;
