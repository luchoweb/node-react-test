const { REACT_APP_API_URL: API_URL } = process.env;

export const getAllBiz = async () => {
  const response = await fetch(`${API_URL}/biz`);
  return response.json();
}

export const getBizBy = async (bizId) => {
  const response = await fetch(`${API_URL}/biz/${bizId}`);
  return response.json();
}
