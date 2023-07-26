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

const checkNumbers = () => {
  /^[a-zA-Z\s]*$/.test(nameInput.value)
    ? addHiddenClass(nameError)
    : removeHiddenClass(nameError);

  nameInput.value.length > 0 ? addHiddenClass(blankName) : "";
};

const checkLetters = () => {
  /^\d*$/.test(numberInput.value)
    ? addHiddenClass(numberError)
    : removeHiddenClass(numberError);

  numberInput.value.length > 16
    ? (numberInput.value = numberInput.value.slice(0, 16))
    : "";

  numberInput.value.length > 0 ? addHiddenClass(blankNumber) : "";
  numberInput.value.length === 16 ? monthInput.focus() : "";
};
const checkDateInput = () => {
  /^\d*$/.test(monthInput.value) && /^\d*$/.test(yearInput.value)
    ? addHiddenClass(dateError)
    : removeHiddenClass(dateError);

  if (monthInput.value.length > 2) {
    monthInput.value = monthInput.value.slice(0, 2);
  }
  if (yearInput.value.length > 2) {
    yearInput.value = yearInput.value.slice(0, 2);
  }
};
const checkCvcInput = function () {
  /^\d*$/.test(cvcInput.value)
    ? addHiddenClass(cvcError)
    : removeHiddenClass(cvcError);

  if (cvcInput.value.length > 3) {
    cvcInput.value = cvcInput.value.slice(0, 3);
  }
};

const checkBlankInputs = function () {
  if (nameInput.value === "") {
    removeHiddenClass(blankName);
  } else if (!nameInput.value.includes(" ")) {
    removeHiddenClass(blankName);
    blankName.textContent = "Must include name and surname";
  } else addHiddenClass(blankName);
  if (numberInput.value === "") {
    removeHiddenClass(blankNumber);
    blankNumber.textContent = "Can't be blank";
  } else if (numberInput.value.length < 16 && numberInput.value.length > 0) {
    removeHiddenClass(blankNumber);
    blankNumber.textContent = "Must be 16 digits";
  } else {
    addHiddenClass(blankNumber);
  }
  if (monthInput.value === "") {
    removeHiddenClass(dateBlank);
  } else addHiddenClass(dateBlank);
  if (yearInput.value === "") {
    removeHiddenClass(dateBlank);
  } else addHiddenClass(dateBlank);
  if (cvcInput.value === "") {
    removeHiddenClass(cvcBlank);
  } else addHiddenClass(cvcBlank);
  if (cvcInput.value.length < 3 && cvcInput.value.length > 0) {
    removeHiddenClass(cvcBlank);
    cvcBlank.textContent = "Must be 3 digits";
  }

  if (
    (monthInput.value.length < 2 && monthInput.value.length > 0) ||
    (yearInput.value.length < 2 && yearInput.value.length > 0)
  ) {
    removeHiddenClass(dateBlank);
    dateBlank.textContent = "Must be 2 digits";
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

  cvcDigitsInput.length === 3 ? cvcInput.blur() : "";
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
