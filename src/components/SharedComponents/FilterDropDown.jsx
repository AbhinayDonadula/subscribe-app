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
    updateParentState(selectedFilter, selectedSort);
  };

  handleFilterCheckBox = (event) => {
    const { filterOptions, sortOptions, selectedSort } = this.state;
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

      if (dataAttribute === 'Products' || dataAttribute === 'Services') {
        return { ...each, checked: false };
      }
      if (
        (dataAttribute === 'All Subscriptions' && each.title === 'Products') ||
        (dataAttribute === 'All Subscriptions' && each.title === 'Services')
      ) {
        return { ...each, checked: false };
      }

      if (dataAttribute === 'Active' && each.title === 'Cancelled') {
        return { ...each, checked: false };
      }
      if (dataAttribute === 'Cancelled' && each.title === 'Active') {
        return { ...each, checked: false };
      }

      if (dataAttribute === 'Cancelled' && each.title === 'All Subscriptions') {
        return { ...each, checked: false };
      }

      if (dataAttribute === 'Active' && each.title === 'All Subscriptions') {
        return { ...each, checked: false };
      }
      if (dataAttribute === 'All Subscriptions' && each.title === 'Active') {
        return { ...each, checked: false };
      }
      if (dataAttribute === 'All Subscriptions' && each.title === 'Cancelled') {
        return { ...each, checked: false };
      }
      return each;
    });

    let selectedFilter = '';
    updatedOptions.forEach((each) => {
      if (each.checked) {
        selectedFilter = !selectedFilter.length
          ? selectedFilter + each.title
          : `${selectedFilter}, ${each.title}`;
      }
    });

    const updatedSortOptions = sortOptions.map((each) => {
      if (
        ((dataAttribute === 'Services' ||
          selectedFilter.includes('Services')) &&
          (each.title === 'Delivery Date' ||
            each.title === 'Delivery Frequency')) ||
        ((dataAttribute === 'Products' ||
          selectedFilter.includes('Products')) &&
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
      selectedFilter
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
            event.target.checked === undefined
              ? !each.checked
              : event.target.checked
        };
      }
      return { ...each, checked: false };
    });
    let selectedSort = '';
    updatedSortOptions.forEach((each) => {
      if (each.checked) {
        selectedSort = each.title;
      }
    });
    this.setState({
      sortOptions: updatedSortOptions,
      selectedSort: selectedSort.length ? `, ${selectedSort}` : ''
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
              onClick={this.handleFilterCheckBox}
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
                onChange={this.handleFilterCheckBox}
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
              Apply
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
