import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Img from './Img';

// get spinner div
const modalPortalRoot = document.getElementById(
  'spinner__portal-subscriptions'
);

class SpinnerPortal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    const { filtering } = this.props;
    modalPortalRoot.appendChild(this.el);
    if (filtering) {
      document
        .getElementById('spinner-modal')
        .setAttribute('class', 'filtering__spinner');
    }
  }

  componentWillUnmount() {
    modalPortalRoot.removeChild(this.el);
  }

  render() {
    const ModalBody = (
      <div className="app__loader">
        <Img spinner appLoader src="/images/od/v2/loading.gif" />
        <div className="modal-backdrop" />
      </div>
    );
    return ReactDOM.createPortal(ModalBody, this.el);
  }
}

SpinnerPortal.propTypes = {
  filtering: PropTypes.bool
};

SpinnerPortal.defaultProps = {
  filtering: false
};

export default SpinnerPortal;
