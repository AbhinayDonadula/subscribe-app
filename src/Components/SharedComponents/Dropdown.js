import React from "react";
import PropTypes from "prop-types";

class Dropdown extends React.Component {
  state = {
    listOpen: false,
    selected: this.props.selected
  };

  handleSelected = event => {
    this.setState({ selected: event.target.getAttribute("data-value") }, () => {
      this.props.updateParentState(this.state.selected);
    });
  };

  toggleList = () => {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  };

  render() {
    const { frequencyDropDown } = this.props;
    const { listOpen } = this.state;
    return (
      <div
        className={`custom-select ${frequencyDropDown ? "custom-select1" : ""}`}
        onClick={this.toggleList}
        role="button"
        tabIndex={0}
      >
        <div
          className={`select-selected ${
            !listOpen ? "" : "select-arrow-active"
          }`}
        >
          {this.state.selected && this.state.selected.length
            ? this.state.selected
            : this.props.options[0].title}
        </div>
        <div className={`select-items ${!listOpen ? "select-hide" : ""}`}>
          {this.props.options.map(each => (
            <div
              key={each.id}
              data-value={each.value}
              onClick={this.handleSelected}
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
  updateParentState: PropTypes.func.isRequired
};

Dropdown.defaultProps = {
  frequencyDropDown: false
};

export default Dropdown;
