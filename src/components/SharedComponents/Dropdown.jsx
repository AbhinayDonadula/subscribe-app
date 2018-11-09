import React from 'react';
import PropTypes from 'prop-types';

class Dropdown extends React.Component {
  state = {
    listOpen: false,
    selected: ''
  };

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentDidMount() {
    const { selected } = this.props;
    this.setState({ selected });
  }

  componentWillReceiveProps(nextProps) {
    const { selected } = this.props;
    if (JSON.stringify(selected) !== JSON.stringify(nextProps.selected)) {
      this.setState({ selected: nextProps.selected });
    }
  }

  componentWillUnmount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  handleClick = (e) => {
    if (this.node && this.node.contains(e.target)) {
      return;
    }
    if (this.node) {
      this.setState({ listOpen: false });
    }
  };

  handleSelected = (event) => {
    const { updateParentState } = this.props;
    this.setState({ selected: event.target.getAttribute('data-value') });
    updateParentState(event.target.getAttribute('data-value'));
  };

  toggleList = () => {
    this.setState((prevState) => ({
      listOpen: !prevState.listOpen
    }));
  };

  render() {
    const { frequencyDropDown, options, mobile } = this.props;
    const { listOpen, selected } = this.state;
    return (
      <div
        className={`custom-select ${frequencyDropDown ? 'freq__options' : ''} ${
          mobile ? 'mob__freq' : ''
        }`}
        onClick={this.toggleList}
        ref={(node) => {
          this.node = node;
        }}
      >
        <div
          className={`select-selected ${
            !listOpen ? '' : 'select-arrow-active'
          }`}
        >
          {selected && selected.length ? selected : options[0].value}
        </div>
        <div className={`select-items ${!listOpen ? 'select-hide' : ''}`}>
          {options.map((each) => (
            <div
              key={each.id}
              data-value={each.value}
              onKeyPress={this.handleSelected}
              onClick={this.handleSelected}
              role="button"
              tabIndex={0}
            >
              {each.title}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  frequencyDropDown: PropTypes.bool,
  mobile: PropTypes.bool,
  cancelDropDown: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ).isRequired,
  updateParentState: PropTypes.func.isRequired,
  selected: PropTypes.string
};

Dropdown.defaultProps = {
  frequencyDropDown: false,
  cancelDropDown: false,
  mobile: false,
  selected: ''
};

export default Dropdown;
