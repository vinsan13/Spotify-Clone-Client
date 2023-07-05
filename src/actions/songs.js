import axios from 'axios'


const BASE_URL = 'https://spotify-clone-9lr9.onrender.com'



export const getSongs = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/song`);
    return data;

  } catch (error) {
    console.log(error);
  }
};

export const uploadSong = async (song) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/song`, song);

    return data;
  } catch (error) {
    console.log(error);
  }
};