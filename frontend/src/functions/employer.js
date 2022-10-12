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
export const uploadJobDesc = async (formData, token) => {
  try {
    const { data } = await axios.post(
      'http://localhost:8000/employer/uploadjobdesc',
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
export const uploadCompanyDetails = async (formData, token) => {
  try {
    const { data } = await axios.post(
      'http://localhost:8000/employer/uploadcompanydetails',
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
export const getPostedJobs = async (token) => {
  try {
    const { data } = await axios.get(
      'http://localhost:8000/employer/get-posted-jobs',
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
export const getAppliedUsersList = async (id, token) => {
  try {
    const { data } = await axios.get(
      `http://localhost:8000/employer/${id}/applicants`,
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
