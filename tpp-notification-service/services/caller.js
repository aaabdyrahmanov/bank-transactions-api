const axios = require("axios");

module.exports = async (data) => {
  const { url, method, uri, body = {}, timeout = 10000 } = data;
  const path = `${url}${uri}`;

  try {
    const response = await axios({
      url: path,
      method,
      data: body,
      timeout,
      validateStatus: () => true,
    });

    return { success: true, data: response.data };
  } catch (err) {
    return { success: false, data: err.message };
  }
};
