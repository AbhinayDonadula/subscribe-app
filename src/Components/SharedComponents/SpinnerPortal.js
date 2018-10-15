import React from "react";
import ReactDOM from "react-dom";
import Img from "./Img";

// get React app root elements
const appRoot = document.getElementById("root");
const odRoot = document.getElementById("SubscriptionsReact");

// get spinner div
let modalPortalRoot = document.getElementById("spinner-modal");

if (!modalPortalRoot && appRoot) {
  modalPortalRoot = document.createElement("div");
  modalPortalRoot.setAttribute("id", "spinner-modal");
  appRoot.insertAdjacentElement("afterend", modalPortalRoot);
}
if (!modalPortalRoot && odRoot) {
  modalPortalRoot = document.createElement("div");
  modalPortalRoot.setAttribute("id", "spinner-modal");
  odRoot.insertAdjacentElement("afterend", modalPortalRoot);
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

export default SpinnerPortal;
