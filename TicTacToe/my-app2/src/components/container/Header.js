import {Link} from 'react-router-dom'

// figured out to use an anchor tag instead as the link.

function Header () {
    return (
        <header className="link-colors" >
        <a href="http://localhost:3000/projects">Portfolio</a>
        <Link to="/AIGame">AIGame</Link>
        {/* <Link to="/contact">Contact</Link> */}
  
        </header>
    )
}

export default Header;