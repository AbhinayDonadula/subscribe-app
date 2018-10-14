import React from "react";
import ReactDOM from "react-dom";
// import PropTypes from "prop-types";
import Img from "./Img";

const appRoot = document.getElementById("root");
let modalPortalRoot = document.getElementById("spinner-modal");
if (!modalPortalRoot) {
  modalPortalRoot = document.createElement("div");
  modalPortalRoot.setAttribute("id", "spinner-modal");
  appRoot.insertAdjacentElement("afterend", modalPortalRoot);
}

class SpinnerPortal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    modalPortalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalPortalRoot.removeChild(this.el);
  }

  render() {
    const ModalBody = (
      <div className="app__loader">
        <Img
          spinner
          appLoader
          src="https://wwwsqm.officedepot.com/images/od/v2/loading.gif"
        />
        <div className="modal-backdrop" />
      </div>
    );
    return ReactDOM.createPortal(ModalBody, this.el);
  }
}

SpinnerPortal.propTypes = {
  //   showSpinner: PropTypes.bool
};

SpinnerPortal.defaultProps = {
  //   showSpinner: false
};

export default SpinnerPortal;
