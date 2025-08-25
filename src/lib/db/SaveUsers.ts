"use server";

import { prismaClient } from "./prismaClient";

export interface UserType {
  name?: string;
  email?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
}

// create user and update user while signing in
export async function createUser(user: UserType) {
  try {
    // check for the user exist or not
    // if not then save the user on the database
    // extraaa
    // alongside also changes the accesstoken and secret if there is changes
    const foundUser = await prismaClient.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (!foundUser) {
      // fields are present or not
      // if (
      //   !user.email ||
      //   !user.name ||
      //   !user.accessToken ||
      //   !user.refreshToken ||
      //   user.expiresIn === undefined
      // ) {
      //   throw new Error("Missing required user properties for creation.");
      // }

      // create
      const userCreated = await prismaClient.user.create({
        data: {
          email: user.email!,
          name: user.name!,
          // accessToken: user.accessToken,
          // refreshToken: user.refreshToken,
          // expiresIn: user.expiresIn,
        },
      });

      console.log("User created:", { userCreated });

      return userCreated;
    }

    return foundUser;
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
}

export async function updateUserCredentials(user: UserType) {
  try {
    return null;
  } catch (err) {
    console.error("Error updating user:", err);
  }
}

export async function updateUserAccessToken(user: UserType) {
  try {
  } catch (err) {
    console.error("Error updating user:", err);
  }
}
