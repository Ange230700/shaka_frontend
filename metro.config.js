// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
};

config.transformer = {
  ...config.transformer,
};

config.resolver.sourceExts = [...config.resolver.sourceExts];

config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

config.resolver.alias = {
  shakafront: './src',
  shakafront1: './tests',
};

module.exports = config;
