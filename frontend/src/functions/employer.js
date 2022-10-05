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
