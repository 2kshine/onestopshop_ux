import * as yup from 'yup';

const LoginSchema = yup.object().shape({
  email_address: yup
    .string()
    .email('Invalid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});
export default LoginSchema;
