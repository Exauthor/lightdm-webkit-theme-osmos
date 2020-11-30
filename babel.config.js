module.exports = {
  presets: [
    // '@vue/app'
    '@babel/preset-env',
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    'transform-vue-jsx',
    '@babel/plugin-proposal-optional-chaining'
  ]
}
