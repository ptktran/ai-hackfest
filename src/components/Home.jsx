import React from 'react'
import Navbar from "./Navbar"
import { Link } from 'react-router-dom'
import { loginUrl } from '../backend/Spotify'

export default function Home() {

  return (
    <div className="h-screen">
      <Navbar />
      <div className="h-full w-full bg-home bg-cover flex">
        <div className="sm:w-screen md:w-9/12 min-h-auto m-auto text-center p-9">
          <div className="mb-5">
            <h1 className="font-sans text-white sm:text-3xl  md:text-6xl font-bold">The ultimate music recommendation tool!</h1>
            <h1 className="font-sans text-white sm:text-xl md:text-2xl font-light">Personalized music recommendations. Less time searching. More time listening.</h1>
          </div>
          <div className="my-5">
            
            <a href={loginUrl}>
              <button type="button" className="my-3 block text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-md px-7 py-2.5 m-auto ease duration-100">Pick your favourite songs</button>
            </a>
            
            <Link to="/survey">
              <button className="my-3 block text-black bg-white hover:bg-slate-200 rounded-lg text-md px-7 py-2.5 m-auto ease duration-100">  
                Do a quick survey
              </button>
            </Link>
            

          </div>
        </div>          
      </div>
    </div>
  );
}

