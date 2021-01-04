
const axios = require("axios")
const pluralize = require("pluralize")
const createNodeHelper = require("gatsby-node-helpers").default

async function sourceNodes({actions}, configOptions) {
  const {apiURL, contentTypes} = configOptions
  const { createNode } = actions
  // POST - posts Product - products
  const types = contentTypes.map(type => type.toLowerCase()).map(type => pluralize(type))
  //types [ 'posts', 'products' ]
  let final = await getContents(types, apiURL)

  // console.log(final)
  for (let [key, value] of Object.entries(final)) {
    //构建数据节点对象 allPostsContent allProductsContent
    const {createNodeFactory} = createNodeHelper({
      typePrefix:key,
    })
    const createNodeObject = createNodeFactory("content")
    //根据数据节点对象创建节点
    value.forEach(item => {
      createNode(createNodeObject(item))
    })
  }

}

//从外部数据源获取数据
async function getContents (types, apiUrl) {
  const size = types.length;
  let index = 0
  // {posts:[], [products:[]]}
  const final = {}
  // 初始调用
  await loadContents()

  async function loadContents() {
    if (index === size) return
    let {data} = await axios.get(`${apiUrl}/${types[index]}`)
    final[types[index++]] = data
    await loadContents()
  }

  return final
}


module.exports = {
  sourceNodes
}