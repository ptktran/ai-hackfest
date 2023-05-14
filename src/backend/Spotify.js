const apiKey = "01acf9da4d8f4174b3f8fa69d210250b"
export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:5173/recommendation/";

const scopes = [
  "user-read-recently-played",
  "user-top-read",
  "user-read-private",
  "user-library-read"
];

const sendData = (data) => {
  fetch('/process', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      console.log('Track data sent successfully');
    } else {
      console.log('Error sending track data: ', response.statusText);
    }
  })
  .catch(error => {
    console.error('Error sending track data: ', error);
  })
}

export const loginUrl = `${authEndpoint}?client_id=${apiKey}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;