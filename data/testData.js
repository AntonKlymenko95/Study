import {faker} from '@faker-js/faker'

export const newUser1 = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: `380992156028`,
    password: faker.internet.password(),
    city: faker.location.city(),
    country: 'Ukraine',
    street: faker.location.streetAddress(),
    zipCode: `65074`,
}

export const cardData = {
    cardNumber: process.env.CARD_NUMBER,
    cardDate: process.env.CARD_DATE,
    cardCVV: faker.finance.creditCardCVV()
}

export const APIDataPost = {
    title: 'Hello World',
    body: 'Test body',
    userId: 1,
}

export const APIDataPathc = {
    title: 'Hello AQA',

}