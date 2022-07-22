function Ship(length, hit, sunk) {
  return {
    ship: new new Array(length)(),
    length,
    hit,
    sunk,
    hit(number) {
      this.hit[number] = true;
    },
    isSunk() {
      let shipPartsHit = this.hit.filter((part) => part == true);
      return shipPartsHit.length == length;
    },
  };
}
