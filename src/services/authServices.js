const Cookies = require("js-cookie");

const setCookie = (data) => {
  const date = new Date();
  Cookies.set("access_token", data.access_token, {
    expires: date.getTime() + data.expires_in * 1000,
  });
  Cookies.set("username", data.user.user_metadata.name, {
    expires: date.getTime() + data.expires_in * 1000,
  });
  Cookies.set("refresh_token", data.refresh_token);
};

const clearCookie = () => {
  Cookies.remove("access_token", { path: "" });
  Cookies.remove("refresh_token", { path: "" });
};

module.exports = { setCookie, clearCookie };
