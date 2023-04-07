import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-task-box',
  templateUrl: './task-box.component.html',
  styleUrls: ['./task-box.component.scss'],
})
export class TaskBoxComponent implements OnChanges {
  title: string = '';
  description: string = '';
  @Input() card!: string | undefined;

  cardAction = [
    {
      title: 'Waterfall',
      description:
        'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.',
    },
    { title: 'You', description: 'You decide who drinks' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    {
      title: 'Category',
      description:
        'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.',
    },
    {
      title: 'Bust a jive',
      description:
        'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one.',
    },
    { title: 'Woman', description: 'All woman drink.' },
    {
      title: 'Heaven',
      description: 'Put your hands up! The last player drinks!',
    },
    {
      title: 'Mate',
      description:
        'Pick a mate. Your mate must always drink when you drink and the other way around.',
    },
    {
      title: 'Thumbmaster',
      description:
        'When you put your thumb on the table everyone must follow and whomever is last must drink.',
    },
    { title: 'Men', description: 'All men drink.' },
    {
      title: 'Quizmaster',
      description:
        'Go around in a circle and you have to keep asking questions to each other. Doesn`t matter what the question is, as long as it`s a question. Whoever messes up and does not say a question, drinks.',
    },
    {
      title: 'Never have i ever...',
      description:
        'Say something you never did. Everyone who did it has to drink.',
    },
    {
      title: 'Rule',
      description:
        'Make a rule. Everyone needs to drink when breaking the rule.',
    },
  ];

  /**
   * checking card number of played card
   */
  ngOnChanges() {
    if (this.card) {
      let numberOfCard: number = Number(this.card.match(/\d+/g));
      this.setTaskContent(numberOfCard);
    }
  }

  /**
   * showing task content according number of played card
   * @param numberOfCard - number of played card
   */
  setTaskContent(numberOfCard: number) {
    if (numberOfCard > 0) {
      this.title = this.cardAction[numberOfCard - 1].title;
      this.description = this.cardAction[numberOfCard - 1].description;
    }
  }
}
