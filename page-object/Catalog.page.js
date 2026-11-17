import {newUser1} from "../data/testData";
import {expect} from "@playwright/test";
export class CatalogPage {
    constructor(page) {
        this.page = page;
        this.coffeMachineProduct = page.locator(`[id="product-add-6"]`);
        this.tabletProduct = page.locator(`[id="product-add-5"]`);
        this.cardCount = page.locator(`[id="cart-count"]`);

        this.tabletName = page.locator(`[id="product-name-5"]`);
        this.coffeMachineName = page.locator(`[id="product-name-6"]`);

        this.tabletPrice = page.locator(`[id="product-price-5"]`);
        this.coffeMachinePrice = page.locator(`[id="product-price-6"]`);

        this.tabletNameValue = ``;
        this.coffeMachineNameValue = ``;
        this.tabletPriceValue = ``;
        this.coffeMachinePriceValue = ``;
    }

    async selectProduct() {
        await this.coffeMachineProduct.click({delay: 2000});
        await this.tabletProduct.click({delay: 2000});
        await this.page.waitForLoadState(`networkidle`);
        await this.cardCount.waitFor();
        await expect(this.cardCount).toBeVisible();
        await expect(this.cardCount).toContainText(`2`, {timeout: 3000});
        await this.saveProductinfo();
        await this.cardCount.click();
    }

    async saveProductinfo() {
        this.tabletNameValue = await this.tabletName.innerText();
        this.tabletPriceValue = await this.tabletPrice.innerText();
        this.coffeMachineNameValue = await this.coffeMachineName.innerText();
        this.coffeMachinePriceValue = await this.coffeMachinePrice.innerText();

    }
}