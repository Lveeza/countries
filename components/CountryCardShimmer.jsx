import './CountryShimmer.css'

export default function CountryCardShimmer() {

  return (
    <div className="countries-container">
        {
        Array.from({length : 21}).map((el, i) => {
          return(
            <div key={i} className="country-card shimmer-country-card">
              <div className="flag-container shimmer-flag-container">
                <div></div>
              </div>
              <div className="country-info shimmer-country-info">
                 <h3 className="shimmer-title"></h3>
                <p></p>
                <p></p>
                <p></p>
            </div>

            </div>
          )
        })
    }
    </div>

  )
}
