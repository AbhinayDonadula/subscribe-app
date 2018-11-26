import React from 'react';
import PropTypes from 'prop-types';

class AlertBox extends React.Component {
  state = {};

  render() {
    const {
      error,
      errMsg,
      errDesc,
      warningMsg,
      warning,
      warningDesc
    } = this.props;
    return (
      <React.Fragment>
        {error ? (
          <div className="alert__box">
            <div className="alert__img" />
            <span className="err__msg">
              <span>{errMsg}</span> - {errDesc}
            </span>
            {/* <span className="err__desc"></span> */}
          </div>
        ) : null}
        {warning ? (
          <div className="alert__box">
            <img src="" alt="" />
            <span className="err__msg">
              {warningMsg} - {warningDesc}
            </span>
            {/* <span className="err__desc"></span> */}
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

AlertBox.propTypes = {
  error: PropTypes.bool,
  warning: PropTypes.bool,
  errMsg: PropTypes.string,
  errDesc: PropTypes.string,
  warningDesc: PropTypes.string,
  warningMsg: PropTypes.string
};

AlertBox.defaultProps = {
  error: false,
  warning: false,
  errMsg: '',
  warningMsg: '',
  errDesc: '',
  warningDesc: ''
};

export default AlertBox;
