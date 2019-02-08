import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import cancelAutoRenewal from '../../apiCalls/cancelAutoRenewal';

const modalPortalRoot = document.getElementById('auto__renewal-portal');

class AutoRenewalPortal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    if (modalPortalRoot) modalPortalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalPortalRoot.removeChild(this.el);
  }

  handleCancel = async () => {
    const { handleSubmit, contractId, lineNumber, closeModal } = this.props;
    try {
      await cancelAutoRenewal(false, contractId, lineNumber);
      handleSubmit();
    } catch (err) {
      closeModal();
    }
  };

  render() {
    const { closeModal } = this.props;

    const ModalBody = (
      <React.Fragment>
        <div className="renewal_container">
          <div className="top__border" />
          <span className="close_icon" onClick={closeModal}>
            X
          </span>
          <span>
            <img
              src="http://s7d1.scene7.com/is/image/officedepot/alert_mob"
              alt=""
            />
          </span>
          <div className="question">
            Are you sure you want to cancel Auto-Renewal?
          </div>
          <div className="message">
            This cancellation is permanent. If you would like to reactivate your
            auto-renewal, you will have to contact a customer service
            representative.
          </div>
          <div className="cancel_button">
            <button type="button" onClick={this.handleCancel}>
              Yes. Cancel My Auto-Renewal
            </button>
          </div>
          <div className="change_mind">
            <a
              onClick={(event) => {
                event.preventDefault();
                closeModal();
              }}
            >
              No, I Changed My Mind
            </a>
          </div>
        </div>
        <div className="modal-backdrop" />
      </React.Fragment>
    );
    return ReactDOM.createPortal(ModalBody, this.el);
  }
}

AutoRenewalPortal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default AutoRenewalPortal;
