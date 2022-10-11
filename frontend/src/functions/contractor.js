import axios from 'axios';
export const uploadResume = async (formData, token) => {
  try {
    const { data } = await axios.post(
      'http://localhost:8000/contractor/resumeupload',
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
