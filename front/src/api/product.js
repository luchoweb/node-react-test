const { REACT_APP_API_URL: API_URL } = process.env;

export const getAllProducts = async () => {
  const response = await fetch(`${API_URL}/product`);
  return await response.json();
}

export const getProductById = async (bizId) => {
  const response = await fetch(`${API_URL}/product/${bizId}`);
  const biz = await response.json();
  return biz.res;
}

export const getProductsByBiz = async (bizNit) => {
  const response = await fetch(`${API_URL}/product/biz/${bizNit}`);
  const biz = await response.json();
  return biz.res;
}

export const saveProduct = async (bizData) => {
  const response = await fetch(`${API_URL}/product`,{
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(bizData)
  });

  return await response.json();
}

export const updateProduct = async (bizId, bizData) => {
  const response = await fetch(`${API_URL}/product/${bizId}`,{
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(bizData)
  });

  return await response.json();
}

export const deleteProduct = async (bizId) => {
  const response = await fetch(`${API_URL}/product/${bizId}`, { method: 'DELETE' });
  const biz = await response.json();
  return biz;
}
