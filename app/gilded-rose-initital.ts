export class Item {
    name: string;
    sellIn: number;
    quality: number;
  
    constructor(name, sellIn, quality) {
      this.name = name;
      this.sellIn = sellIn;
      this.quality = quality;
    }
  }
  
  
  export class GildedRose {
    items: Array<Item>;
  
    constructor(items = [] as Array<Item>) {
      this.items=items;
      for (let i = 0; i < items.length; i++) {
        this.items=items;
      }
    }
  
    limitQuality0to50(quality : number) {
      if (quality >50) {
        return 50
      } 
      if (quality < 0){
        return 0
      }
      return quality
    }
    updateQualityStandardorConjured(item:Item, pastSellIn:boolean,isConjured:boolean) {
      let degradeSpeed=1;
      if (isConjured) {degradeSpeed=2}
      if (pastSellIn){degradeSpeed=2*degradeSpeed;}
      item.quality-=degradeSpeed;
      item.quality=this.limitQuality0to50(item.quality);
    }
    updateQualityBackstage(item:Item, pastSellIn:boolean){
      if (pastSellIn){
        item.quality=0;
        return
      }
      item.quality+=1;
      if (item.sellIn < 11) {
        item.quality+=1;
      }
      if (item.sellIn < 6) {
        item.quality+=1;
    }
    item.quality=this.limitQuality0to50(item.quality);
    }
    updateQualityAgedBrie(item:Item, pastSellIn:boolean) {
        let degradeSpeed=1;
        if (pastSellIn){degradeSpeed=2;}
        item.quality+=degradeSpeed;
        item.quality=this.limitQuality0to50(item.quality);
    }
    updateSellIn(item:Item) {
      item.sellIn-=1;
    }
    isOutOfDate(item:Item) {
      if (item.sellIn <=0) {
        return true
      }
      else {
        return false
      }
    }
    processItem(item : Item) {
      let pastSellIn = this.isOutOfDate(item);
      if (item.name === 'Sulfuras, Hand of Ragnaros'){
        return
      }
      if (item.name === 'Aged Brie') {
        this.updateQualityAgedBrie(item, pastSellIn);
        this.updateSellIn(item)
        return
      }
      if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
        this.updateQualityBackstage(item, pastSellIn);
        this.updateSellIn(item)
        return
      }
      if (item.name === "Conjured Mana Cake") {
        this.updateQualityStandardorConjured(item, pastSellIn,true);
        this.updateSellIn(item)
        return
      }
      this.updateQualityStandardorConjured(item, pastSellIn,false);
      this.updateSellIn(item)
    }
    
  
    updateQuality() {
      for (let i = 0; i < this.items.length; i++) {this.processItem(this.items[i]);}
      return this.items;
    }
  
    logItems() {
      console.log(this.items)
    }
  }
  
  const items = [
    new Item("+5 Dexterity Vest", 10, 20), //
    new Item("Aged Brie", 2, 0), //
    new Item("Elixir of the Mongoose", 5, 7), //
    new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
    new Item("Sulfuras, Hand of Ragnaros", -1, 80),
    new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
    new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),];
  
  
  const gildedRose = new GildedRose(items);
  gildedRose.updateQuality()