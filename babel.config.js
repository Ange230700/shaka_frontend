// babel.config.js
export default function (api) {
  const isJest = api.caller(c => typeof c?.name === 'string' && c.name.includes('babel-jest'));
  api.cache.using(() => (isJest ? 'jest' : 'app'));

  const common = {
    presets: ['babel-preset-expo', 'nativewind/babel'],
    plugins: [
      ['module-resolver', { alias: { shakafront: './src', shakafront1: './tests' } }],
      'react-native-reanimated/plugin',
    ],
  };

  if (isJest) return { presets: ['babel-preset-expo'], plugins: [['module-resolver', { alias: { shakafront: './src', shakafront1: './tests' } }]] };

  return common;
}
