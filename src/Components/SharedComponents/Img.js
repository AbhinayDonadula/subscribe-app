import React from "react";
import PropTypes from "prop-types";

class Img extends React.Component {
  render() {
    return (
      <img
        alt=""
        src={this.props.src}
        className={`img-responsive center-block ${
          this.props.spinner ? "" : "services__img"
        }`}
      />
    );
  }
}

Img.propTypes = {
  src: PropTypes.string.isRequired,
  spinner: PropTypes.bool
};

Img.defaultProps = {
  spinner: false
};

export default Img;
