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
  if (axios.isAxiosError(err)) {
    if (err.code === 'ECONNABORTED') {
      console.log('Timeout Error:', err.message);
      alert('Request Timedout.');
      window.location.reload(false);
    }
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', err.message);
    alert('Unknown error occured.');
    window.location.reload(false);
  }
};

export default CommonAxiosError;
