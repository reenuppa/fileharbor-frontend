import { getUserFromLocalStorage } from "./utils/auth";
import axios from "axios";
import { User } from "./utils/auth";
import Cookies from "js-cookie";

const getApiUrl=() =>process.env.NEXT_PUBLIC_BACKEND_URL;
const API_URL = getApiUrl();
  interface UserData {
    // Define the structure of the user data you expect
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password:string;
    // Add other properties as needed
  }
  
  // Define the getUser function
  const getUser = async (token: string): Promise<UserData | null> => {
    try {
      // Make a GET request to your API endpoint with the token in the headers
      const response = await axios.get<UserData>(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // If the request is successful, return the user data
      return response.data;
    } catch (error) {
      // Handle any errors, e.g., network errors or authentication failures
      console.error("Error fetching user data:", error);
      return null;
    }
  };
  
  export default getUser;
  