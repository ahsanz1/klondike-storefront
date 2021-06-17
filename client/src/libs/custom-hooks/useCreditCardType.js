import { useContext } from 'react'
import creditCardType from 'credit-card-type'
import { AppContext } from 'libs/context'

const useCreditCardType = () => {
  const { paymentInfo } = useContext(AppContext)
  const checkCreditCardType = async () => {
    let cardType = creditCardType(paymentInfo.cardNumber)
    cardType =
      (cardType &&
        Array.isArray(cardType) &&
        cardType.length > 0 &&
        cardType[0].niceType) ||
      'CARD'
    const cardDetails = {
      paymentMethod: cardType.length < 3 ? `${cardType}_CARD` : cardType,
      cardIdentifier: paymentInfo.cardNumber.slice(-4),
      paymentType: 'CARD',
      cardNumber: paymentInfo.cardNumber,
      expDate: paymentInfo.cardExpiryDate,
      cvv: paymentInfo.cardCode,
      cardHolderFullName: paymentInfo.cardName,
    }
    return cardDetails
  }
  return { checkCreditCardType }
}

export default useCreditCardType
