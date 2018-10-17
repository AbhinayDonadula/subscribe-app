/* eslint-disable */
import React from "react";

class NotificationBar extends React.Component {
  state = {};

  render() {
    return (
      <div className="notif_box">
        <div className="row">
          <div className="col-sm-12">
            <div className="media">
              <div className="media_img">
                <img src="img/correct.jpg" alt="" className="img-resp" />
              </div>
              <div className="media-body">
                <ul className="list-inline list-unstyled mb-0">
                  <li className="list-inline-item">
                    JUN <br />
                    <label>04</label>
                  </li>
                  <li className="list-inline-item">
                    Thank you for your recent auto-payment of $19.99 for Monthly
                    S.T.E.A.M Subscription Kit{" "}
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="/"
                      className="view_txt d-none d-md-block d-lg-block"
                    >
                      View details{" "}
                      <i className="fa fa-angle-right" aria-hidden="true" />
                    </a>{" "}
                    <a
                      href="/"
                      className="view_txt d-block d-md-none d-lg-none"
                    >
                      <i className="fa fa-angle-right" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <a href="/" className="view_txt1 more_notif view_sub">
              <i className="fa fa-plus" aria-hidden="true" /> More Notifications
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NotificationBar;
