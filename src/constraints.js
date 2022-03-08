/* eslint-disable no-useless-escape */
export const signInConstraints = {
  from: {
    email: {
      message: '^Not a valid email',
    },
  },
  confirmEmail: {
    equality: 'email',
  },
  confirmPassword: {
    equality: 'password',
  },
};

export const demographicFormConstraints = {
  firstName: {
    presence: {
      allowEmpty: false,
      message: '^Please enter your first name',
    },
    type: 'string',
  },
  lastName: {
    presence: {
      allowEmpty: false,
      message: '^Please enter your last name',
    },
    type: 'string',
  },
  gender: {
    presence: {
      allowEmpty: false,
      message: '^Please select your gender',
    },
    inclusion: {
      within: ['M', 'F', 'NB', 'O'],
      message: '^Invalid value %{value}',
    },
  },
  dob: {
    presence: {
      allowEmpty: false,
      message: '^Birthdate is required',
    },
    datetime: {
      dateOnly: true,
    },
    format: {
      pattern: '^(0?[1-9]|1[0-2])\\/(0?[1-9]|[12][0-9]|3[01])$',
      message: '^Invalid format, please enter MM/DD',
    },
  },
  address: {
    presence: {
      allowEmpty: false,
      message: '^Address is required',
    },
  },
  city: {
    presence: {
      allowEmpty: false,
      message: '^City is required',
    },
    type: 'string',
  },
  state: {
    presence: {
      allowEmpty: false,
      message: '^State is required',
    },
  },
  country: {
    presence: {
      allowEmpty: false,
      message: '^Country is required',
    },
  },
  zipCode: {
    format: {
      pattern: '^\\d{5}(?:[-\\s]\\d{4})?$',
      message: '^Zip code is invalid',
    },
    length: {
      minimum: 5,
      message: '^Zip code must be at least 5 characters',
    },
    presence: {
      allowEmpty: false,
      message: '^Zip code is required',
    },
  },
  phoneNumber: {
    format: {
      pattern: '^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$',
      message: '^Invalid phone number',
    },
    length: {
      minimum: 10,
      message: '^Phone number must have at least 10 digits',
    },
  },
};
