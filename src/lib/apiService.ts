import axios from "axios";
import { UserData } from "../store/actions/user.types";
import UserRepo from './userRepo';

const infuraBaseUrl = "https://ipfs.infura.io:5001/api/v0";
const mockTimeout = 2000;
const mockUploadData = {
  Name: "D8B440EA-8A66-4E91-A638-FBBB40DB39BC.jpg",
  Hash: "QmQUsG8dNnQQF2cyAbjbrbnsbmTqLeRcc67HxAMTXWSWPv",
  Size: "6405229",
};

export interface UploadData {
  Name: string;
  Hash: string;
  Size: string;
}

export const defaultConfig = {
  timeout: 30000,
  validateStatus(status: number) {
    return status < 500; // Reject only if the status code is greater than or equal to 500
  },
};

export const registerUser = (userData: UserData): ReturnType<typeof UserRepo.registerUser> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const regUserData = UserRepo.registerUser(userData);

      return resolve(regUserData);
    }, mockTimeout);
  })
}

export const loginUser = (userData: UserData): ReturnType<typeof UserRepo.loginUser> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const loggedUserData = UserRepo.loginUser(userData);

      return resolve(loggedUserData);
    }, mockTimeout);
  })
}

export const uploadUserData = (formData: FormData, useMock: boolean): Promise<UploadData> => {
  if (useMock) {
    return new Promise((resolve) => {
      setTimeout(async () => {
        return resolve(mockUploadData);
      }, mockTimeout);
    })
  }

  return new Promise((resolve, reject) => {
    axios
      .post(`${infuraBaseUrl}/add?pin=false`, formData, {
        ...defaultConfig,
        timeout: 120000,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Upload response", JSON.stringify(response.data));
        return resolve(response.data);
      })
      .catch((err) => {
        console.log("Error");
        return reject(err);
      });
  });
};
