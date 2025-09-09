// tests/mocks/reactNativeMaps.js

// Make MapView/Marker harmless in tests
/* eslint-disable react/no-children-prop */
const React = require('react');
const PropTypes = require('prop-types');
const { View, Text } = require('react-native');

function MapView({ children, ...rest }) {
  return React.createElement(View, rest, children);
}
MapView.propTypes = {
  children: PropTypes.node,
};

function Marker({ title = '', ...rest }) {
  return React.createElement(Text, { testID: 'Marker', ...rest }, title);
}
Marker.propTypes = {
  title: PropTypes.string,
};

module.exports = { __esModule: true, default: MapView, Marker };
