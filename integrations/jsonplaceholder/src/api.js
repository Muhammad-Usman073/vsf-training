module.exports.getAllItems = async (context) => {
  const { client } = context;
  let url = 'https://6411a090b80d57320a118aaa.mockapi.io/api/v1/youMayAlsoLike/products';

  try {
    const response = await client.get(url);
    return Array.isArray(response.data) ? response.data : [response.data]
  } catch (err) {
    console.error("[newIntegration] searchTodos failed.", err)
  }
}
