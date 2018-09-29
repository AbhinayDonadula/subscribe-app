import React from "react";
import AppContext from "../../Context/AppContext";

class DownloadServiceSection extends React.Component {
  render() {
    return (
      <AppContext.Consumer>
        {appData => (
          <React.Fragment>
            <h3 className="head_txt dnload_txt">
              {appData.content.DownloadSectionHeader}
              <img src="img/down.jpg" className="img-resp down_img1" alt="" />
            </h3>
            <div className="dnload_div">
              <p className="dn_txt">
                Please download the following agent: Unlimited On Demand
                Technical Support Tune Ups.
              </p>
              <button type="button" className="btn btn_dnload">
                <img src="img/download.jpg" alt="" />
                {appData.content.DownloadServiceButton}
              </button>
            </div>
          </React.Fragment>
        )}
      </AppContext.Consumer>
    );
  }
}

export default DownloadServiceSection;
