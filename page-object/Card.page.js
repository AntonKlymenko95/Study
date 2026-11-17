import {expect} from "@playwright/test";

export class CardPage {
    constructor(page,tabletNameValue,coffeMachineNameValue,tabletPriceValue, coffeMachinePriceValue ) {
        this.page = page;
        this.firstProductItem = page.locator (`[id="cart-item-name-6"]`)
        this.secondProductItem = page.locator (`[id="cart-item-name-5"]`)

        this.firstProductPrice = page.locator (`[id="cart-item-price-6"]`)
        this.secondProductPrice = page.locator (`[id="cart-item-price-5"]`)

        this.totalValue = page.locator (`[id="cart-total"]`)
        this.checkoutButton = page.locator (`[id="cart-checkout-button"]`)

        this.removeFirstItemButton = page.locator (`[id="cart-item-decrease-6"]`)
        this.addFirstItemButton = page.locator (`[id="cart-item-increase-6"]`)

        this.tabletNameValue = tabletNameValue;
        this.coffeMachineNameValue = coffeMachineNameValue;
        this.tabletPriceValue = tabletPriceValue;
        this.coffeMachinePriceValue = coffeMachinePriceValue;
    }
    async compareProductDetails(product) {
        await expect(this.firstProductItem).toHaveText (this.coffeMachineNameValue);
        await expect(this.secondProductItem).toHaveText (this.tabletNameValue);
        await expect(this.firstProductPrice).toHaveText (this.coffeMachinePriceValue);
        await expect(this.secondProductPrice).toHaveText (this.tabletPriceValue);

    }

    async checkTotalPrice() {
        const firstProductPriceNumber = Number((await this.firstProductPrice.innerText()).replace(/\D/g,''));
        const secondProductPriceNumber = Number((await this.secondProductPrice.innerText()).replace(/\D/g,''));
        const totalNumber = parseInt((await this.totalValue.innerText()).replace(/[^\d.]/g,''), 10);
        expect(totalNumber).toBe(firstProductPriceNumber + secondProductPriceNumber);
        await this.checkoutButton.click ();
        await this.page.waitForURL(`https://aqa-app.vercel.app/checkout`);
        }
}