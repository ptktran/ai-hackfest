import github from '../assets/graphics/help-icon.svg'

function Navbar() {
  return(
    <div className="bg-dark-gray h-auto p-2 flex items-center justify-between absolute w-full">
      <a href="/">
        <h1 className="font-logo text-4xl mx-5">
          <span className="text-green">Melody</span><span className="text-white">Match</span>
        </h1>
      </a>
      <a href="https://github.com/ptktran/ai-hackfest" className='mx-5' target='blank'> 
        <img src={github}></img>
      </a>
    </div>
  )
}

export default Navbar