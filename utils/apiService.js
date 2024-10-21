import axios from "axios";

export const fetchDataWithAxios = async (url) => {

  console.log('axios url --', url)
    try {
      // console.log('Inside Axios fetch url');
      const response = await axios.get(url);
      // console.log('Response -- api call done -----------', response)
      return response.data;
    } catch (error) {
      // console.log('Axios fetch api call failed --------------------->>>>>>>')
      // console.error('Error fetching data:--- axiosssssssssssssssss', error);
      throw error;
    }
  };