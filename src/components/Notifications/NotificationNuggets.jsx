import React from 'react';
import Nugget from './Nugget';
import AppContext from '../Context/AppContext';

class NotificationNugget extends React.Component {
  state = {};

  render() {
    return (
      <AppContext.Consumer>
        {appData => (
          <div className="row">
            <div className="col-sm-12">
              <ul className="list-inline list-unstyled list_sub">
                {Array.from({ length: 4 }).map(() => (
                  <Nugget
                    key={Math.random()}
                    viewLink={appData.content.ViewAllSubscriptions}
                  />
                ))}
              </ul>
            </div>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default NotificationNugget;
