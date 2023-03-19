export class Game {
  public players: string[] = [];
  public stack: string[] = [];
  public playedCards: string[] = [];
  public currentPlayer: number = 1;

  constructor() {
    for (let i = 1; i < 14; i++) {
      this.stack.push('s' + i);
      this.stack.push('h' + i);
      this.stack.push('c' + i);
      this.stack.push('d' + i);
    }

    randomize(this.stack);
  }
}

function randomize(array: string[]) {
  let index = array.length,
    randomIndex;

  while (index != 0) {
    randomIndex = Math.floor(Math.random() * index);
    index--;

    [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
  }

  return array;
}
