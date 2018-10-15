import React from "react";
import PropTypes from "prop-types";

class Nugget extends React.Component {
  static propTypes = {
    heading: PropTypes.string,
    subHeading: PropTypes.string,
    viewLink: PropTypes.string
  };

  static defaultProps = {
    heading: "06",
    viewLink: "View all subscriptions",
    subHeading: "Active Subscriptions"
  };

  state = {};

  render() {
    const { heading, subHeading, viewLink } = this.props;
    return (
      <li className="list-inline-item">
        <div className="subscrip_box">
          <img src="img/img1.jpg" alt="" className="img-resp" />
          <h3>{heading}</h3>
          <p>{subHeading} </p>
        </div>
        <a href="/">
          {viewLink}
          <i className="fa fa-angle-right" aria-hidden="true" />
        </a>
      </li>
    );
  }
}

export default Nugget;
