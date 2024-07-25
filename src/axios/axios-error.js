import axios from 'axios';

const CommonAxiosError = (err) => {
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if(err.response.status === 500){
      alert(err.response.data.message);
      window.location.reload();
    }
  }
  if (err.name.toLowerCase() === "axioserror") {
    if (err.code === 'ECONNABORTED') {
      console.log('Timeout Error:', err.message);
      alert('Request Timedout.');
      window.location.reload(false);
    }
    console.log('Axios Error Detected', err);
    return err
  } 
  console.log('Error', err);
  alert('Something went wrong. Please try again.');
  window.location.reload(false);
};

export default CommonAxiosError;
