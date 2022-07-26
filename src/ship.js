export class Ship {
  constructor(length, id) {
    this.length = length;
    this.shipID = id;
    this.shipParts = this.createShip();
  }
  createShip() {
    let parts = [];
    let i = 0;
    while (i <= this.length) {
      parts.push({ hit: false });
      i++;
    }
    return parts;
  }

  hitPos = (pos) => {
    this.shipParts[pos] = { hit: true };
  };

  isSunk = () => {
    let shipPartsHit = this.shipParts.filter((part) => part.hit === true);
    return shipPartsHit.length === this.length;
  };
}
