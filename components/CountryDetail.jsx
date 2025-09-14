import { useEffect } from "react";
import { useState } from "react";
import { Link , useParams } from "react-router-dom"
import CountryDetailShimmer from "./CountryDetailShimmer";
import { useContext } from "react"
import  { ThemeContext } from '../contexts/ThemeContext'

export default function CountryDetail() {
  const params = useParams()
  const countryName = params.country
  const [isDark] = useContext(ThemeContext)

  const [countryData , setCountryData] = useState(null)
  const [notFound , setNotFound] = useState(false)

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then(res => res.json())
    .then(([data]) => {
      setCountryData({
        name: data.name.common,
        nativeName: Object.values(data.name.nativeName ?? {})[0]?.common || data.name.common,
        population: Intl.NumberFormat('en-US').format(data.population),
        region: data.region,
        subRegion: data.subregion ?? "No subregion",
        capital:  data.capital?.join(', ') ?? "No capital",
        flag: data.flags.svg,
        topLevelDomain: data.tld.join(', '),
        currencies: Object.values(data.currencies ?? {}).map(currency => currency?.name).join(', ') || "No currency",
        languages: Object.values(data.languages ?? {}).join(', ') || "No languages",
        borders: []
      })

      if(!data.borders){
        data.borders=[]
      }

      Promise.all(data.borders.map((border) => {
        return (
          fetch(`https://restcountries.com/v3.1/alpha/${border}`)
              .then((res) => res.json())
              .then(([borderCountry]) => borderCountry.name.common )
        )
      })).then((borders) => {
        setCountryData((prevState) => ({...prevState , borders}))
      })

    }).catch(err => {
      setNotFound(true)
    })

  }, [countryName])

  if(notFound){
    return <div>Country Not Found</div>
  }


  return (
      <main className={isDark ? 'dark' : ''}>
        <div className="country-main"> 

            <span className="back-button" onClick={() => history.back()} >
              <i className="fa-solid fa-arrow-left-long" aria-hidden="true"></i>&nbsp;&nbsp;Back
            </span>

            {countryData === null ? (
          <CountryDetailShimmer />
        ) : (
            
            <div className="country-details-container">
              <div className="country-details">
                <div className="country-img">
        <img src={countryData.flag} alt="flag" />
        </div>

        <div className="details-text-container">
        <h1>{countryData.name}</h1>
        <div className="details-text">
        <p><b>Native Name: </b>{countryData.nativeName}</p>
        <p><b>Population: </b>{countryData.population}</p>
        <p><b>Region: </b>{countryData.region}</p>
        <p><b>Sub Region: </b>{countryData.subRegion}</p>
        <p><b>Capital: </b>{countryData.capital}</p>
        <p><b>Top Level Domain: </b>{countryData.topLevelDomain}</p>
        <p><b>Currencies: </b>{countryData.currencies}</p>
        <p><b>Languages: </b>{countryData.languages}</p>
        </div>
        {countryData.borders.length !== 0 &&
          <div className="border-countries">
          <b>Border Countries: </b>
          {
            countryData.borders.map((border) => {
              return (
                <Link key={border} to={`/${border}`}>
                {border}
              </Link>
                
              )
            })
          }

          
        </div>
        }
            

        </div>
        </div>
        </div>
    )}


        </div>
    </main>
  )
}


