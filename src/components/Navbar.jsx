import github from '../assets/graphics/help-icon.svg'

function Navbar() {
  return(
    <div class="bg-dark-gray p-2 absolute w-screen flex items-center justify-between">
      <a href="/">
        <h1 class="font-logo text-4xl mx-5">
          <span class="text-green">Melody</span><span class="text-white">Match</span>
        </h1>
      </a>
      <a href="https://github.com/ptktran/ai-hackfest" className='mx-5' target='blank'> 
        <img src={github}></img>
      </a>
    </div>
  )
}

export default Navbar