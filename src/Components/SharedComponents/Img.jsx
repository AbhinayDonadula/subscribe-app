import React from 'react';
import PropTypes from 'prop-types';

class Img extends React.Component {
  state = {};

  render() {
    const { src, spinner, appLoader } = this.props;
    return (
      <img
        alt=""
        src={src}
        className={`img-responsive center-block ${
          spinner ? '' : 'services__img'
        } ${appLoader ? 'app__loader-img' : ''}`}
      />
    );
  }
}

Img.propTypes = {
  src: PropTypes.string.isRequired,
  spinner: PropTypes.bool,
  appLoader: PropTypes.bool
};

Img.defaultProps = {
  spinner: false,
  appLoader: false
};

export default Img;
