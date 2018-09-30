import React from "react";
import AppContext from "../../Context/AppContext";

class DetailsSection extends React.Component {
  state = {
    showSubDetailsMobile: false
  };

  showSubDetailsSection = () => {
    this.setState(({ showSubDetailsMobile }) => ({
      showSubDetailsMobile: !showSubDetailsMobile
    }));
  };

  render() {
    return (
      <AppContext.Consumer>
        {appData => (
          <React.Fragment>
            <h3
              className="head_txt sub_txt"
              onClick={this.showSubDetailsSection}
              role="presentation"
            >
              {appData.content.SubscriptionDetails}
              <img src="img/down.jpg" className="img-resp down_img1" alt="" />
            </h3>
            <hr className="d-block d-md-none d-lg-none" />
            {this.state.showSubDetailsMobile && (
              <ul className="list-inline list-unstyled list_price show">
                <li className="list-inline-item">
                  <div className="total_box">
                    <h3>{appData.content.TotalPrice}</h3>
                    <p>$23.00</p>
                  </div>
                </li>
                <li className="list-inline-item">
                  <div className="total_box">
                    <h3>{appData.content.SubscriptionStart}:</h3>
                    <p>Jun 4, 201</p>
                  </div>
                </li>
                <li className="list-inline-item">
                  <div className="total_box">
                    <h3>{appData.content.SubscriptionEnd}:</h3>
                    <p>Jun 3, 2019</p>
                  </div>
                </li>
                <li className="list-inline-item">
                  <div className="total_box">
                    <h3>{appData.content.FeeToCancel}</h3>
                    <p>$103.50</p>
                  </div>
                </li>
                <li className="list-inline-item">
                  <div className="total_box">
                    <h3>{appData.content.OrderNumber}</h3>
                    <p>402988264-001</p>
                  </div>
                </li>
                <li className="list-inline-item">
                  <div className="total_box">
                    <h3>{appData.content.ItemNumber}</h3>
                    <p>9204711</p>
                  </div>
                </li>
                <li className="list-inline-item">
                  <div className="total_box">
                    <h3>{appData.content.ContractNumber}</h3>
                    <p>
                      <a href="/">12831-1</a>
                    </p>
                  </div>
                </li>
              </ul>
            )}
          </React.Fragment>
        )}
      </AppContext.Consumer>
    );
  }
}

export default DetailsSection;
