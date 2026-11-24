import {expect, test} from '@playwright/test';

import {newUser1} from '../data/testData';
import {cardData} from '../data/testData';

import {RegisterPage} from '../page-object/Register.page';
import {LoginPage} from '../page-object/Login.page';
import {CatalogPage} from '../page-object/Catalog.page';
import {CardPage} from '../page-object/Card.page';
import {CheckoutPage} from '../page-object/Checkout.page';
import {MyAccountPage} from '../page-object/MyAccount.page';

test.setTimeout(50 * 1000);
test('Creat user, login, order 2 items, payment', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const catalogPage = new CatalogPage(page);
    const checkoutPage = new CheckoutPage(page);
    const myAccountPage = new MyAccountPage(page);

    await registerPage.openLoginPage();
    await registerPage.fillRegistrationForm(newUser1);
    await loginPage.login(newUser1.email, newUser1.password);
    const items = await catalogPage.selectProduct();

    await expect(catalogPage.cardCount).toBeVisible();
    await expect(catalogPage.cardCount).toContainText(`2`, {timeout: 3000});
    await catalogPage.gotoCard();

    const cardPage = new CardPage(page);

//Check product details
    await expect(cardPage.firstProductItem).toHaveText (items.secondProduct.name);
    await expect(cardPage.secondProductItem).toHaveText (items.firstProduct.name);
    await expect(cardPage.firstProductPrice).toHaveText (items.secondProduct.price);
    await expect(cardPage.secondProductPrice).toHaveText (items.firstProduct.price);

    const firstProductPriceNumber = Number((await cardPage.firstProductPrice.innerText()).replace(/\D/g,''));
    const secondProductPriceNumber = Number((await cardPage.secondProductPrice.innerText()).replace(/\D/g,''));
    const totalNumber = parseInt((await cardPage.totalValue.innerText()).replace(/[^\d.]/g,''), 10);
    expect(totalNumber).toBe(firstProductPriceNumber + secondProductPriceNumber);
    await cardPage.checkTotalPrice();

    await checkoutPage.fillPaymentData(cardData.cardNumber, cardData.cardDate, cardData.cardCVV);

    await expect (checkoutPage.successOrder).toBeVisible({timeout: 8000});
    await expect (checkoutPage.page).toHaveURL('/checkout');

    await checkoutPage.myAccountButton.click();
    await expect (checkoutPage.page). toHaveURL ('/account');

    const totalPrice = Number (items.firstProduct.price.replace ('$', '')) + Number (items.secondProduct.price.replace ('$', ''))
    await expect(myAccountPage.totalAmountField) .toContainText (`$${totalPrice}`);

    await expect(myAccountPage.items.first()).toBeVisible ();
    await expect(myAccountPage.items.last()).toBeVisible ();
    await expect(myAccountPage.logoutButton).toBeEnabled();

    await myAccountPage.logout();
});