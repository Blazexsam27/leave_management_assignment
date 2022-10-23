const saveTokens = (data) => {
  localStorage.setItem("access-token", data.access_token);
  localStorage.setItem("refresh-token", data.refresh_token);
  localStorage.setItem("expires_in", data.expires_in);
  localStorage.setItem("username", data.user.user_metadata.name);
};

module.exports = { saveTokens };
