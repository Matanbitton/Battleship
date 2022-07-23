export const Ship = (length, hit) => {
  const shipParts = new Array(length);

  const hitPos = (pos) => {
    shipParts[pos] = true;
  };

  const isSunk = () => {
    let shipPartsHit = shipParts.filter((part) => part === true);
    return shipPartsHit.length === length;
  };

  return {
    length,
    hitPos,
    shipParts,
    isSunk,
  };
};
