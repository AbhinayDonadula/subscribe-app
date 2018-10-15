import React from "react";
import PropTypes from "prop-types";

class TextLink extends React.Component {
  state = {};

  render() {
    const { label, handleClick } = this.props;
    return (
      <a
        className="view_txt opn_box"
        onKeyPress={handleClick}
        tabIndex={0}
        role="button"
      >
        <span className="view-txt">
          {label}
          <i className="fa fa-angle-down" />
        </span>
      </a>
    );
  }
}

TextLink.propTypes = {
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default TextLink;
