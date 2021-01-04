const {parseString} = require("xml2js")
const {promisify} = require("util")
const parse = promisify(parseString)
const createNodeHelper = require("gatsby-node-helpers").default

async function onCreateNode ({ node, loadNodeContent, actions}) {
    const { createNode} = actions;
    if (node.internal.mediaType === "application/xml") {
        let content = await loadNodeContent(node)
        let obj =await parse(content, {explicitArray:false, explicitRoot:false})
        //构建数据节点对象 allPostsContent allProductsContent
        const {createNodeFactory} = createNodeHelper({
            typePrefix:"XML",
          })
          const createNodeObject = createNodeFactory("parsedContent")
          //根据数据节点对象创建节点
          createNode(createNodeObject(obj))
    }
}
module.exports = {
    onCreateNode
}