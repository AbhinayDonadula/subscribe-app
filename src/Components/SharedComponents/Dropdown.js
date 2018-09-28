import React from "react";

class Dropdown extends React.Component {
  state = {
    listOpen: false
  };

  handleSelected = () => {
    console.log("object");
  };

  toggleList = () => {
    console.log("object");
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  };

  render() {
    // const { options } = this.props;
    const { listOpen } = this.state;
    return (
      <div
        className="custom-select"
        onClick={this.toggleList}
        role="button"
        tabIndex={0}
      >
        <select className="form-control" id="sel2">
          <option value="s5">Show All subscriptions</option>
          <option value="s6">select1</option>
          <option value="s7">select2</option>
          <option value="s8">select3</option>
        </select>
        <div
          className={`select-selected ${
            !listOpen ? "" : "select-arrow-active"
          }`}
        >
          Show All subscriptions
        </div>
        <div className={`select-items ${!listOpen ? "select-hide" : ""}`}>
          <div>Show All subscriptions</div>
          <div>select1</div>
          <div>select2</div>
          <div>select3</div>
        </div>
      </div>
    );
  }
}

export default Dropdown;
