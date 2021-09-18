module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: 'static',
  indexPath: 'index.html',
  productionSourceMap: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: []
    }
  }
}
