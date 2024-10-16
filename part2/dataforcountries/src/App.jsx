import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState({});
  const [query, setQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all").then((response) => setCountries(response.data));
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setQuery(value);
    const filtered = countries.filter((country) => country.name.common.toLowerCase().includes(value));
    setFilteredCountries(filtered);
  };

  return (
    <div>
      <h1>Country Information</h1>
      find countries <input type="text" value={query} onChange={handleSearch} />
      <CountryList countries={filteredCountries} />
    </div>
  );
};

const CountryList = ({ countries }) => {
  if (countries.length > 10) return <p>Too many matches, please specify further.</p>;
  if (countries.length === 1) {
    const country = countries[0];
    return (
      <div>
        <h2>{country.name.common}</h2>
        <div>{country.capital}</div>
        <div>{country.area}</div>
        <h5>Languanges : {}</h5>
        <ul>
          {Object.entries(country.languages).map(([key, value]) => (
            <li key={key}>{value}</li>
          ))}
        </ul>
        <img src={country.flags.svg} alt={`${country.name.common} flag`} width="150" />
      </div>
    );
  }
  return countries.map((country) => <div>{country.name.common}</div>);
};

export default App;
