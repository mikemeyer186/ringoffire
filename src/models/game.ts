export class Game {
  public players: string[] = ['Mike', 'Oliver', 'Andreas', 'Sven'];
  public stack: string[] = [];
  public playedCards: string[] = [];
  public currentPlayer: number = 0;

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
