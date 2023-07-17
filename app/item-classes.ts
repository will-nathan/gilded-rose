

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
  
export class StandardItem extends Item {
    protected degradeSpeed=1
  
    updateQualitySellInOfItem(){
      this.updateQualityOfItemUnbounded()
      this.limitQuality0to50()
      this.updateSellIn()
    }
    protected updateQualityOfItemUnbounded() {
      this.updateQualityWithDegradeSpeed(this.returnDoubleIfDegraded())
  
    }
    protected updateSellIn() {
      this.sellIn-=1;
    }
  
    protected limitQuality0to50() {
      if (this.quality >50) {
        this.quality=50;
      } 
      if (this.quality < 0){
        this.quality=0;
      }
    
    }
    protected returnDoubleIfDegraded() {
      if (this.isOutOfDate()) {return 2*this.degradeSpeed;}
      return this.degradeSpeed
    }
    protected updateQualityWithDegradeSpeed(amountToDegrade) {this.quality-=amountToDegrade}
    protected isOutOfDate() {return (this.sellIn<=0)}
  }
export class ConjuredItem extends StandardItem {
    degradeSpeed=2; 
  }
  
export class LegendaryItem extends StandardItem {
    protected updateQualityOfItemUnbounded(){}
    protected updateSellIn(){}
    protected limitQuality0to50() {}
  }
  
export class BetterWithAgeItem extends StandardItem {
    updateQualityWithDegradeSpeed(amountToDegrade) {this.quality+=amountToDegrade}
  }
  
  
export class EventItem extends StandardItem {
    protected updateQualityOfItemUnbounded(){
      if (this.isOutOfDate()){
        this.quality=0;
        return
      }
      this.quality+=1;
      if (this.sellIn < 11) {
        this.quality+=1;
      }
      if (this.sellIn < 6) {
        this.quality+=1;
    }
    }
  }