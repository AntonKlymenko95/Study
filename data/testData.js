export const newUser1 = {
    firstName: `Anton`,
    lastName: `Klymenko`,
    email: process.env.NEW_USER_1_EMAIL,
    phone: `380992156028`,
    password: process.env.NEW_USER_1_PASSWORD,
    city: 'Odesa',
    country: 'Ukraine',
    street: `Heroyv Krut 28`,
    zipCode: `65074`,
}

export const cardData = {
    cardNumber: process.env.CARD_NUMBER,
    cardDate: process.env.CARD_DATE,
    cardCVV: process.env.CARD_CVV
}