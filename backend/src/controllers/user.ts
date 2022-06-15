import {Request, Response} from "express";
import {generateUsersForResponse, setNewUsers, Users} from "../utils/users";
import {cache} from "../";

export const getCountries = (_req: Request, res: Response) => {
  const users = cache.get<Users>("users");
  if (users) {
    const countries = generateUsersForResponse(users);
    return res.status(200).send({countries});
  }

  res.status(500).send("Something was wrong");
};

export const updateUsers = async (req: Request, res: Response) => {
  await setNewUsers();
  res.status(201).send("User array was successfully updated!");
};

