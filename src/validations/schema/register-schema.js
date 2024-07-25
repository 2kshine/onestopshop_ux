import * as yup from 'yup';
import {checkIfEmailOrUserIsAvailable} from "../../axios/axios-requests"

//Check if email regex satisfies
let runisEmailValid = false;
let runisUserValid = false;
let userNameMessage = 'Username has already been taken'
function isRegexSatisfied (message) {
  const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return this.test('isRegexSatisfied', message, function (value) {
    if(emailRegExp.test(value)){
      runisEmailValid = true;
      return true
    }else{
      runisEmailValid = false;
      return false
    }
  });
}

//Check if username regex satisfies
function isUserNameRegexSatisfied(message) {
  const usernameRegExp = /^[a-zA-Z0-9_]{3,20}$/; // Allow alphanumeric characters and underscores, length between 3 and 20

  return this.test('isUserNameRegexSatisfied', message, function (value) {
    if(usernameRegExp.test(value)){
      runisUserValid = true;
      return true
    }else{
      runisUserValid = false;
      return false
    }  
  });
}

//check if email address is unique
function isEmailAddressUnique (message) {
  // api request to the backend
  return this.test('isEmailAddressUnique', message, async function (value) {
    if(runisEmailValid){
      const response = await checkIfEmailOrUserIsAvailable({email_address: value})
      .then((response)=>{
        return response 
      })
      if(!response.status){
        throw this.createError({ message: 'Something went wrong! Try registering later' })
      }
    return response.status === 200 || false
    }

  })

}

//check if username is unique
function isUsernameUnique (message) {
  // api request to the backend
  return this.test('isUsernameUnique', message, async function (value) {
    if(runisUserValid){
      const response = await checkIfEmailOrUserIsAvailable({username: value})
        .then((response)=>{
          return response 
        })
        if(!response.status){
          throw this.createError({ message: 'Something went wrong! Try registering later' })
        }
      return response.status === 200 || false
    }
  })
}

//Add methods to above check functions
yup.addMethod(yup.string, 'isRegexSatisfied', isRegexSatisfied);
yup.addMethod(yup.string, 'isUserNameRegexSatisfied', isUserNameRegexSatisfied);
yup.addMethod(yup.string, 'isEmailAddressUnique', isEmailAddressUnique);
yup.addMethod(yup.string, 'isUsernameUnique', isUsernameUnique);

// define register schema
const RegisterSchema = yup.object().shape({
  username:yup
    .string()
    .required('Username is mandatory.')
    .isUserNameRegexSatisfied('Invalid username format')
    .isUsernameUnique(userNameMessage),
  email_address: yup
    .string()
    .required('Email address is mandatory.')
    .isRegexSatisfied('Invalid email format.')
    .isEmailAddressUnique('Email address has already been taken'),
});

export default RegisterSchema;
