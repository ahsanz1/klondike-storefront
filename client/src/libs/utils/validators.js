import isEmail from 'validator/lib/isEmail'
import isMobilePhone from 'validator/lib/isMobilePhone'
import isCreditCard from 'validator/lib/isCreditCard'

const errorMessages = {
  isRequired: 'Please complete this required field.',
  isEmail: 'Please enter a valid email address.',
  isPhoneNo: 'Please enter a valid phone number',
  isCreditCardNo: 'Enter a valid card number',
  isPassword: 'Please enter minimum length 6 characters',
}

export const validators = {
  isRequired: value => {
    if (value && value.length > 0) {
      return {
        status: true,
      }
    } else {
      return {
        status: false,
        errorMessage: errorMessages.isRequired,
      }
    }
  },
  isEmail: value => {
    if (value && value.length > 0) {
      if (isEmail(value)) {
        return {
          status: true,
        }
      } else {
        return {
          status: false,
          errorMessage: errorMessages.isEmail,
        }
      }
    } else {
      return {
        status: true,
      }
    }
  },
  isPhoneNo: value => {
    if (value && value.length > 0) {
      if (isMobilePhone(value)) {
        return {
          status: true,
        }
      } else {
        return {
          status: false,
          errorMessage: errorMessages.isPhoneNo,
        }
      }
    } else {
      return {
        status: true,
      }
    }
  },

  isPassword: value => {
    if (value && value.length > 0) {
      if (value.length > 5) {
        return {
          status: true,
        }
      } else {
        return {
          status: false,
          errorMessage: errorMessages.isPassword,
        }
      }
    } else {
      return {
        status: true,
      }
    }
  },

  isCreditCardNo: value => {
    if (value && value.length > 0) {
      if (isCreditCard(value)) {
        return {
          status: true,
        }
      } else {
        return {
          status: false,
          errorMessage: errorMessages.isCreditCardNo,
        }
      }
    } else {
      return {
        status: false,
        errorMessage: errorMessages.isCreditCardNo,
      }
    }
  },
}
