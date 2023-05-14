const apiKey = "01acf9da4d8f4174b3f8fa69d210250b"
export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:5173/";

const scopes = [
  "user-read-recently-played",
  "user-top-read",
  "user-read-private",
  "user-library-read"
];

export const getTokenFromUrl = () => {
  const token = window.location.hash
  .substring(1)
  .split('&')
  .reduce((initial, item) => {
      let parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
  }, {});
  localStorage.setItem('token', token);
}

export const loginUrl = `${authEndpoint}?client_id=${apiKey}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;