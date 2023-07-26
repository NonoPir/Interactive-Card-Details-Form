"use strict";
const nameInput = document.getElementById("input_name");
const numberInput = document.getElementById("number_input");
const monthInput = document.getElementById("mm");
const yearInput = document.getElementById("yy");
const cvcInput = document.getElementById("cvc_input");
const nameError = document.getElementById("error_name");
const numberError = document.getElementById("error_number");
const dateError = document.getElementById("date_error");
const cvcError = document.getElementById("cvc_error");
const blankName = document.getElementById("blank_name");
const blankNumber = document.getElementById("blank_number");
const cvcBlank = document.getElementById("cvc_blank");
const dateBlank = document.getElementById("date_blank");
const successBox = document.querySelector(".success_box");
const box = document.querySelector(".box");
const confirmButton = document.getElementById("btn");
const firstSpan = document.getElementById("first_span");
const secondSpan = document.getElementById("second_span");
const thirdSpan = document.getElementById("third_span");
const fourthSpan = document.getElementById("fourth_span");
const cardholderName = document.getElementById("cardholder_name");
const firstTwoZeros = document.getElementById("first_two_zeros");
const secondTwoZeros = document.getElementById("second_two_zeros");
const cvcDigits = document.getElementById("cvc_digits");
const successMessage = document.getElementById("success_message");
const inputForm = document.getElementById("input_form");
const continueButton = document.getElementById("continue_button");

const errorsArr = [
  nameError,
  numberError,
  dateError,
  cvcError,
  blankName,
  blankNumber,
  cvcBlank,
  dateBlank,
];

const spansArr = [firstSpan, secondSpan, thirdSpan, fourthSpan];

const inputsArr = [nameInput, numberInput, monthInput, yearInput, cvcInput];

const addHiddenClass = (id) => id.classList.add("hidden");

const removeHiddenClass = (id) => id.classList.remove("hidden");

const addInputErrorClass = (input) => input.classList.add("input_error");

const removeInputErrorClass = (input) => input.classList.remove("input_error");

const checkNumbers = () => {
  if (/^[a-zA-Z\s]*$/.test(nameInput.value)) {
    addHiddenClass(nameError);
    removeInputErrorClass(nameInput);
  } else {
    removeHiddenClass(nameError);
    addInputErrorClass(nameInput);
  }

  nameInput.value.length > 0 ? addHiddenClass(blankName) : "";
};

const checkLetters = () => {
  if (/^\d*$/.test(numberInput.value)) {
    addHiddenClass(numberError);
    removeInputErrorClass(numberInput);
  } else {
    removeHiddenClass(numberError);
    addInputErrorClass(numberInput);
  }

  numberInput.value.length > 16
    ? (numberInput.value = numberInput.value.slice(0, 16))
    : "";

  numberInput.value.length > 0 ? addHiddenClass(blankNumber) : "";
  numberInput.value.length === 16 ? monthInput.focus() : "";
};
const checkDateInput = () => {
  if (/^\d*$/.test(monthInput.value) && /^\d*$/.test(yearInput.value)) {
    addHiddenClass(dateError);
    removeInputErrorClass(yearInput);
    removeInputErrorClass(monthInput);
  } else {
    removeHiddenClass(dateError);
    addInputErrorClass(yearInput);
    addInputErrorClass(monthInput);
  }
  if (monthInput.value.length > 2) {
    monthInput.value = monthInput.value.slice(0, 2);
  }
  if (yearInput.value.length > 2) {
    yearInput.value = yearInput.value.slice(0, 2);
  }
};
const checkCvcInput = function () {
  if (/^\d*$/.test(cvcInput.value)) {
    addHiddenClass(cvcError);
    removeInputErrorClass(cvcInput);
  } else {
    removeHiddenClass(cvcError);
    addInputErrorClass(cvcInput);
  }

  if (cvcInput.value.length > 3) {
    cvcInput.value = cvcInput.value.slice(0, 3);
  }
};

