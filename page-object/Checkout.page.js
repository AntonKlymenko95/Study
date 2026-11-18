import {CardPage} from "./Card.page";

export class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.cardNumberField = page.getByPlaceholder('Card Number (16 digits)');
        this.payNowButton = page.getByText('Pay Now');
        this.payNowBtn = page.getByRole('button', { name: 'Pay Now' });
        this.cardDate = page.getByPlaceholder('MM/YY');
        this.cardCVV = page.getByPlaceholder('CVV (3 digits)');
    }

    async fillPaymentData() {
        await this.cardNumberField.type('1234567891234567', {delay: 1000});
        await this.cardNumberField.press('Enter');
        await this.cardDate.fill('01/12');
        await this.cardCVV.fill('123');
        await this.payNowBtn.click();
        this.page.pause();
    }
}