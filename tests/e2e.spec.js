import { test } from '@playwright/test';
import {RegisterPage} from '../page-object/Register.page';
import {LoginPage} from '../page-object/Login.page';
import {CatalogPage} from '../page-object/Catalog.page';
import {newUser1} from '../data/testData';
import {CardPage} from '../page-object/Card.page';



test('test', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const catalogPage = new CatalogPage(page);

    await registerPage.navigate();
    await registerPage.fillRegistrationForm(newUser1);
    await loginPage.login(newUser1.email, newUser1.password);
    await catalogPage.selectProduct();

    const cardPage = new CardPage(page, catalogPage.tabletNameValue, catalogPage.coffeMachineNameValue,catalogPage.tabletPriceValue,catalogPage.coffeMachinePriceValue);
    await cardPage.compareProductDetails();
    await cardPage.checkTotalPrice();

});