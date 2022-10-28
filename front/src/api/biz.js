const { REACT_APP_API_URL: API_URL } = process.env;

export const getAllBiz = async () => {
  const response = await fetch(`${API_URL}/biz`);
  return await response.json();
}

export const getBizById = async (bizId) => {
  const response = await fetch(`${API_URL}/biz/${bizId}`);
  const biz = await response.json();
  return biz.res;
}

export const saveBiz = async (bizData) => {
  const response = await fetch(`${API_URL}/biz`,{
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(bizData)
  });

  return await response.json();
}

export const updateBiz = async (bizId, bizData) => {
  const response = await fetch(`${API_URL}/biz/${bizId}`,{
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(bizData)
  });

  return await response.json();
}
