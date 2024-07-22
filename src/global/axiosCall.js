import axios from "axios";

export const axiosGet = async (url) => {
  try {
    const fetchData = await axios.get(`${process.env.API_URL}/${url}`);
    return fetchData.data;
  } catch (err) {
    throw err;
  }
};
