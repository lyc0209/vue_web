const path = require("path")

module.exports = {
  outputDir: "./build",
  // publicPath: "./", // 本地使用
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       views: '@/views'
  //     }
  //   }
  // }
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     "@": path.resolve(__dirname, "src"),
  //     views: "@/views"
  //   }
  // },
  devServer: {
    port: 8082,
    proxy: {
      "^/api": {
        target: "http://172.27.48.1:8081",
        pathRewrite: {
          "^/api": ""
        },
        changeOrigin: true
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias.set("@", path.resolve(__dirname, "src")).set("views", "@/views")
  }
}
