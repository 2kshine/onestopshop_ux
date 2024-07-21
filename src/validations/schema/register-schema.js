import * as yup from 'yup';

// Using custom test method
// is regex satisfied
const emailMessage = 'Invalid email format.';
function isRegexSatisfied (message) {
  const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return this.test('isRegexSatisfied', message, function (value) {
    if (emailRegExp.test(value)) {
      return true;
    }
    return false;
  });
}

function isEmailAddressUnique (message) {
  // api request to the backend

}

function isUsernameUnique (message) {
  // api request to the backend
}


// Password Section
// Custom validation function to check if password is a common password or not
// async function isPasswordCommon (value) {
//   const strength = zxcvbn(value).score;
//   if (strength < 3) {
//     throw new yup.ValidationError(
//       'Password can be easily guessed.',
//       value,
//       'password'
//     );
//   }
//   return true;
// }

yup.addMethod(yup.string, 'isRegexSatisfied', isRegexSatisfied);
yup.addMethod(yup.string, 'isEmailAddressUnique', isEmailAddressUnique);
yup.addMethod(yup.string, 'isUsernameUnique', isUsernameUnique);

// define signupSchema
const RegisterSchema = yup.object().shape({
  username:yup
    .string()
    .required('Username is mandatory.')
    .isUsernameUnique('Sorry! Username has already been taken'),
  email_address: yup
    .string()
    .required('Email address is mandatory.')
    .isRegexSatisfied(emailMessage)
    .isEmailAddressUnique('Sorry! Email address has already been taken'),
});
// password: yup
// .string()
// .required('Password is mandatory')
// .min(8, 'Password must be 8 characters long')
// .matches(/[0-9]/, 'Password requires a number')
// .matches(/[a-z]/, 'Password requires a lowercase letter')
// .matches(/[A-Z]/, 'Password requires an uppercase letter')
// .matches(/[^\w]/, 'Password requires a symbol')
// .test('isPasswordCommon', 'Password can be easily guessed.', isPasswordCommon)
export default RegisterSchema;
