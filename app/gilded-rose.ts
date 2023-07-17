
import {Item, StandardItem, ConjuredItem, BetterWithAgeItem, LegendaryItem, EventItem} from './item-classes';

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items=items.map((item) => this.sortItemsToChildClasses(item));
  }

  private sortItemsToChildClasses({name, sellIn, quality}: Item){
    switch(name) {
      case "Conjured Mana Cake" : {return new ConjuredItem(name,sellIn,quality)};
      case "Aged Brie" : {return new BetterWithAgeItem(name,sellIn,quality)};
      case "Sulfuras, Hand of Ragnaros" : {return new LegendaryItem(name,sellIn,quality)};
      case "Backstage passes to a TAFKAL80ETC concert" : {return new EventItem(name,sellIn,quality)};
      default: {return new StandardItem(name,sellIn,quality)};
    }
  }
  updateQuality() {
    (this.items as Array<StandardItem>).forEach(item => {item.updateQualitySellInOfItem()});
    return this.items;
  }

  logItems() {console.log(this.items)}
}
