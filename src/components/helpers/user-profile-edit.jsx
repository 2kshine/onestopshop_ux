import React, { useState } from 'react';
import {
  TextField,
  Typography,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import { useFormik } from 'formik';
// import { updateAgentProfile } from '../../axios/axios-requests';
// import { useSelector } from '../../redux/store';

// eslint-disable-next-line
const UserProfileEdit = () => {
  const [loading, setLoading] = useState(false);
  //   const { agent } = useSelector((state) => state.agent);
  const agent = null;
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      phone: '',
      bio: '',
      license_number: '',
    },
    validationSchema: '',
    onSubmit: async (values) => {
      setLoading(true);
      values.agent_id = agent?.data?.agent_id;
      const updateObject = {};
      // eslint-disable-next-line
      Object.keys(values).map((data) => {
        if (values[data] !== '') {
          updateObject[data] = values[data];
        }
      });
      setTimeout(async () => {
        // const response = await updateAgentProfile(updateObject);
        // if (response?.status === 204) {
        //   window.location.reload();
        // }
      }, 2000);
    },
  });

  return (
    <Box
      component="form"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
      onSubmit={formik.handleSubmit}
    >
      <Typography variant="h6" gutterBottom>
        <b>Edit Profile</b>
      </Typography>
      <TextField
        id="first_name"
        label="First Name"
        value={formik.values.first_name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={formik.touched.first_name && formik.errors.first_name}
        error={formik.touched.first_name && Boolean(formik.errors.first_name)}
        margin="dense"
        variant="outlined"
        sx={{
          width: '80%',
        }}
      />
      <br />
      <TextField
        id="last_name"
        label="Last Name"
        value={formik.values.last_name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={formik.touched.last_name && formik.errors.last_name}
        error={formik.touched.last_name && Boolean(formik.errors.last_name)}
        margin="dense"
        variant="outlined"
        sx={{
          width: '80%',
        }}
      />
      <br />
      <TextField
        id="phone"
        label="Mobile Number"
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={formik.touched.phone && formik.errors.phone}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        margin="dense"
        variant="outlined"
        sx={{
          width: '80%',
        }}
      />
      <br />
      <TextField
        id="bio"
        label="Bio"
        value={formik.values.bio}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={formik.touched.bio && formik.errors.bio}
        error={formik.touched.bio && Boolean(formik.errors.bio)}
        margin="dense"
        variant="outlined"
        sx={{
          width: '80%',
        }}
      />
      <br />
      <TextField
        id="license_number"
        label="License Number"
        value={formik.values.license_number}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={
          formik.touched.license_number && formik.errors.license_number
        }
        error={
          formik.touched.license_number && Boolean(formik.errors.license_number)
        }
        margin="dense"
        variant="outlined"
        sx={{
          width: '80%',
        }}
      />{' '}
      <br />
      <br />
      {loading ? (
        <CircularProgress color="primary" sx={{ mt: 3, mb: 3 }} />
      ) : (
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Confirm Edit
        </Button>
      )}
    </Box>
  );
};
export default UserProfileEdit;
