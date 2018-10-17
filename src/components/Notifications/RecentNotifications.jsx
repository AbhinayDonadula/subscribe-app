import React from "react";
import AppContext from "../Context/AppContext";
import NotificationBar from "./NotificationBar";

class RecentNotifications extends React.Component {
  state = {};

  render() {
    return (
      <AppContext.Consumer>
        {appData => (
          <div className="row">
            <div className="col-sm-12">
              {/* header */}
              <h3 className="notif_head">
                {appData.content.RecentNotificationsHeader}
                <a className="view_txt" href="/">
                  {appData.content.ViewAllSubscriptions}
                  <i className="fa fa-angle-right" aria-hidden="true" />
                </a>
                <NotificationBar />
              </h3>
            </div>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default RecentNotifications;
