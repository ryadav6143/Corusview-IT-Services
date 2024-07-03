import { API_URL } from "../../config/config";
import axios from "axios";
// Home page heading
export const getHomeServices = async () => {
  try {
    const response = await axios.get(`${API_URL}/our_services`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

export const getHomeHeading = async () => {
  try {
    const response = await axios.get(`${API_URL}/main_table`);
    return response.data;
  } catch (error) {
    console.error("Error fetching main table data:", error);
    return null;
  }
};
export const getCustomers = async () => {
  try {
    const response = await axios.get(`${API_URL}/testimonials`);
    return response.data;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
};
export const getAboutCompany = async () => {
  try {
    const response = await axios.get(`${API_URL}/aboutUsCompany`);
    return response.data;
  } catch (error) {
    console.error("Error fetching about us company data:", error);
    return null; // Or handle error as per your application's needs
  }
};
export const getOurValues = async () => {
  try {
    const response = await axios.get(`${API_URL}/OurValues`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Our Values data:", error);
    return null; // Or handle error as per your application's needs
  }
};
export const getServicePageHeading = async () => {
  try {
    const response = await axios.get(`${API_URL}/servicesHead`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Our Values data:", error);
    return null; // Or handle error as per your application's needs
  }
};
export const getProblems = async () => {
  try {
    const response = await axios.get(`${API_URL}/problems`);
    return response.data;
  } catch (error) {
    console.error("Error fetching problems data:", error);
    throw error; // Optionally re-throw the error to handle it in the component
  }
};
export const getSolutions = async () => {
  try {
    const response = await axios.get(`${API_URL}/solutions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching problems data:", error);
    throw error; // Optionally re-throw the error to handle it in the component
  }
};
export const getServicesWYG = async () => {
  try {
    const response = await axios.get(`${API_URL}/services_wyg`);
    return response.data;
  } catch (error) {
    console.error("Error fetching services WYG:", error);
    throw error;
  }
};
export const carrerHead = async () => {
  try {
    const response = await axios.get(`${API_URL}/carrerHead`);
    return response.data;
  } catch (error) {
    console.error("Error fetching services WYG:", error);
    throw error;
  }
};
export const getCareerInfo = async () => {
  try {
    const response = await axios.get(`${API_URL}/carrer_see_and_get`);
    return response.data;
  } catch (error) {
    console.error("Error fetching career info:", error);
    throw error; // Let the caller handle the error
  }
};

export const getCareerImages = async () => {
  try {
    const response = await fetch(`${API_URL}/career_images`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Propagate the error back to the caller
  }
};
export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Propagate the error back to the caller
  }
};
export const getContactInfo = async () => {
  try {
    const response = await axios.get(`${API_URL}/contactUs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching contact information:", error);
    throw error;
  }
};
export const getRoles = async () => {
  try {
    const response = await axios.get(`${API_URL}/jobRoles`);
    return response.data;
  } catch (error) {
    console.error("Error fetching contact information:", error);
    throw error;
  }
};
export const currentJobOpenings = async () => {
  try {
    const response = await axios.get(`${API_URL}/jobOpenings`);
    return response.data;
  } catch (error) {
    console.error("Error fetching job openings:", error);
    throw error; // Rethrow the error so it can be caught where this function is called
  }
};
export const getRecentWorks = async () => {
  try {
    const response = await axios.get(`${API_URL}/recent_work`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recent works:", error);
    throw error; // Rethrow the error so it can be handled where the function is called
  }
};
export const submitContactForm = async (formData, selectedOption) => {
  try {
    const response = await axios.post(`${API_URL}/contactForm`, {
      ...formData,
      role: selectedOption,
    });
    return response.data; // Assuming your API returns some data upon success
  } catch (error) {
    throw error; // Propagate the error to handle it in your component
  }
};
