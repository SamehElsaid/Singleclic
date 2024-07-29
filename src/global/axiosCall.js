import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
export const axiosGet = async (url) => {
  try {
    const fetchData = await axios.get(`${API_URL}/${url}`);
    return { data: fetchData.data, status: true };
  } catch (err) {
    return { status: false };
  }
};
