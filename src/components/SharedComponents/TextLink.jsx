import React from 'react';
import PropTypes from 'prop-types';

class TextLink extends React.Component {
  state = { active: false };

  componentWillReceiveProps(nextProps) {
    const { active } = this.props;
    if (JSON.stringify(active) !== JSON.stringify(nextProps.active)) {
      this.setState({ active: nextProps.active });
    }
  }

  handleClick = (event) => {
    event.preventDefault();
    const { active } = this.state;
    const { handleClick: parentHandleClick } = this.props;
    this.setState({ active: !active }, () => {
      const { active: a } = this.state;
      parentHandleClick(a);
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
            className={`animated__arrow ${active ? 'active' : ''}`}
            onClick={(event) => {
              this.handleClick(event);
            }}
          />
        </span>
      </a>
    );
  }
}

TextLink.propTypes = {
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired
};

export default TextLink;
