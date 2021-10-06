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

    return { status: "success", data: response.data };
  } catch (err) {
    return { status: "technicalFailure", data: err.message };
  }
};
