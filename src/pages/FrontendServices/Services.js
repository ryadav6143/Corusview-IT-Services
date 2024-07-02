import { API_URL } from "../../config/config";
import axios from "axios";
// Home page heading
export const getHomeHeading = async () => {
  try {
    const response = await axios.get(`${API_URL}/your-endpoint`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
