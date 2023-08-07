import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName,
} from "@microsoft/sp-application-base";

import { sp } from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";

import ReactHeader from "./ReactHeader";
import ReactFooter from "./ReactFooter";

export interface IAugustBioExtensionApplicationCustomizerProperties {
  testMessage: string;
}

export default class AugustBioExtensionApplicationCustomizer extends BaseApplicationCustomizer<IAugustBioExtensionApplicationCustomizerProperties> {
  public onInit(): Promise<void> {
    return super.onInit().then(() => {
      sp.setup({
        spfxContext: this.context,
      });
      this.getListItems();
    });
  }

  async getListItems() {
    const currentPageURL: string = window.location.href;
    await sp.web.lists
      .getByTitle("ExtensionConfig")
      .items.get()
      .then((_items: any[]) => {
        let filteredItems = _items.filter(
          (_item) => _item.URL && currentPageURL.includes(_item.URL)
        );

        if (filteredItems.length > 0) {
          let topPlaceholder: PlaceholderContent =
            this.context.placeholderProvider.tryCreateContent(
              PlaceholderName.Top
            );
          let bottomPlaceholder: PlaceholderContent =
            this.context.placeholderProvider.tryCreateContent(
              PlaceholderName.Bottom
            );

          if (filteredItems[0].Header && topPlaceholder) {
            document.querySelector('[class*="headerRow"]')["style"].display =
              "none";
            document.querySelector('[id="spCommandBar"]')["style"].display =
              "none";
            const topElem = React.createElement(ReactHeader);
            ReactDOM.render(topElem, topPlaceholder.domElement);
          }

          // if (filteredItems[0].Footer && bottomPlaceholder) {
          //   const botElem = React.createElement(ReactFooter);
          //   ReactDOM.render(botElem, bottomPlaceholder.domElement);
          // }
        }

        return Promise.resolve();
      });
  }
}
