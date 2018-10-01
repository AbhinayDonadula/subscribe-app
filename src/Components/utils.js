export const setTokenCookie = (name, value) => {
  const date = new Date();
  date.setTime(date.getTime() + 540 * 1000);
  const expires = `; expires= ${date.toGMTString()}`;
  document.cookie = `${name} = ${value}${expires}; path=/`;
};

export const getTokenFromCookie = () =>
  document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
