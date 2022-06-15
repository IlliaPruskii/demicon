import React, { useEffect, useMemo, useState } from "react"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"

const API = "http://localhost:8000/"

type User = {
  gender: string
  name: string
  country: string
  email: string
}

type Users = Array<User>

type Country = {
  name: string
  users: Users
}

type Countries = Array<Country>

const App = () => {
  const [countryNames, setCountryNames] = useState<Array<string>>([])
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [countries, setCountries] = useState<Countries>([])

  const getUsers = async () => {
    const res = await axios.get<{ countries: Countries }>(API)
    return res.data
  }
  
  const setNewtData = async () => {
    const data = await getUsers()
    const countriesArray = data.countries.map((country) => country.name)
    setSelectedCountry(countriesArray[0])
    setCountries(data.countries)
    setCountryNames(countriesArray)
  }

  const users = useMemo(() => {
    const currentCountry = countries.find((data) => data.name === selectedCountry)
    if (currentCountry) {
      return currentCountry.users
    }

    return []
  }, [countries, selectedCountry])

  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value)
  }

  const reloadHandler = async () => {
    await axios.post<{ countries: Countries }>(API)
    setNewtData()
  }

  useEffect(() => {
    setNewtData()
  }, [])

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between w-500 mb-4">
        <div>
          {selectedCountry && (
            <Form.Select value="3" onChange={changeHandler}>
              {countryNames.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
           </Form.Select>
          )}
        </div>
        <Button onClick={reloadHandler}>Reload</Button>
      </div>
      {users.map((user) => (
        <Card key={user.name} className="mb-3">
          <Card.Body>
              <div><span className="fw-bold">Name:</span> {user.name}</div>
              <div><span className="fw-bold">Gender:</span> {user.gender}</div>
              <div><span className="fw-bold">Email:</span> {user.email}</div>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default App;
