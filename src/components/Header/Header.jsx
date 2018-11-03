import React from 'react';
import AppContext from '../Context/AppContext';

class Header extends React.Component {
  state = {};

  render() {
    return (
      <AppContext.Consumer>
        {(appData) => (
          <section
            className="heading_sec"
            style={{
              marginBottom: appData.enableNotifications ? 90 : 0
            }}
          >
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12">
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
