export class Game {
  public players: string[] = [];
  public stack: string[] = [];
  public playedCards: string[] = [];
  public currentPlayer: number = 1;
  public gameDate: Date = new Date();
  public pickCardAnimation: Boolean = false;
  public currentCard: string | undefined = '';

  constructor() {
    for (let i = 1; i < 14; i++) {
      this.stack.push('s' + i);
      this.stack.push('h' + i);
      this.stack.push('c' + i);
      this.stack.push('d' + i);
    }

    randomize(this.stack);
  }

  public toJson() {
    return {
      players: this.players,
      stack: this.stack,
      playedCards: this.playedCards,
      currentPlayer: this.currentPlayer,
      gameDate:
        this.gameDate.toLocaleDateString() +
        ' ' +
        this.gameDate.toLocaleTimeString(),
      pickCardAnimation: this.pickCardAnimation,
      currentCard: this.currentCard,
    };
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
