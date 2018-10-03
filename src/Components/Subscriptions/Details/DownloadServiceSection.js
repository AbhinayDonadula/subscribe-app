import React from "react";
import axios from "axios";
import AppContext from "../../Context/AppContext";
import SubscriptionContext from "../../Context/SubscriptionContext";

class DownloadServiceSection extends React.Component {
  state = {
    showDownloadDetailsMobile: false,
    isMobile: window.innerWidth <= 750,
    downloadLink:
      "https://update.optimumdesk.com/user/download_agent?_c=23515&_s=884c3b4485160e19f93ffe73cf719fa6b081b7a7&_u="
  };

  componentDidMount() {
    const axiosInstance = axios.create({ baseURL: this.apiUrl });

    const token = "abhinay";
    // const token = getTokenFromCookie();
    if (token && !token.length > 0) {
      // const axiosJWTInstance = axios.create({
      //   baseURL: "/json/jwtSubscription.do"
      // });
      // axiosJWTInstance.defaults.headers.common.credentials = "same-origin";
      // try {
      //   const response = await axiosJWTInstance.get();
      //   console.log("success", response);
      // } catch (error) {
      //   console.error("error", error);
      // }
    }

    // axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    axiosInstance.defaults.headers.common.Authorization = this.bearerToken;
    axiosInstance
      .get()
      .then(resp => {
        if (resp.status === 200) {
          this.setState(({ downloadLink }) => ({
            downloadLink: downloadLink + resp.data.emailAddress
          }));
        }
        return new Error(resp);
      })
      .catch(err => {
        console.log(err);
      });
  }

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
              this.bearerToken = appData.content.apiUrls.token;
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
