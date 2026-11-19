import {expect} from "@playwright/test";

export class MyAccountPage {
    constructor(page) {
        this.page = page;

        this.items = page.locator ('#account-order-0 ul > li');
        this.totalAmountField = page.locator ('#account-order-0 p' , {hasText: 'Total Amount:'});
    }
    async checkFinalOrder(firstItemPrice, lastItemPrice) {
        const totalPrice = Number (firstItemPrice.replace ('$', '')) + Number (lastItemPrice.replace ('$', ''))
        console.log(`Total Price`);
        await expect(this.totalAmountField) .toContainText (`$${totalPrice}`);
        await this.page.pause();
    }
}

