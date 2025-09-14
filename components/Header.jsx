import { Link } from "react-router-dom"
import { useContext } from "react"
import  { ThemeContext } from '../contexts/ThemeContext'

const Header = () => {
  const [isDark , setIsDark] = useContext(ThemeContext)

  return (
    <header className={isDark ? 'dark' : ''}>
        <div className="header-content">
            <h1 className="title"><Link to="/">🌏&nbsp;Where in the world?</Link></h1>
            <p className="mode-switch" onClick={() => {
              setIsDark(!isDark)
              localStorage.setItem('isDarkMode' , !isDark)
            }}>

              <i className={`fa-regular fa-${isDark ? 'sun' : 'moon'}`} aria-hidden="true"></i>   {`${isDark ? 'Light' : 'Dark'} mode`}
            </p>
        </div>
    </header>
  )
}

export default Header