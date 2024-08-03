import * as yup from 'yup';
import { checkIfEmailOrUserIsAvailable } from '../../axios/axios-requests';

export const ResetPasswordSixDigitSchema = yup.object().shape({
  six_digit_code: yup
    .string()
    .required('Six Digit Code is mandatory')
    .min(6, 'Code must be at least 6 digits')
    .max(6, 'Code must be at most 6 digits'),
});

let runisEmailValid = false;
function isRegexSatisfied(message) {
  const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return this.test('isRegexSatisfied', message, (value) => {
    if (emailRegExp.test(value)) {
      runisEmailValid = true;
      return true;
    }
    runisEmailValid = false;
    return false;
  });
}
// check if email address is unique
function isEmailAddressUnique(message) {
  // api request to the backend
  return this.test('isEmailAddressUnique', message, async function (value) {
    if (runisEmailValid) {
      const response = await checkIfEmailOrUserIsAvailable({
        email_address: value,
      }).then((resp) => resp);
      if (!response.status) {
        throw this.createError({
          message: 'Something went wrong! Try registering later',
        });
      }
      return response.status !== 200;
    }
  });
}

// Add methods to above check functions
yup.addMethod(yup.string, 'isRegexSatisfied', isRegexSatisfied);
yup.addMethod(yup.string, 'isEmailAddressUnique', isEmailAddressUnique);
export const ResetPasswordEmailSchema = yup.object().shape({
  email_address: yup
    .string()
    .required('Email address is mandatory.')
    .isRegexSatisfied('Invalid email format.')
    .isEmailAddressUnique(
      'Email address is not registered. Please check again.'
    ),
});
