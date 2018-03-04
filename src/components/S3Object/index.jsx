import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class S3Object extends Component {
  static handleClick(e) {
    console.warn(e);
  }

  static handleKeyDown(e) {
    console.warn(e);
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  render() {
    const strClass = 's3objectnormal s3objects';
    return (
      <li
        key={this.props.params.sourceKey}
        className={strClass}
      >
        <button
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
        >
          {this.props.params.destinationKey}
        </button>
      </li>
    );
  }
}

S3Object.propTypes = {
  params: PropTypes.shape({
    sourceKey: PropTypes.string,
    destinationKey: PropTypes.string,
    created_at: PropTypes.string,
  }),
};

S3Object.defaultProps = {
  params: {},
};

export default S3Object;
