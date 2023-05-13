const apiKey = "01acf9da4d8f4174b3f8fa69d210250b"
export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:5173/recommendation/";

const scopes = [
  "user-read-recently-played",
  "user-top-read",
  "user-read-private",
  "user-library-read"
];



export const loginUrl = `${authEndpoint}?client_id=${apiKey}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;