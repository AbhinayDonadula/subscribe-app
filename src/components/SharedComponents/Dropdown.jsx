import React from 'react';
import PropTypes from 'prop-types';

class Dropdown extends React.Component {
  state = {
    listOpen: false,
    selected: ''
  };

  componentDidMount() {
    const { selected } = this.props;
    this.setState({ selected });
  }

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
    const { frequencyDropDown, options } = this.props;
    const { listOpen, selected } = this.state;
    return (
      <div
        className={`custom-select ${frequencyDropDown ? 'freq__options' : ''}`}
        onClick={this.toggleList}
      >
        <div
          className={`select-selected ${
            !listOpen ? '' : 'select-arrow-active'
          }`}
        >
          {selected && selected.length ? selected : options[0].title}
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
  selected: ''
};

export default Dropdown;
