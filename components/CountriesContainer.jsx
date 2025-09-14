import { useEffect, useState } from 'react'
import CountryCard from './CountryCard.jsx'
import CountryCardShimmer from './CountryCardShimmer.jsx'

const CountriesContainer = ({query , region}) => {
    const [data , setData] = useState([])

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital')
            .then(res => res.json())
            .then((countryData) => {
                console.log(countryData[0].region)
                setData(countryData)
        })
    }, [])

    if(!data.length){
       return <CountryCardShimmer />
    }

    const filtered = data.filter((country) => {
    const matchesQuery = country.name.common.toLowerCase().includes(query.toLowerCase());
    const matchesRegion = region ? country.region === region : true;
    return matchesQuery && matchesRegion;
    })


return (
    <div className="countries-container">
      {filtered.map((country) => (
        <CountryCard
          key={country.name.common}
          name={country.name.common}
          flag={country.flags.svg}
          population={Intl.NumberFormat('en-US').format(country.population)}
          region={country.region}
          capital={country.capital}
        />
      ))}
    </div>
  )
}

export default CountriesContainer