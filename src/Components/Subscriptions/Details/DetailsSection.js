import React from "react";
import AppContext from "../../Context/AppContext";

class DetailsSection extends React.Component {
  render() {
    return (
      <AppContext.Consumer>
        {appData => (
          <ul className="list-inline list-unstyled list_price">
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
      </AppContext.Consumer>
    );
  }
}

export default DetailsSection;
