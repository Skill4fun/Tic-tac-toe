////------------------ GameSettingsForm ------------------
// Custom form component for game settings update, with imput field validation

import React from 'react';
import { useState } from 'react';
import InputField from '../InputField';
import { useGameSettingsContext } from '../../helper/GameSettingsContextProvider';

const GameSettingsForm = function () {
  const {
    playerNames,
    setPlayerNames,
    gameBoardSize,
    setGameBoardSize,
    setIsResetGameClicked
  } = useGameSettingsContext();

  const [formData, setFormData] = useState({
    playerOneName: playerNames.playerOne,
    playerTwoName: playerNames.playerTwo,
    gameBoardSize: gameBoardSize
  });
  const [errorMessages, setErrorMessages] = useState({});
  const [wasValidated, setWasValidated] = useState(false);

  ////------------------ validators ------------------
  // Form validation rules and related error messages for input fields.
  // The advantage of the validators object is that it can be extended with 
  // any number of new input fields and validation criteria / rules / messages.
  const validators = {
    gameBoardSize: [
      {
        fn: isGameBoardSizeValid,
        errorMessage: 'Minimum 10, maximum 100 lehet a méret'
      },
    ],
    playerOneName: [
      {
        fn: isNotEmpty,
        errorMessage: 'Adj meg egy játékos nevet!'
      },
    ],
    playerTwoName: [
      {
        fn: isNotEmpty,
        errorMessage: 'Adj meg egy játékos nevet!'
      },
    ],
  }

  function isGameBoardSizeValid(value) {
    return (value) ? (value >= 10 && value <= 100) : false;
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
    }).filter((errorMessage) => errorMessage !== '');

    // The "errorMessages" state is updated with the "inputValidationResults", 
    setErrorMessages((prevState) => (
      { ...prevState, [inputName]: inputValidationResults }
    ));
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
    const inputElement = event.target;
    setFormData({
      ...formData,
      [inputElement.name]: inputElement.value
    });
  }

  ////------------------ handleOnSubmit ------------------
  // Events at the time the form is submitted. Obviously, without a backend, the code below 
  // is only suitable for settings to be temporarily stored in the browser, without data transmission.
  function handleOnSubmit(event) {
    event.preventDefault();

    // Check if the form is valid or not
    const formIsValid = reportFormValidity();

    // If the form is valid:
    if (formIsValid) {
      if (formData) {

        // Game board size and user names change based on the input values
        setGameBoardSize(formData.gameBoardSize);
        setPlayerNames({
          playerOne: formData.playerOneName,
          playerTwo: formData.playerTwoName
        });
        setWasValidated(false);
      }
    };
  }

  return (
    <main className="container">
      <div className="row justify-content-md-center">
        <div className=" col-md-auto text-center">
          <form onSubmit={handleOnSubmit} noValidate>
            <div className="d-flex mb-4">
              <div className="mx-3">
                <div className="player-x-rotate">
                  <div className="player-x"></div>
                </div>
                <InputField
                  type="text"
                  name="playerOneName"
                  id="playerOneName"
                  errorMessages={errorMessages.playerOneName}
                  wasValidated={wasValidated}
                  handleOnChange={handleOnChange}
                  value={formData.playerOneName}
                />
              </div>
              <div className="mx-3">
                <div className="player-y"></div>
                <InputField
                  type="text"
                  name="playerTwoName"
                  id="playerTwoName"
                  errorMessages={errorMessages.playerTwoName}
                  wasValidated={wasValidated}
                  handleOnChange={handleOnChange}
                  value={formData.playerTwoName}
                />
              </div>
            </div>
            <div className="input-group my-2 game-size">
              <span className="input-group-text">Pálya mérete:</span>
              <InputField
                type="number"
                name="gameBoardSize"
                id="gameBoardSize"
                errorMessages={errorMessages.gameBoardSize}
                wasValidated={wasValidated}
                handleOnChange={handleOnChange}
                value={formData.gameBoardSize}
              />
            </div>
            <button
              className="navbar-button"
              onClick={() => { setIsResetGameClicked((prev) => (!prev)); }}
            >
              Új Játék
            </button>
          </form>
        </div>
      </div >
    </main >
  )
}

export default GameSettingsForm;