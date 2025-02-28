export const presets = ["babel-preset-expo"];
export const plugins = [
  ["module:react-native-dotenv"],
  ["@babel/plugin-transform-private-methods", { loose: true }],
];
