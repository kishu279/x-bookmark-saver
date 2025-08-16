"use server";

import { prismaClient } from "./prismaClient";

export interface UserType {
  email?: string;
  name?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
}

export async function createUser(user: UserType) {
  try {
    // connect to database
    await prismaClient.$connect();

    // check for the user exist or not
    const foundUser = await prismaClient.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (!foundUser) {
      // create
      const userCreated = await prismaClient.user.create({
        data: {
          email: user.email!,
          name: user.name!,
          accessToken: user.accessToken!,
          refreshToken: user.refreshToken!,
          expiresIn: user.expiresIn!,
        },
      });

      return userCreated;
    }

    return foundUser;
  } catch (err) {
    console.error("Error connecting to the database:", err);
  } finally {
    prismaClient.$disconnect();
  }
}

export async function updateUserCredentials(user: UserType) {
  // check for the user
  try {
    await prismaClient.$connect();

    const foundUser = await prismaClient.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (foundUser) {
      const userUpdated = await prismaClient.user.update({
        where: {
          email: user.email,
        },
        data: {
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          expiresIn: user.expiresIn,
        },
      });

      return userUpdated;
    }

    return null;
  } catch (err) {
    console.error("Error updating user:", err);
  } finally {
    prismaClient.$disconnect();
  }
}

export async function updateUserAccessToken(user: UserType) {
  try {
    await prismaClient.$connect();

    const foundUser = await prismaClient.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (foundUser) {
      const userUpdated = await prismaClient.user.update({
        where: {
          email: user.email,
        },
        data: {
          accessToken: user.accessToken,
        },
      });

      return userUpdated;
    }

    return null;
  } catch (err) {
    console.error("Error updating user:", err);
  } finally {
    prismaClient.$disconnect();
  }
}
