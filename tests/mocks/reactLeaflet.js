// tests\mocks\reactLeaflet.js

const React = require('react');
const { View, Text } = require('react-native');
const MapContainer = (p) => React.createElement(View, p, p.children);
const TileLayer = () => React.createElement(View);
const Marker = (p) =>
  React.createElement(
    Text,
    { testID: 'LeafletMarker' },
    JSON.stringify(p.position),
  );
const Popup = (p) => React.createElement(Text, null, p.children);
module.exports = { __esModule: true, MapContainer, TileLayer, Marker, Popup };
