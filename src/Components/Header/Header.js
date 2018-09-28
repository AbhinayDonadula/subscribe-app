import React from "react";
import AppContext from "../Context/AppContext";

class Header extends React.Component {
  state = {};

  greetUser = () => {
    const today = new Date();
    const curHr = today.getHours();

    if (curHr < 12) {
      return "Good Morning";
    }
    if (curHr < 18) {
      return "Good Afternoon";
    }
    return "Good Evening";
  };

  render() {
    return (
      <AppContext.Consumer>
        {appData => (
          <section className="heading_sec">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12">
                  <p className="sub_txt">
                    {this.greetUser()} <b>{appData.userName}!</b>
                  </p>
                  <h3 className="sub_head">{appData.content.AppTitle}</h3>
                </div>
              </div>
            </div>
          </section>
        )}
      </AppContext.Consumer>
    );
  }
}

export default Header;
