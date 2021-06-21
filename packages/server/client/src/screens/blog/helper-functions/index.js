const addBlog = async (api, data) => {
  if (data.title.replace(/\s/g, '').length === 0) return;
  try {
    const res = await api(data);
    return res;
  } catch (e) {
    console.log(e);
  }
};

const updateBlog = async (api, data) => {
  if (data[0].title.replace(/\s/g, '').length === 0) return;
  try {
    await api(data);
  } catch (e) {
    console.log(e);
  }
};

export { addBlog, updateBlog };
