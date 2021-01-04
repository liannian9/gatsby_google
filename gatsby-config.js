/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    //将本地JSON文件数据添加至graphiQL数据层
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "json",
        path: `${__dirname}/json/`
      }
    },
    // 将原始JSON字符串转换为JS对象
    "gatsby-transformer-json",
  ],
}
