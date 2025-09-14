import { useState } from "react"
import Search from "./Search"
import SelectMenu from "./SelectMenu"
import CountriesContainer from "./CountriesContainer"
import { useContext } from "react"
import  { ThemeContext } from '../contexts/ThemeContext'



export default function Home() {
    const [query , setQuery] = useState('')
    const [region, setRegion] = useState('');
    const [isDark] = useContext(ThemeContext)
  return (
    <main className={isDark ? 'dark' : ''}>
        <div className="search-filter-container">
          <Search setQuery={setQuery} />
          <SelectMenu setRegion={setRegion} />
        </div>
        <CountriesContainer query={query} region={region} />
      </main>
  )
}
