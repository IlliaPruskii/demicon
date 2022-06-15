import axios from "axios";
import {cache} from "..";

const URL = "https://randomuser.me/api";

type UserData = {
  gender: string
  name: {
    title: string
    first: string
    last: string
  }
  location: {
    country: string
  }
  email: string
}

type UsersResponse = {
  results: Array<UserData>
}

type User = {
  gender: string
  name: string
  country: string
  email: string
}

export type Users = Array<User>

const generateUsers = (data: UsersResponse) => {
  const users = data.results.map((user) => {
    const {
      gender,
      name: {title, first, last},
      location: {country},
      email,
    } = user;
    return {
      gender,
      name: `${title} ${first} ${last}`,
      country,
      email,
    };
  });

  return users;
};

export const getUsers = async () => {
  try {
    const {data} = await axios.get(URL);
    const users = generateUsers(data);
    return users;
  } catch (e) {
    console.log(e);
  }
};

export const setNewUsers = async () => {
  const users = await getUsers();
  if (users) {
    cache.set("users", users);
  }
};

const getCountries = (data: Users) => {
  const countries = data.reduce((value: Array<string>, user) => {
    const {country} = user;
    if (value.includes(country)) {
      return value;
    }
    return [...value, country];
  }, []);

  return countries;
};

export const generateUsersForResponse = (data: Users) => {
  const countryNames = getCountries(data);
  const usersForResponse = countryNames.map((country) => ({
    name: country,
    users: data.filter((user) => user.country === country),
  }));
  return usersForResponse;
};
