const addBlog = async (api, data) => {
  if (data.title.replace(/\s/g, '').length === 0) {
    return;
  }
  try {
    await api(data);
  } catch (e) {
    console.log(e);
  }
};

const updateBlog = async (data, api) => {
  if (data.title.replace(/\s/g, '').length === 0) {
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
