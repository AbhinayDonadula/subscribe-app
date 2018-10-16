import React from 'react';
import SubscriptionItemsContainer from './SubscriptionItemsContainer';
import AppContext from '../Context/AppContext';

class Subscriptions extends React.Component {
  state = {};

  render() {
    return (
      <AppContext.Consumer>
        {(appData) => (
          <section
            className="detail_sec"
            style={{
              padding: appData.enableNotifications ? '60px 0' : '30px 0'
            }}
          >
            <div className="container-fluid">
              <SubscriptionItemsContainer />
            </div>
          </section>
        )}
      </AppContext.Consumer>
    );
  }
}

export default Subscriptions;
