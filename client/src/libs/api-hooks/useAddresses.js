import {
  allAddresses,
  defaultAddress,
  updateAddress,
  unsetDefaultAddress,
  deleteAddress,
  createAddress,
} from 'libs/api/user'
import { useState, useEffect, useContext } from 'react'
import { extractAddresses } from 'libs/utils/extractors'
import { AppContext } from 'libs/context'

const useAddresses = () => {
  const [addresses, setAddresses] = useState([])

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { user, personalInfo } = useContext(AppContext)

  const { _id, accessToken } = user
  const { email } = personalInfo
  useEffect(() => {
    setError('')
    allAddresses(_id, accessToken).then(res => {
      if (!res.hasError) {
        setAddresses(extractAddresses(res.response.data))
      } else {
        // setError(res.response.error)
      }
    })
  }, [])

  const addAddress = ({
    firstname,
    lastname,
    address1,
    address2,
    city,
    country,
    zipCode,
    phone,
    isDefault,
  }) => {
    setError('')
    const cAddressPayLoad = {
      address1,
      address2: address2 || '',
      city,
      country,
      email,
      kind: 'shipping',
      name: {
        first: firstname,
        last: lastname,
      },
      phone: {
        number: phone,
      },
      state: '',
      zipCode,
    }

    createAddress(_id, cAddressPayLoad, accessToken).then(res => {
      if (!res.hasError) {
        setAddresses(extractAddresses(res.response.data.address))
        const addressId =
          res.response.data.address[res.response.data.address.length - 1]
        const addressRequired = addressId.id
        if (isDefault) {
          defaultAddress(_id, addressRequired, accessToken).then(res => {
            if (!res.hasError) {
              setAddresses(extractAddresses(res.response.data.address))
            } else {
              setError('Sorry! Something went wrong...')
            }
          })
        } else {
        }
      } else {
        setError('Sorry! Something went wrong...')
      }
    })
  }

  const removeAddress = id => {
    setError('')
    const confirm = window.confirm('Are you sure you wish to delete this item?')
    if (confirm) {
      deleteAddress(_id, id, accessToken).then(res => {
        if (!res.hasError) {
          setAddresses(extractAddresses(res.response.data.address))
        } else if (res.hasError) {
          setError('Sorry! Something went wrong...')
        }
      })
    }
  }

  const search = (nameKey, myArray) => {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].id === nameKey) {
        return myArray[i]
      }
    }
  }

  const editAddress = (
    {
      firstname,
      lastname,
      address1,
      address2,
      country,
      state,
      city,
      phone,
      zipCode,
      isDefault,
    },
    id,
  ) => {
    setError('')
    const editPayload = {
      address1,
      address2,
      city,
      country,
      email,
      kind: 'shipping',
      state: state,
      phone: { number: phone },
      name: {
        first: firstname,
        last: lastname,
      },
      zipCode,
    }
    updateAddress(_id, editPayload, id, accessToken).then(res => {
      if (!res.hasError) {
        setAddresses(extractAddresses(res.response.data.address))
        const resultObject = search(id, res.response.data.address)
        if (resultObject.isDefault === isDefault) {
          setSuccess('Address has been updated successfully...!')
        } else if (isDefault) {
          defaultAddress(_id, id, accessToken).then(res => {
            if (!res.hasError) {
              setSuccess('Address has been updated successfully...!')
              setAddresses(extractAddresses(res.response.data.address))
            } else if (res.hasError) {
              setError('Sorry! Something went wrong...')
            }
          })
        } else if (!isDefault) {
          unsetDefaultAddress(_id, id, accessToken).then(res => {
            if (!res.hasError) {
              setAddresses(extractAddresses(res.response.data.address))
              setSuccess('Address has been updated successfully...!')
            } else {
              setError('Sorry! Something went wrong...')
            }
          })
        } else {
          setSuccess('Address has been updated successfully...!')
        }
      } else {
        setError('Sorry! Something went wrong...')
      }
    })
  }

  return {
    addresses,
    error,
    success,
    addAddress,
    removeAddress,
    editAddress,
  }
}

export default useAddresses
