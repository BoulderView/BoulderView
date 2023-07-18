module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', '@babel/preset-env'],
    plugins: [
      'react-native-reanimated/plugin',
      require.resolve("expo-router/babel"),
      "module:react-native-dotenv"
    ]
  };
};
