import axios from 'axios';
export const uploadLogo = async (formData) => {
  try {
    const { data } = await axios.post(
      'http://localhost:8000/employer/uploadlogo',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/formdata'
        }
      }
    );
    return data.secure_url;
  } catch (error) {
    return error.response.data.message;
  }
};
export const getUsersList = async () => {
  try {
    const { data } = await axios.get(
      'http://localhost:8000/employer/users-list',
      {}
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
