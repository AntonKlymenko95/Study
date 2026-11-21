import { test } from '@playwright/test';

import {newUser1} from '../data/testData';
import {cardData} from '../data/testData';

import {RegisterPage} from '../page-object/Register.page';
import {LoginPage} from '../page-object/Login.page';
import {CatalogPage} from '../page-object/Catalog.page';
import {CardPage} from '../page-object/Card.page';
import {CheckoutPage} from '../page-object/Checkout.page';
import {MyAccountPage} from '../page-object/MyAccount.page';

test.setTimeout(50 * 1000);
test('test', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const catalogPage = new CatalogPage(page);
    const checkoutPage = new CheckoutPage(page);
    const myAccountPage = new MyAccountPage(page);

    await registerPage.navigate();
    await registerPage.fillRegistrationForm(newUser1);
    await loginPage.login(newUser1.email, newUser1.password);
    await catalogPage.selectProduct();

    const cardPage = new CardPage(page, catalogPage.tabletNameValue, catalogPage.coffeMachineNameValue,catalogPage.tabletPriceValue,catalogPage.coffeMachinePriceValue);
    await cardPage.compareProductDetails();
    await cardPage.checkTotalPrice();

    await checkoutPage.fillPaymentData(cardData.cardNumber, cardData.cardDate, cardData.cardCVV);
    await checkoutPage.successOrderMessage();
    await checkoutPage.goToMyAccount();

    await myAccountPage.checkFinalOrder(catalogPage.tabletPriceValue, catalogPage.coffeMachinePriceValue);
    await myAccountPage.checkTwoItems();
    await myAccountPage.logout();
});