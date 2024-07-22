import axios from "axios";

const API_URL = "https://fakestoreapi.com";
export const axiosGet = async (url) => {
  console.log(process.env.REACT_APP_API_URL);
  try {
    const fetchData = await axios.get(`${API_URL}/${url}`);
    return { data: fetchData.data, status: true };
  } catch (err) {
    return { status: false };
  }
};
