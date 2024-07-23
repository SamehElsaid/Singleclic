import axios from "axios";

const API_URL = "https://fakestoreapi.com";
export const axiosGet = async (url) => {
  try {
    const fetchData = await axios.get(`${API_URL}/${url}`);
    return { data: fetchData.data, status: true };
  } catch (err) {
    return { status: false };
  }
};
