import { Link } from 'react-router-dom'

const CountryCard = ({name ,flag ,population ,region ,capital}) => {

  return (
    <Link  to={`/${name}`} className="country-card">    
        <div className="flag-container">      
          <img src={flag} alt={flag + name} />
        </div> 
            <div className="country-info">
                 <h3 className="country-name">{name}</h3>
                <p><b>Population: </b>{population}</p>
                <p><b>Region: </b>{region}</p>
                <p><b>Capital: </b>{capital}</p>
            </div>
    </Link>
  )
}

export default CountryCard
