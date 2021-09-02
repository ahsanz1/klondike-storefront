import * as Yup from 'yup'

export const getUserInfo = user => user.name.first

export const getAllOrders = orders => {
  return orders?.response?.data?.orders || []
}

export const getTrackOrderData = order => {
  const data = [
    [
      {
        name: order.orderId,
        type: 'text',
        placeholder: 'Oder id',
      },
      {
        name: 'lastname',
        type: 'text',
        placeholder: 'Billing last date',
      },
    ],
    [
      {
        name: 'order-by',
        type: 'text',
        placeholder: 'Find oder by',
      },
      {
        name: 'email',
        type: 'email',
        placeholder: 'Email Address',
        validate: Yup.string().email('Invalid email'),
      },
    ],
  ]

  return data
}
