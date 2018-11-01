import React from 'react';
import PropTypes from 'prop-types';

class AnimatedArrow extends React.Component {
  handleClick = (event) => {
    event.preventDefault();
    const { handleClick: parentHandleClick } = this.props;
    parentHandleClick();
  };

  render() {
    const { label, color, clicked } = this.props;
    const activeArrow = clicked;

    return (
      <span className="view-txt">
        {label}
        <span
          className={`animated__arrow ${activeArrow ? 'active' : ''}`}
          onClick={(event) => {
            this.handleClick(event);
          }}
        >
          <span
            onClick={(event) => {
              this.handleClick(event);
            }}
            style={{ background: color || '#000' }}
          />
          <span
            onClick={(event) => {
              this.handleClick(event);
            }}
            style={{ background: color || '#000' }}
          />
        </span>
      </span>
    );
  }
}

AnimatedArrow.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  clicked: PropTypes.bool
};

AnimatedArrow.defaultProps = {
  label: '',
  color: '',
  clicked: false
};

export default AnimatedArrow;
