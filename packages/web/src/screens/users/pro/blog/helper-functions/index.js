const addBlog = async (api, data) => {
  if (data.blogHeader.replace(/\s/g, '').length === 0) {
    return;
  }
  try {
    await api(data);
  } catch (e) {
    console.log(e);
  }
};

const updateBlog = async (data, api) => {
  if (data.blogHeader.replace(/\s/g, '').length === 0) {
    return;
  }
  try {
    await api(data);
  } catch (e) {
    console.log(e);
  }
};

export {
  addBlog,
  updateBlog,
};
