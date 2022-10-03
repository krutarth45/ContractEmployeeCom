import axios from 'axios';
export const uploadResume = async (formData) => {
  try {
    console.log(formData);
    const { data } = await axios.post(
      'http://localhost:8000/contractor/resumeupload',
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
