////------------------ InputField ------------------
// Custom InputField component for multiple use, with optimised field validation, 
// error message display and a validation-conditional display style.

function InputField(
  {
    id,
    name,
    handleOnChange,
    type,
    errorMessages = [],
    label,
    wasValidated = false,
    value = ''
  }
) {
  function getValidationClassName() {

    // validation-conditional style class
    let className = '';
    const isValid = errorMessages.length === 0;
    if (wasValidated) {
      if (isValid) {
        className = 'is-valid';
      } else {
        className = 'is-invalid';
      }
    }
    return className;
  }

  return (
    <>

      <label
        htmlFor={id}
        className="form-label">
        {label}
      </label>
      {type === 'textarea' ?
        <textarea onChange={handleOnChange}
          name={name}
          className={"form-control " + getValidationClassName()}
          id={id}
          value={value}
        />

        : <input
          onChange={handleOnChange}
          name={name}
          type={type}
          className={"form-control text-center " + getValidationClassName()}
          placeholder={value}
          id={id}
          value={value}
          min={type === "number" ? 10 : ""}
          max={type === "number" ? 100 : ""}
        />
      }
      <div className={"invalid-feedback"}>
        <>{errorMessages[0]}</>
      </div>
    </>
  );
}

export default InputField;