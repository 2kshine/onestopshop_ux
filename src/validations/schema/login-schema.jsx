import * as yup from 'yup';

const LoginSchema = yup.object().shape({
  login_user: yup.string().required('Invalid username or email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Invalid password'),
});
export default LoginSchema;
