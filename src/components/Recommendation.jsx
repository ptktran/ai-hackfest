import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

function Recommendation() {
  const [accessToken, setAccessToken] = useState('');
  useEffect(() => {
    const getTokenFromUrl = () => {
      const token = window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
          let parts = item.split('=');
          initial[parts[0]] = decodeURIComponent(parts[1]);
          return initial;
        }, {});
      return token.access_token;
    }

    const token = getTokenFromUrl();
    if (token) {
      setAccessToken(token);
      localStorage.setItem('accessToken', token)
    }
  }, []);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const debouncedSearch = debounce(async (query) => {
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();

    setSearchResults(data.tracks.items);
  }, 500);

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery]);
    
  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div className="h-full w-auto bg-gray flex">
        <div className="h-min m-auto my-28 text-center py-2 sm:w-screen md:w-9/12">
          <h1 className="font-sans text-white sm:text-xl md:text-2xl font-light my-2">Search for your favourite song to get started</h1>
          <input 
            placeholder="Search" value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="my-2 rounded-xl py-3 px-5 focus:outline-none font-light text-lg md:w-8/12 sm:w-11/12 hover:bg-light-gray ease duration-100"/>
          <div className="md:w-8/12 sm:w-11/12 m-auto flex flex-wrap justify-center">
            {searchResults.map((track) => (
              <div key={track.id} className="bg-dark-gray h-3/12 w-80 m-2 rounded-lg text-white border border-red-100">
                {track.artists[0].name} - {track.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recommendation