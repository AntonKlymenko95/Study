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
    const cardPage = new CardPage(page);
    let items;

    await test.step('Open login page', async () => {
        await registerPage.openLoginPage();
    })

    await test.step('Register nwe user', async () => {
        await registerPage.fillRegistrationForm(newUser1);
    })

    await test.step('Login with created user', async () => {
        await loginPage.login(newUser1.email, newUser1.password);
    })

    await test.step('Select 2 items', async () => {
        items = await catalogPage.selectProduct();
    })

    await test.step('Verify card counter(visibke, qty)', async () => {
        await expect(catalogPage.cardCount).toBeVisible();
        await expect(catalogPage.cardCount).toContainText(`2`, {timeout: 3000});
    })
    await test.step('Go to card', async () => {
    await catalogPage.gotoCard();
    })

    await test.step('Verify products details in card', async () => {
        //Check product details
        await expect(cardPage.firstProductItem).toHaveText (items.secondProduct.name);
        await expect(cardPage.secondProductItem).toHaveText (items.firstProduct.name);
        await expect(cardPage.firstProductPrice).toHaveText (items.secondProduct.price);
        await expect(cardPage.secondProductPrice).toHaveText (items.firstProduct.price);
    })

    await test.step('Verify total price', async () => {
        const firstProductPriceNumber = Number((await cardPage.firstProductPrice.innerText()).replace(/\D/g,''));
        const secondProductPriceNumber = Number((await cardPage.secondProductPrice.innerText()).replace(/\D/g,''));
        const totalNumber = parseInt((await cardPage.totalValue.innerText()).replace(/[^\d.]/g,''), 10);
        expect(totalNumber).toBe(firstProductPriceNumber + secondProductPriceNumber);
    })

    await test.step('Go To CheckoutPage', async () => {
        await cardPage.goToCheckoutPage();
    })

    await test.step('Fill payment data and submit payment', async () => {
        await checkoutPage.fillPaymentData(cardData.cardNumber, cardData.cardDate, cardData.cardCVV);
    })

    await test.step('Verify successful order', async () => {
        await expect (checkoutPage.successOrder).toBeVisible({timeout: 8000});
        await expect (checkoutPage.page).toHaveURL('/checkout');
    })

    await test.step('Go to my account page', async () => {
        await checkoutPage.myAccountButton.click();
        await expect (checkoutPage.page). toHaveURL ('/account');
    })

    await test.step('Verify total amount in my account page', async () => {
        const totalPrice = Number (items.firstProduct.price.replace ('$', '')) + Number (items.secondProduct.price.replace ('$', ''))
        await expect(myAccountPage.totalAmountField) .toContainText (`$${totalPrice}`);
    })

    await test.step('Verify items list', async () => {
        await expect(myAccountPage.items.first()).toBeVisible ();
        await expect(myAccountPage.items.last()).toBeVisible ();
        await expect(myAccountPage.logoutButton).toBeEnabled();
    })

    await test.step('Logout', async () => {
        await myAccountPage.logout();
    })
});