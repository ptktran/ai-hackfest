import Navbar from './Navbar'
import { useState, useEffect } from 'react'
import debounce from 'lodash.debounce'
import { useNavigate } from "react-router-dom"
import { sendData } from '../backend/Spotify'

function Recommendation() {
  const [selected, setSelected] = useState(false)

  const [accessToken, setAccessToken] = useState('')
  useEffect(() => {
    if (sessionStorage.getItem('accessToken')) {
      setAccessToken(sessionStorage.getItem('accessToken'))
    }
    const getTokenFromUrl = () => {
      const token = window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
          let parts = item.split('=')
          initial[parts[0]] = decodeURIComponent(parts[1])
          return initial
        }, {})
      return token.access_token
    }
    const token = getTokenFromUrl()
    if (token) {
      setAccessToken(token)
      sessionStorage.setItem('accessToken', token)
      window.history.replaceState({}, null, '/recommendation');
    }
  }, [])

  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem('accessToken')) {
      navigate("/");
    }
  }, [])
  
  const [searchQuery, setSearchQuery] = useState('') 
  const [searchResults, setSearchResults] = useState([]) 
  const debouncedSearch = debounce(async (query) => {
    if (query.trim() === '') {
      setSearchResults([]) 
      return 
    }

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=4`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const data = await response.json()
    if (data.tracks.items) {
      setSearchResults(data.tracks.items)
    } else {
      setSearchResults([])
    }
  }, 800)

  useEffect(() => {
    debouncedSearch(searchQuery)
  }, [searchQuery])

  const handleClearClick = () => {
    setSearchQuery('')
  }

  const [audioData, setAudioData] = useState([]);
  const MAX_SONGS_SELECTED = 3;

  const getAudioData = async (trackID, trackName, trackArtist, trackDate) => {
    if (audioData.length < MAX_SONGS_SELECTED) {
      const response = await fetch(
        `https://api.spotify.com/v1/tracks/${trackID}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        }
      );
      const data = await response.json();
    
      const selectedTrack = {
        name: trackName,
        artist: trackArtist,
        releaseDate: trackDate,
        ...data
      };
    
      setAudioData(prevAudioData => [...prevAudioData, selectedTrack]);
      setSearchResults(prevSearchResults => prevSearchResults.filter(track => track.id !== trackID));
    }
    setSelected(true)
  };
    
  return (
    <div className="w-full h-screen bg-gray">
      <Navbar />
        <div className="text-center py-2 sm:w-full md:w-9/12 pt-24 m-auto">
          {audioData.length < MAX_SONGS_SELECTED ? 
            (
              <>
                <h1 className="font-sans text-white sm:text-md md:text-xl font-light my-2">Search for your favourite song to get started 🎵</h1>
                <h1 className="font-sans text-white sm:text-sm md:text-lg font-light my-2">Select a maximum of {MAX_SONGS_SELECTED} songs</h1>
              </>
            )
          : (<h1 className="font-sans text-white sm:text-md md:text-xl font-light my-2">Maximum number of songs reached! Continue to activate the AI 🤖</h1>)}
          <input 
            placeholder="Search" value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="my-2 rounded-xl py-3 px-4 focus:outline-none font-light text-md lg:w-7/12 md:9/12 sm:w-11/12 hover:bg-light-gray ease duration-100"/>
            {searchQuery ? 
              (<button onClick={handleClearClick} className="text-white bg-red-500 hover:bg-red500/80 rounded-lg text-md px-3 py-2 ml-2 ease duration-100">Clear</button>
              ) : <></>
            }            
          <div className="md:w-7/12 sm:w-11/12 m-auto flex flex-wrap justify-center">
            {searchResults.length > 0 ? (
              searchResults.map((track) => (
                <div key={track.id} className="bg-dark-gray flex items-center w-full h-fit text-white justify-between rounded-lg p-3 my-2 select-none hover:bg-dark-gray/70 ease duration-100">
                  <div className="flex items-center">
                    <img src={track.album.images[2].url} className="w-13 rounded-sm mr-3"/>
                    <div className="text-left">
                      <h1 className="text-lg font-sans">{track.name}</h1>
                      <h1 className="text-md font-sans text-light-gray">{track.artists[0].name}</h1>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {audioData.length < MAX_SONGS_SELECTED ? (
                      <button onClick={() => getAudioData(track.id, track.name, track.artists[0].name, track.album.release_date.slice(0,4))} 
                            className="mr-1 text-white bg-green hover:bg-green/80 rounded-lg text-md px-3 py-2 m-auto ease duration-100">Select</button>
                      ) : null}
                    <a href={track.external_urls.spotify} target="blank"><button className="text-black bg-white hover:bg-white/80 rounded-lg text-md px-3 py-2 m-auto ease duration-100">Listen</button></a>
                  </div>
                </div>
              ))) : <></>}
            
            {selected ? 
              (<div className="text-center w-full m-auto">
                  <h1 className="font-sans text-white sm:text-md md:text-xl font-light my-2">Favourites 💓</h1>
                  {audioData.map((data, index) => (
                    <div key={index} className="bg-dark-gray flex items-center w-full h-fit text-white justify-between rounded-lg px-4 py-2 my-2 select-none hover:bg-dark-gray/70">
                      <div className="text-left">
                        <h1 className="text-lg font-sans">{data.name}</h1>
                        <h1 className="text-md font-sans text-light-gray">{data.artist}</h1>
                      </div>
                      <p>{data.releaseDate}</p>
                    </div>
                  ))}
                <button onClick={() => sendData(audioData)} className="mt-3 text-white bg-green hover:bg-green/90 rounded-lg text-md px-3 py-2 m-auto ease duration-100">Continue</button>
              </div> 
              ) : <></>}
          </div>
        </div>
    </div>
  )
}

export default Recommendation