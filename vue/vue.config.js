function getProdExternals() {
  // for lib target
  // return {
  //   lodash: "lodash",
  //   moment: "moment",
  // };

  // for app target
  return {

  };
}

module.exports = {
  configureWebpack: (config)=>{
	  if(process.env.NODE_ENV === 'production'){
	    config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
	  }
	},
  pages: {
    index: {
      entry: 'src/pages/shouye/index/main.js',
      template: 'public/html/shouye/index.html',
      filename: 'index.html',
      title: 'Index Page',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  configureWebpack: {
    externals: getProdExternals(),
  }
}