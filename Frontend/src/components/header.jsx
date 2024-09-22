import '../Header.css'

const Header = () => {
    return (
      <header>
        <nav>
          <ul className='headers'>
            <li className='list'><a href="/">Home</a></li>
            <li className='list'><a href="/about">About</a></li>
            <li className='list'><a href="/info">Info</a></li>
            <li className='list'><a href="/create">Create</a></li>
          </ul>
        </nav>
      </header>
    );
  };


  export default Header