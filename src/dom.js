export function domElements() {
  function createGrids(player) {
    let container;
    if (player.type === "player") {
      container = createHtmlElement("div", "container-player");
    } else {
      container = createHtmlElement("div", "container-bot");
    }

    player.board.grid.forEach((row, indexX) => {
      let divRow = createHtmlElement("div", "row");
      container.append(divRow);
      row.forEach((col, indexY) => {
        let cell = createHtmlElement("div", "cell");
        changeShipToHitEl(cell, "click", player, indexX, indexY);
        if (player.board.grid[indexX][indexY].ship !== undefined) {
          cell.dataset.square = "ship";
        } else {
          cell.dataset.square = "water";
        }

        divRow.append(cell);
      });
    });
    return container;
  }

  function createHtmlElement(element, elementClass, data, text) {
    const el = document.createElement(element);
    if (elementClass) el.className = elementClass;
    if (text) el.innerText = text;
    if (data) el.dataset.title = data;

    return el;
  }
  function changeShipToHitEl(element, event, player, indexX, indexY) {
    element.addEventListener(event, (e) => {
      if (e.target.dataset["square"] == "ship" && !e.target.dataset.hit) {
        e.target.dataset.hit = "hit";
      }
      if (e.target.dataset.hit === "hit") {
        player.board.receiveAttack(indexX, indexY);
      }
      console.log(player.board.grid);
    });
  }

  return {
    createGrids,
  };
}
