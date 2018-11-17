import React from 'react';
import PropTypes from 'prop-types';

const filters = [
  {
    id: 1,
    title: 'All Subscriptions',
    value: 'All Subscriptions',
    checked: true
  },
  {
    id: 2,
    title: 'Products',
    value: 'Products',
    checked: false
  },
  {
    id: 3,
    title: 'Services',
    value: 'Services',
    checked: false
  },
  {
    id: 4,
    title: 'Active',
    value: 'Active',
    checked: false
  },
  {
    id: 5,
    title: 'Cancelled',
    value: 'Cancelled',
    checked: false
  }
];
const sorts = [
  {
    id: 1,
    title: 'Purchase Date',
    value: 'Purchase Date',
    checked: false,
    disabled: false
  },
  {
    id: 2,
    title: 'Delivery Date',
    value: 'Delivery Date',
    checked: false,
    disabled: false
  },
  {
    id: 3,
    title: 'Delivery Frequency',
    value: 'Delivery Frequency',
    checked: false,
    disabled: false
  },
  {
    id: 4,
    title: 'Billing Frequency',
    value: 'Billing Frequency',
    checked: false,
    disabled: false
  }
];

class FilterDropDown extends React.Component {
  state = {
    listOpen: false,
    selected: '',
    selectedFilter: 'All Subscriptions',
    selectedSort: '',
    filterOptions: filters,
    sortOptions: sorts
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
    const { selected, listOpen } = this.state;
    const open = event.target.getAttribute('data-value') !== null || !listOpen;
    this.setState({
      selected: event.target.getAttribute('data-value')
        ? event.target.getAttribute('data-value')
        : selected,
      listOpen: open
    });
  };

  handleSave = (event) => {
    event.preventDefault();
    const { updateParentState } = this.props;
    const { selectedFilter, selectedSort } = this.state;
    updateParentState(`${selectedFilter}${selectedSort}`);
  };

  handleCheckBox = (event) => {
    const { filterOptions, sortOptions } = this.state;
    const dataAttribute = event.target.getAttribute('data-value');

    const updatedOptions = filterOptions.map((each) => {
      if (each.title === dataAttribute) {
        return {
          ...each,
          checked:
            event.target.checked === undefined || each.checked === true
              ? true
              : event.target.checked
        };
      }
      return { ...each, checked: false };
    });

    const updatedSortOptions = sortOptions.map((each) => {
      const { selectedSort } = this.state;
      if (
        (dataAttribute === 'Services' &&
          (each.title === 'Delivery Date' ||
            each.title === 'Delivery Frequency')) ||
        (dataAttribute === 'Products' &&
          (each.title === 'Purchase Date' ||
            each.title === 'Billing Frequency'))
      ) {
        if (
          (dataAttribute === 'Services' &&
            (selectedSort === ', Delivery Date' ||
              selectedSort === ', Delivery Frequency')) ||
          (dataAttribute === 'Products' &&
            (selectedSort === ', Purchase Date' ||
              selectedSort === ', Billing Frequency'))
        ) {
          this.setState({ selectedSort: '' });
        }
        return {
          ...each,
          disabled: true,
          checked: false
        };
      }
      return { ...each, disabled: false };
    });

    this.setState({
      filterOptions: updatedOptions,
      sortOptions: updatedSortOptions,
      selectedFilter: dataAttribute
    });
  };

  handleSortCheckBox = (event) => {
    const { sortOptions } = this.state;
    const dataAttribute = event.target.getAttribute('data-value');
    const updatedSortOptions = sortOptions.map((each) => {
      if (each.title === dataAttribute) {
        return {
          ...each,
          checked:
            event.target.checked === undefined || each.checked === true
              ? true
              : event.target.checked
          // event.target.checked === undefined ? true : event.target.checked
        };
      }
      return { ...each, checked: false };
    });
    this.setState({
      sortOptions: updatedSortOptions,
      selectedSort: `, ${dataAttribute}`
    });
  };

  render() {
    const { frequencyDropDown, mobile } = this.props;
    const {
      listOpen,
      selected,
      filterOptions,
      sortOptions,
      selectedFilter,
      selectedSort
    } = this.state;
    return (
      <div
        className={`custom-select ${frequencyDropDown ? 'freq__options' : ''} ${
          mobile ? 'mob__freq' : ''
        }`}
        onClick={this.handleSelected}
        ref={(node) => {
          this.node = node;
        }}
      >
        <div
          className={`select-selected ${
            !listOpen ? '' : 'select-arrow-active'
          }`}
        >
          {/* {selected && selected.length&& ? selected : filterOptions[0].value} */}
          {selectedFilter.length > 0 || selectedSort.length > 0
            ? `${selectedFilter}${selectedSort}`
            : selected}
        </div>
        <div className={`select-items ${!listOpen ? 'select-hide' : ''}`}>
          <div className="filter__sort-heading">Filter:</div>
          {filterOptions.map((each) => (
            <div
              key={each.id}
              data-value={each.value}
              role="button"
              tabIndex={0}
              onClick={this.handleCheckBox}
              className={
                each.checked
                  ? 'filter__sort-option checked__filter'
                  : 'filter__sort-option'
              }
            >
              <input
                type="checkbox"
                data-value={each.value}
                checked={each.checked}
                onChange={this.handleCheckBox}
                className="filter__sort-checkbox"
              />
              {each.title}
            </div>
          ))}
          <div className="filter__sort-heading">Sort:</div>
          {sortOptions.map((each) => (
            <div
              key={each.id}
              data-value={each.value}
              role="button"
              tabIndex={0}
              onClick={(event) => {
                if (!each.disabled) this.handleSortCheckBox(event);
              }}
              className={`${
                each.checked
                  ? 'filter__sort-option checked__filter'
                  : 'filter__sort-option'
              } ${each.disabled ? 'disable' : ''}`}
            >
              <input
                type="checkbox"
                data-value={each.value}
                checked={each.checked}
                onChange={(event) => {
                  if (!each.disabled) this.handleSortCheckBox(event);
                }}
                className={`${
                  each.disabled ? 'disabled' : ''
                } filter__sort-checkbox`}
              />
              {each.title}
            </div>
          ))}
          <div className="save__filter-sort">
            <button type="button" onClick={this.handleSave}>
              Save/Update
            </button>
          </div>
        </div>
      </div>
    );
  }
}

FilterDropDown.propTypes = {
  frequencyDropDown: PropTypes.bool,
  mobile: PropTypes.bool,
  updateParentState: PropTypes.func.isRequired,
  selected: PropTypes.string
};

FilterDropDown.defaultProps = {
  frequencyDropDown: false,
  mobile: false,
  selected: ''
};

export default FilterDropDown;
