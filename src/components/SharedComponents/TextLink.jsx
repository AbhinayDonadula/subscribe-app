import React from 'react';
import PropTypes from 'prop-types';
// import AnimatedDownArrow from './AnimatedDownArrow';

class TextLink extends React.Component {
  state = { active: false };

  handleClick = (event) => {
    event.preventDefault();
    const { active } = this.state;
    const { handleClick: parentHandleClick } = this.props;
    this.setState({ active: !active }, () => {
      parentHandleClick();
    });
  };

  render() {
    const { label } = this.props;
    const { active } = this.state;

    return (
      <a
        href="/"
        className="view_txt opn_box"
        onClick={(event) => {
          this.handleClick(event);
        }}
      >
        <span className="view-txt">
          {label}
          <span
            className={`arrow ${active ? 'active' : ''}`}
            onClick={(event) => {
              this.handleClick(event);
            }}
          >
            <span />
            <span />
          </span>
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
