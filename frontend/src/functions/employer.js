import axios from 'axios';
export const uploadLogo = async (formData, token) => {
  try {
    const { data } = await axios.post(
      'http://localhost:8000/employer/uploadlogo',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/formdata',
          'x-auth-token': token
        }
      }
    );
    return data.secure_url;
  } catch (error) {
    return error.response.data.message;
  }
};
export const getUsersList = async (token) => {
  try {
    const { data } = await axios.get(
      'http://localhost:8000/employer/users-list',
      {
        headers: {
          'x-auth-token': token
        }
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
