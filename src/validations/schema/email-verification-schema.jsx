import * as yup from 'yup';

function isRegexSatisfied(message) {
  const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return this.test('isRegexSatisfied', message, (value) => {
    if (emailRegExp.test(value)) {
      return true;
    }
    return false;
  });
}

// Add methods to above check functions
yup.addMethod(yup.string, 'isRegexSatisfied', isRegexSatisfied);

// define register schema
const EmailVerificationSchema = yup.object().shape({
  email_address: yup
    .string()
    .required('Email address is mandatory.')
    .isRegexSatisfied('Invalid email format.'),
});

export default EmailVerificationSchema;
