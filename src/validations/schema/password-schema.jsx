import * as yup from 'yup';

const PasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is mandatory')
    .min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol'),
  confirmation_password: yup
    .string()
    .required('Password confirmation is mandatory')
    .oneOf([yup.ref('password'), null], 'Passwords do not match'),
});

export default PasswordSchema;
