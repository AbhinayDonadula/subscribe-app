import React from 'react';

const styles = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  margin: 'auto',
  height: '100%',
  width: '100%',
  background: 'none repeat scroll 0 0 #fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  opacity: 0.65
};

class Loader extends React.Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <div className="lds-roller" style={{ ...styles }}>
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </React.Fragment>
    );
  }
}

export default Loader;
