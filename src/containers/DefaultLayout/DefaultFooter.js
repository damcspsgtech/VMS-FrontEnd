import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span className="text-sm-justify float-sm-right float-md-left"><a href="https://www.psgtech.edu">PSG College of Technology</a> &copy; 2020, Coimbatore.</span>
        <span className="text-xs-left float-xs-left float-md-right text-sm-right ml-md-auto">Created by DAMCS </span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
