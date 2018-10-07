import React from "react";
import AppContext from "../../Context/AppContext";
import SubscriptionContext from "../../Context/SubscriptionContext";
import { FireFetch } from "../../utils";

class DownloadServiceSection extends React.Component {
  state = {
    showDownloadDetailsMobile: false,
    isMobile: window.innerWidth <= 750,
    downloadLink:
      "https://update.optimumdesk.com/user/download_agent?_c=23515&_s=884c3b4485160e19f93ffe73cf719fa6b081b7a7&_u="
  };

  componentDidMount() {
    FireFetch(this.apiUrl, this.handleSuccess, this.handleFailure);
  }

  handleSuccess = response => {
    console.log("ASI call success for download section", response);
    this.setState(({ downloadLink }) => ({
      downloadLink: downloadLink + response.data.emailAddress
    }));
  };

  handleFailure = (error, isJWTFailed) => {
    if (error) {
      console.log("JWT failed in download section", error.status, isJWTFailed);
    }
    console.log(error);
  };

  showDownloadDetailsSection = () => {
    this.setState(({ showDownloadDetailsMobile }) => ({
      showDownloadDetailsMobile: !showDownloadDetailsMobile,
      isMobile: window.innerWidth <= 750
    }));
  };

  render() {
    return (
      <AppContext.Consumer>
        {appData => (
          <SubscriptionContext.Consumer>
            {subscription => {
              this.apiUrl = appData.content.apiUrls.getEmailForDownloadService.replace(
                "contractId",
                subscription.contractId
              );
              return (
                <React.Fragment>
                  <h3
                    className="head_txt dnload_txt"
                    role="presentation"
                    onClick={this.showDownloadDetailsSection}
                  >
                    {appData.content.DownloadSectionHeader}
                    <img
                      src="./img/down.jpg"
                      className="img-resp down_img1"
                      alt=""
                    />
                  </h3>
                  {(this.state.showDownloadDetailsMobile ||
                    !this.state.isMobile) && (
                    <div className="dnload_div show">
                      <p className="dn_txt">
                        Please download the following agent: Unlimited On Demand
                        Technical Support Tune Ups.
                      </p>
                      <a className="dnload__txt" href={this.state.downloadLink}>
                        <button type="button" className="btn btn_dnload">
                          <img
                            src="https://officedepot.scene7.com/is/image/officedepot/Download_icon_White?fmt=png-alpha"
                            alt=""
                          />
                          {appData.content.DownloadServiceButton}
                        </button>
                      </a>
                    </div>
                  )}
                  <hr />
                </React.Fragment>
              );
            }}
          </SubscriptionContext.Consumer>
        )}
      </AppContext.Consumer>
    );
  }
}

export default DownloadServiceSection;
