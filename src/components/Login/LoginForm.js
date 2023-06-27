////------------------ LoginForm ------------------
// Custom form component for user login with imput field validation

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoggedInUserContext } from '../../helper/LoggedInUserContextProvider';
import { userLoginDetails } from './userLoginDetails';
import InputField from '../InputField';
import Alert from '../Alert';

const LoginForm = function () {
  const navigate = useNavigate();
  const { setLoggedInUser } = useLoggedInUserContext();
  const [formData, setFormData] = useState({
    userName: '',
    password: ''
  });
  const [errorMessages, setErrorMessages] = useState({})
  const [wasValidated, setWasValidated] = useState(false)
  const [formSent, setFormSent] = useState(false);
  const [alert, setAlert] = useState(null);

  ////------------------ validators ------------------
  // Form validation rules and related error messages for input fields.
  // The advantage of the validators object is that it can be extended with 
  // any number of new input fields and validation criteria / rules / messages.
  const validators = {
    userName: [
      {
        fn: isNotEmpty,
        errorMessage: 'Kitöltése kötelező'
      },
    ],
    password: [
      {
        fn: isNotEmpty,
        errorMessage: 'Kitöltése kötelező'
      },
    ],
  }

  function isNotEmpty(value = '') {
    return value !== '';
  }

  ////------------------ reportFieldValidity ------------------
  // Checks if the data entered in a field meets the validation criteria specified in "validators".
  function reportFieldValidity(inputName) {
    const inputValue = formData[inputName];
    const inputValidators = validators[inputName];

    // If the input field does not match a corresponding criteria, 
    // the error message for that criterion will be added to the "inputValidationResults". 
    const inputValidationResults = inputValidators.map((inputValidator) => {
      const { fn: validatorFn, errorMessage: validatorErrorMessage } = inputValidator
      const isValid = validatorFn(inputValue);
      return (isValid) ? '' : validatorErrorMessage;
    }).filter((errorMessage) => errorMessage !== '')

    // The "errorMessages" state is updated with the "inputValidationResults", 
    setErrorMessages((prevState) => (
      { ...prevState, [inputName]: inputValidationResults }
    ))
    const isInputValid = inputValidationResults.length === 0
    if (isInputValid) {
      setErrorMessages((prevState) => (
        { ...prevState, [inputName]: [] }
      ));
    }

    // Finally the function will return a boolean value whether the input field is valid or not.
    return isInputValid;
  }

  ////------------------ reportFormValidity ------------------
  // Checks if the entire formdata entered by the user is valid. 
  function reportFormValidity() {
    const inputFieldNames = Object.keys(validators);

    // Checks all fields validity 
    const inputValidations = inputFieldNames.map((inputFieldName) => reportFieldValidity(inputFieldName));
    let isValid = inputValidations.every((isValid) => isValid);

    // After setting the "wasValidated" state true, 
    // the function returns a boolean value whether the form is valid or not
    setWasValidated(true);
    return isValid;
  }

  ////------------------ handleOnChange ------------------
  // The "formData" state is updated with the values of the input fields as they change.
  function handleOnChange(event) {
    const inputElement = event.target
    setFormData({
      ...formData,
      [inputElement.name]: inputElement.value
    });
  }

  ////------------------ handleOnSubmit ------------------
  // Events at the time the form is submitted. Obviously, without a backend, the code below 
  // is only suitable for a kind of visualization of how the site works. 
  // There is no "real" user data transmission / verification in it.
  function handleOnSubmit(event) {
    event.preventDefault()

    // Check if the form is valid or not
    const formIsValid = reportFormValidity()
    setFormSent(false);

    // If the form is valid:
    if (formIsValid) {

      // If the entered login details are correct: 
      // - The "loggedInUser" state is updated to "true"
      // - This information is also stored in the "localStorage" under the name "tictactoeToken" 
      //   (in this case without any hashed user details, simply a true value)
      // - "formData" is cleared
      // - "Alert" appears about succesfull login
      if (formData.userName === userLoginDetails.userName && formData.password === userLoginDetails.password) {
        setLoggedInUser(true);
        localStorage.setItem('tictactoeToken', true);
        setFormData({});
        setFormSent(true);
        setAlert('Sikeres bejelentkezés');

        // The method "event.target.reset()" may be useful to clear certain field types (eg. <select>, checkbox )
        // event.target.reset()

        // - After 1 sec delay, the page redirects to the game board
        setTimeout(() => {
          navigate('/GameBoard');
        }, 1000)

      } else {
        // If the entered login details are incorrect (should be: "gergo", "123")
        // normally this info should come back from the backend of course
        setWasValidated(false);
        setAlert('Nem megfelelő a megadott jelszó vagy felhasználónév');
      }
    }
    ;
  }

  return (
    <main className="container">
      <div className="row justify-content-md-center">
        <div className="col col-md-auto text-center">
          <form onSubmit={handleOnSubmit} noValidate>
            <div className="mb-3">
              <InputField
                type="text"
                name="userName"
                id="userName"
                label="Felhasználónév"
                errorMessages={errorMessages.userName}
                wasValidated={wasValidated}
                handleOnChange={handleOnChange}
                value={formData.userName}
              />
            </div>
            <div className="mb-3">
              <InputField
                type="password"
                name="password"
                id="password"
                label="Jelszó"
                errorMessages={errorMessages.password}
                wasValidated={wasValidated}
                handleOnChange={handleOnChange}
                value={formData.password}
              />
            </div>
            <button className="menu-button">Bejelentkezés</button>
          </form>

          {(!!alert || formSent) &&
            <Alert theme={!!formSent ? 'success' : 'danger'}>
              {alert}
            </Alert>
          }
        </div>
      </div>
    </main>
  )
}

export default LoginForm;