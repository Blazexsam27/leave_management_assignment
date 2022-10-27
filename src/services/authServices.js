const Cookies = require("js-cookie");

const setCookie = (data) => {
  const oneHr = new Date(new Date().getTime() + data.expires_in * 1000);
  Cookies.set("access_token", data.access_token, {
    expires: oneHr,
  });
  Cookies.set("username", data.user.user_metadata.name, {
    expires: oneHr,
  });
  Cookies.set("refresh_token", data.refresh_token);
};

const clearCookie = () => {
  Cookies.remove("access_token", { path: "" });
  Cookies.remove("refresh_token", { path: "" });
};

module.exports = { setCookie, clearCookie };