const checkBlankInputs = function () {
  if (nameInput.value === "") {
    removeHiddenClass(blankName);
    addInputErrorClass(nameInput);
  } else if (!nameInput.value.includes(" ")) {
    removeHiddenClass(blankName);
    addInputErrorClass(nameInput);
    blankName.textContent = "Must include name and surname";
  } else {
    addHiddenClass(blankName);
    removeInputErrorClass(nameInput);
  }
  if (numberInput.value === "") {
    removeHiddenClass(blankNumber);
    addInputErrorClass(numberInput);
    blankNumber.textContent = "Can't be blank";
  } else if (numberInput.value.length < 16 && numberInput.value.length > 0) {
    removeHiddenClass(blankNumber);
    addInputErrorClass(numberInput);
    blankNumber.textContent = "Must be 16 digits";
  } else {
    addHiddenClass(blankNumber);
    removeInputErrorClass(numberInput);
  }
  if (monthInput.value === "") {
    removeHiddenClass(dateBlank);
    addInputErrorClass(monthInput);
  } else {
    addHiddenClass(dateBlank);
    removeInputErrorClass(monthInput);
  }
  if (yearInput.value === "") {
    removeHiddenClass(dateBlank);
    addInputErrorClass(yearInput);
  } else {
    addHiddenClass(dateBlank);
    removeInputErrorClass(yearInput);
  }
  if (cvcInput.value === "") {
    removeHiddenClass(cvcBlank);
    addInputErrorClass(cvcInput);
  } else {
    addHiddenClass(cvcBlank);
    removeInputErrorClass(cvcInput);
  }
  if (cvcInput.value.length < 3 && cvcInput.value.length > 0) {
    removeHiddenClass(cvcBlank);
    addInputErrorClass(cvcInput);
    cvcBlank.textContent = "Must be 3 digits";
  }

  if (
    (monthInput.value.length < 2 && monthInput.value.length > 0) ||
    (yearInput.value.length < 2 && yearInput.value.length > 0)
  ) {
    if (monthInput.value.length < 2 && monthInput.value.length > 0) {
      removeHiddenClass(dateBlank);
      addInputErrorClass(monthInput);
      dateBlank.textContent = "Must be 2 digits";
    } else if (yearInput.value.length < 2 && yearInput.value.length > 0) {
      removeHiddenClass(dateBlank);
      addInputErrorClass(yearInput);
      dateBlank.textContent = "Must be 2 digits";
    }
  } else if (monthInput.value === "" || yearInput.value === "") {
    removeHiddenClass(dateBlank);
    dateBlank.textContent = "Can't be blank";
  }
};

confirmButton.addEventListener("click", function () {
  const containsHidden = errorsArr.some(
    (cur) => !cur.classList.contains("hidden")
  );

  console.log(containsHidden);
  if (containsHidden === false) {
    addHiddenClass(box);
    removeHiddenClass(successBox);
  } else {
    addHiddenClass(successBox);
    removeHiddenClass(box);
  }
});

numberInput.addEventListener("input", function () {
  const inputNums = numberInput.value;
  const firstFourDigits = inputNums.substring(0, 4).padEnd(4, "0");
  const secondFourDigits = inputNums.substring(4, 8).padEnd(4, "0");
  const thirdFourDigits = inputNums.substring(8, 12).padEnd(4, "0");
  const fourthFourDigits = inputNums.substring(12, 16).padEnd(4, "0");

  firstSpan.textContent = firstFourDigits;
  secondSpan.textContent = secondFourDigits;
  thirdSpan.textContent = thirdFourDigits;
  fourthSpan.textContent = fourthFourDigits;
});

nameInput.addEventListener("input", function () {
  const inputName = nameInput.value;
  inputName === ""
    ? (cardholderName.textContent = "JOHN DOE")
    : (cardholderName.textContent = inputName.toUpperCase());
});

monthInput.addEventListener("input", function () {
  const monthDate = monthInput.value;
  monthDate === ""
    ? (firstTwoZeros.textContent = "00")
    : (firstTwoZeros.textContent = monthDate);

  monthDate.length === 2 ? yearInput.focus() : "";
});

yearInput.addEventListener("input", function () {
  const yearDate = yearInput.value;
  yearDate === ""
    ? (secondTwoZeros.textContent = "00")
    : (secondTwoZeros.textContent = yearDate);

  yearDate.length === 2 ? cvcInput.focus() : "";
});
cvcInput.addEventListener("input", function () {
  const cvcDigitsInput = cvcInput.value;
  cvcDigitsInput === ""
    ? (cvcDigits.textContent = "000")
    : (cvcDigits.textContent = cvcDigitsInput);
});

const refreshDefaultData = function () {
  inputsArr.forEach((cur) => (cur.value = ""));
  addHiddenClass(successBox);
  removeHiddenClass(box);
  spansArr.forEach((cur) => (cur.textContent = "0000"));
  cardholderName.textContent = "JOHN DOE";
  firstTwoZeros.textContent = "00";
  secondTwoZeros.textContent = "00";
  cvcDigits.textContent = "000";
};

const displayName = () => {
  const upperFirstLetter = nameInput.value
    .split(" ")[0]
    .charAt(0)
    .toUpperCase();
  const result = upperFirstLetter + nameInput.value.split(" ")[0].slice(1);
  successMessage.textContent = `${result}, We've added your card details`;
};

inputForm.addEventListener("submit", function (event) {
  event.preventDefault();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && !successBox.classList.contains("hidden")) {
    event.preventDefault(); // Prevent form submission (if it's inside a form)
    continueButton.click(); // Programmatically click the button
  }
});
