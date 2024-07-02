import axios from "axios";
import { API_URL } from "../config/config";
const BASE_URL = API_URL;


// Get Home Heading data 
export const fetchMainTableData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/main_table`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// put Home Heading data 
export const updateMainTableData = async (id, newData) => {
  try {
    const response = await axios.put(`${BASE_URL}/main_table`, newData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get Services data 
export const fetchOurServicesData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/our_services`);
    return response.data; // Assuming the API returns an array of services as described
  } catch (error) {
    throw error;
  }
};

// put service data 
export const updateServiceData = async (id, newData) => {
  try {
    const response = await axios.put(`${BASE_URL}/our_services/${id}`, newData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// add Service Data
export const addServiceData = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/our_services`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to add service: ${error.message}`);
  }
};

// Delete Services data 
export const deleteServiceData = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/our_services/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to delete service: ${error.message}`);
  }
};


// Get Slider data
export const fetchTestimonials = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/testimonials`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch testimonials');
  }
};


// Put Slider Data 
export const updateTestimonialById = async (id, updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}/testimonials/${id}`, updatedData);
    return response.data; // Return updated data if needed
  } catch (error) {
    throw new Error(`Failed to update testimonial with ID ${id}`);
  }
};

// Add Slider Data 
export const addTestimonial = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/testimonials`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Assuming your API returns the added testimonial
  } catch (error) {
    throw new Error(`Failed to add testimonial: ${error.message}`);
  }
};

// Delete Slider Data
export const deleteTestimonialById = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/testimonials/${id}`);
    return response.data; // Optionally return data if needed
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
};

// Get Recent Work data 
export const fetchRecentWorks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/recent_work`);
    return response.data; // Assuming your API returns an array of recent works
  } catch (error) {
    throw new Error(`Failed to fetch recent works: ${error.message}`);
  }
};


// Put Recent Work Data 
export const updateRecentWorkById = async (id, formData) => {
  try {
    const response = await axios.put(`${BASE_URL}/recent_work/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update recent work: ${error.message}`);
  }
};

// Add Recent Work data
export const addRecentWork = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/recent_work`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Assuming your API returns the added recent work
  } catch (error) {
    throw new Error(`Failed to add recent work: ${error.message}`);
  }
};

// Delete Recent Work data
export const deleteRecentWorkById = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/recent_work/${id}`);
  } catch (error) {
    throw new Error(`Failed to delete recent work: ${error.message}`);
  }
};

// Get About Us Page Data 
export const fetchAboutUsCompany = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/aboutUsCompany`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch about us company data: ${error.message}`);
  }
};

// Put About Us Page Data
export const updateAboutUsCompany = async (formData) => {
  try {
    const response = await axios.put(`${BASE_URL}/aboutUsCompany`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update about us company: ${error.message}`);
  }
}

// Get About Our Values Data
export const fetchOurValues = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/OurValues`);
    return response.data; // Assuming API returns an array of objects
  } catch (error) {
    throw new Error(`Failed to fetch Our Values: ${error.message}`);
  }
};

// Put About Our Values Data
export const updateOurValuesById = async (id, updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}/OurValues/${id}`, updatedData);
    return response.data; // Assuming API returns updated data
  } catch (error) {
    throw new Error(`Failed to update Our Values: ${error.message}`);
  }
};

// Get Service Head Data 
export const fetchServicesHead = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/servicesHead`);
    return response.data; // Assuming API returns an object with services_heading and services_content
  } catch (error) {
    throw new Error(`Failed to fetch Services Head data: ${error.message}`);
  }
};

// Put  Service Head Data 
export const updateServicesHead = async ( updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}/servicesHead`, updatedData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update services head data: ${error.message}`);
  }
};

// Get Service Problem Head Data 
export const fetchProblemHead = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/problems`);
    return response.data.heading; // Return only the heading field
  } catch (error) {
    throw new Error(`Failed to fetch problem heading data: ${error.message}`);
  }
};

// Put Service Problem Head Data 
export const updateProblemHead = async (updatedHeading) => {
  try {
    const response = await axios.put(`${BASE_URL}/problems/1`, updatedHeading); // Assuming you are updating the first problem
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update problem heading: ${error.message}`);
  }
};

// Get Service  all Problem Data

export const fetchProblems = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/problems`);
    return response.data.problems; // Assuming problems array is directly under 'problems' key in API response
  } catch (error) {
    console.error('Error fetching problems:', error);
    throw error; // You can handle errors as needed in your application
  }
};


// put Service  all Problem Data
export const updateProblem = async (id, newData) => {
  try {
    const response = await axios.put(`${BASE_URL}/problems/${id}`, newData);
    return response.data; // Assuming API returns updated data
  } catch (error) {
    console.error(`Error updating problem with ID ${id}:`, error);
    throw error; // You can handle errors as needed in your application
  }
};

// Delete Service  all Problem Data
export const deleteProblem = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/problems/${id}`);
    return response.data; // Assuming API returns a success message or updated list of problems
  } catch (error) {
    console.error(`Error deleting problem with ID ${id}:`, error);
    throw error; // You can handle errors as needed in your application
  }
};

// Add Service  all Problem Data
export const addProblem = async (newProblem) => {
  try {
    const response = await axios.post(`${BASE_URL}/problems`, newProblem);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get service solution head 
export const fetchSolutions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/solutions`);
    return response.data; // Return the entire response data
  } catch (error) {
    console.error('Error fetching solutions:', error);
    throw error; // Propagate the error up to the caller
  }
};


// put service solution head
export const updateSolutionHeading = async (newHeading) => {
  try {
    const response = await axios.put(`${BASE_URL}/solutions/1`, { heading: newHeading });
    return response.data;
  } catch (error) {
    throw Error('Error updating solution heading: ' + error.message);
  }
};


// get all solution data
export const fetchAllSolutions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/solutions`);
    return response.data.solutions; // Return only the 'solutions' array from the response
  } catch (error) {
    throw new Error('Error fetching solutions: ' + error.message);
  }
};

// put all solution data
export const updateSolution = async (id, updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL  }/solutions/${id}`, updatedData);
    return response.data; // Return the updated solution data
  } catch (error) {
    throw new Error('Error updating solution: ' + error.message);
  }
};

// Delete all solution data
export const deleteSolution = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/solutions/${id}`);
    return response.data; // Return any response data if needed
  } catch (error) {
    throw new Error('Error deleting solution: ' + error.message);
  }
};

// Add all solution data
export const addSolution = async (newSolution) => {
  try {
    const response = await axios.post(`${BASE_URL}/solutions`, newSolution);
    return response.data; // Return the newly added solution data
  } catch (error) {
    throw new Error('Error adding solution: ' + error.message);
  }
};