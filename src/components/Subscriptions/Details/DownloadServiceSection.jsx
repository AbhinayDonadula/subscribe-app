import React from 'react';
import AppContext from '../../Context/AppContext';
import SubscriptionContext from '../../Context/SubscriptionContext';
import getEmailForDownloadAgent from '../../../apiCalls/getEmailForDownloadAgent';
import AnimatedArrow from '../../SharedComponents/AnimatedArrow';

class DownloadServiceSection extends React.Component {
  state = {
    showDownloadDetailsMobile: false,
    isMobile: window.innerWidth <= 750,
    downloadLink:
      'https://update.optimumdesk.com/user/download_agent?_c=23515&_s=884c3b4485160e19f93ffe73cf719fa6b081b7a7&_u='
  };

  componentDidMount() {
    this.getEmailAddressFromASI();
  }

  getEmailAddressFromASI = async () => {
    const asiResponse = await getEmailForDownloadAgent(
      this.localAPI,
      this.contractId
    );

    if (
      asiResponse.hasErrorResponse === undefined ||
      asiResponse.hasErrorResponse === 'true'
    ) {
      this.setState({ asiFailed: true });
    } else {
      this.setState({
        asiFailed: false,
        asiResponse: asiResponse.responseObject.jsonObjectResponse
      });
    }
  };

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
              this.contractId = subscription.contractId;
              this.localAPI = appData.localAPI;
              return (
                <div className="full__width-mob">
                  <div
                    className="head_txt sub_txt"
                    onClick={this.showDownloadDetailsSection}
                  >
                    <span className="section__title-mob">
                      Download Available
                    </span>
                    {isMobile ? (
                      <span>
                        <AnimatedArrow
                          clicked={showDownloadDetailsMobile}
                          handleClick={this.showDownloadDetailsSection}
                        />
                      </span>
                    ) : null}
                  </div>
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
                  <hr />
                </div>
              );
            }}
          </SubscriptionContext.Consumer>
        )}
      </AppContext.Consumer>
    );
  }
}

export default DownloadServiceSection;
