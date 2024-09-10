import { useState } from "react";

function App() {
  const [step, setStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gender: "",
    street: "",
    city: "",
    cardNumber: "",
    cardHolderName: "",
  });

  function handlePrevious() {
    setStep((step) => step - 1);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setErrors({ ...errors, [name]: null });
  }

  function validate() {
    let tempErrors = {};
    let isValid = true;

    if (step === 0) {
      if (!formData.firstName.trim()) {
        tempErrors.firstName = "First Name is required";
        isValid = false;
      }
      if (!formData.lastName.trim()) {
        tempErrors.lastName = "Last Name is required";
        isValid = false;
      }
      if (!formData.phoneNumber.trim() || formData.phoneNumber.length !== 10) {
        tempErrors.phoneNumber = "Valid phone number is required";
        isValid = false;
      }
      if (!formData.gender.trim()) {
        tempErrors.gender = "Gender is required";
        isValid = false;
      }
    } else if (step === 1) {
      if (!formData.street.trim()) {
        tempErrors.street = "Street is required";
        isValid = false;
      }
      if (!formData.city.trim()) {
        tempErrors.city = "City is required";
        isValid = false;
      }
    } else if (step === 2) {
      if (!formData.cardNumber.trim() || formData.cardNumber.length < 16) {
        tempErrors.cardNumber = "Card number must be at least 16 digits";
        isValid = false;
      }
      if (!formData.cardHolderName.trim()) {
        tempErrors.cardHolderName = "Card Holder Name is required";
        isValid = false;
      }
    }

    setErrors(tempErrors);
    return isValid;
  }

  function handleNext() {
    if (validate()) {
      setStep((step) => step + 1);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      console.log("Submitting Data:", formData);
    }
  }
  if (isSubmitted) {
    return <FormDetails formData={formData} />;
  }

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1 className="title">Form Validation</h1> <br />
          <div className="user__details">
            {step === 0 && (
              <div>
                <div className="input__box">
                  <input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && (
                    <div style={{ color: "red" }}>{errors.firstName}</div>
                  )}
                </div>
                <div className="input__box">
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && (
                    <div style={{ color: "red" }}>{errors.lastName}</div>
                  )}
                </div>
                <div className="input__box">
                  <input
                    name="phoneNumber"
                    type="text"
                    placeholder="Contact Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                  {errors.phoneNumber && (
                    <div style={{ color: "red" }}>{errors.phoneNumber}</div>
                  )}
                </div>
                <div className="input__box">
                  <label>Gender:</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && (
                    <div style={{ color: "red" }}>{errors.gender}</div>
                  )}
                </div>
              </div>
            )}
            {step === 1 && (
              <div>
                <div className="input__box">
                  <input
                    name="street"
                    type="text"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="Address"
                  />
                  {errors.street && (
                    <div style={{ color: "red" }}>{errors.street}</div>
                  )}
                </div>
                <div className="input__box">
                  <input
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                  />
                  {errors.city && (
                    <div style={{ color: "red" }}>{errors.city}</div>
                  )}
                </div>
              </div>
            )}
            {step === 2 && (
              <div>
                <div className="input__box">
                  <input
                    name="cardNumber"
                    type="text"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="Card Number"
                  />
                  {errors.cardNumber && (
                    <div style={{ color: "red" }}>{errors.cardNumber}</div>
                  )}
                </div>
                <div className="input__box">
                  <input
                    name="cardHolderName"
                    type="text"
                    value={formData.cardHolderName}
                    onChange={handleChange}
                    placeholder="Card Holder Name"
                  />
                  {errors.cardHolderName && (
                    <div style={{ color: "red" }}>{errors.cardHolderName}</div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="button">
            {step > 0 && step < 3 && (
              <input type="button" value="Previous" onClick={handlePrevious} />
            )}
            {step >= 0 && step < 2 && (
              <input type="button" value="Next" onClick={handleNext} />
            )}
            {step === 2 && <input type="submit" value="Submit" />}
          </div>
        </form>
      </div>
    </div>
  );
}

function FormDetails({ formData }) {
  return (
    <div className="form-details">
      <h2>Submitted Form Details</h2>
      <p>
        <strong>First Name:</strong> {formData.firstName}
      </p>
      <p>
        <strong>Last Name:</strong> {formData.lastName}
      </p>
      <p>
        <strong>Phone Number:</strong> {formData.phoneNumber}
      </p>
      <p>
        <strong>Gender:</strong> {formData.gender}
      </p>
      <p>
        <strong>Street:</strong> {formData.street}
      </p>
      <p>
        <strong>City:</strong> {formData.city}
      </p>
      <p>
        <strong>Card Number:</strong> {formData.cardNumber}
      </p>
      <p>
        <strong>Card Holder Name:</strong> {formData.cardHolderName}
      </p>
    </div>
  );
}

export default App;
