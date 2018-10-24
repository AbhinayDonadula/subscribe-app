import React from 'react';
import AppContext from '../../Context/AppContext';
import SubscriptionContext from '../../Context/SubscriptionContext';
import { FireFetch } from '../../utils';

class DownloadServiceSection extends React.Component {
  state = {
    showDownloadDetailsMobile: false,
    isMobile: window.innerWidth <= 750,
    downloadLink:
      'https://update.optimumdesk.com/user/download_agent?_c=23515&_s=884c3b4485160e19f93ffe73cf719fa6b081b7a7&_u='
  };

  componentDidMount() {
    FireFetch(this.apiUrl, this.handleSuccess, this.handleFailure);
  }

  handleSuccess = (response) => {
    const emailAddress = response.data ? response.data.emailAddress : '';
    this.setState(({ downloadLink }) => ({
      downloadLink: downloadLink + emailAddress
    }));
  };

  handleFailure = () => {};

  showDownloadDetailsSection = () => {
    this.setState(({ showDownloadDetailsMobile }) => ({
      showDownloadDetailsMobile: !showDownloadDetailsMobile,
      isMobile: window.innerWidth <= 750
    }));
  };

  render() {
    const { showDownloadDetailsMobile, isMobile, downloadLink } = this.state;
    return (
      <AppContext.Consumer>
        {(appData) => (
          <SubscriptionContext.Consumer>
            {(subscription) => {
              this.apiUrl = appData.content.apiUrls.getEmailForDownloadService.replace(
                'contractId',
                subscription.contractId
              );
              return (
                <React.Fragment>
                  <h3
                    className="head_txt dnload_txt"
                    onClick={this.showDownloadDetailsSection}
                  >
                    {appData.content.DownloadSectionHeader}
                    <img
                      src="./img/down.jpg"
                      className="img-resp down_img1"
                      alt=""
                    />
                  </h3>
                  {(showDownloadDetailsMobile || !isMobile) && (
                    <div className="dnload_div show">
                      <p className="dn_txt">
                        Please download the following agent:{' '}
                        {`"${subscription.itemDescription}"`}
                      </p>
                      <a className="dnload__txt" href={downloadLink}>
                        <button type="button" className="btn_dnload">
                          <img
                            src="https://officedepot.scene7.com/is/image/officedepot/Download_icon_White?fmt=png-alpha"
                            alt=""
                          />
                          {appData.content.DownloadServiceButton}
                        </button>
                      </a>
                    </div>
                  )}
                  <hr className="download__end" />
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
