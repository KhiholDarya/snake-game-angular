import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { NgxSnakeComponent, NgxSnakeModule } from 'ngx-snake';
import { FilterByEventTypePipe } from './pipes/filter/filter-by-event-type.pipe';
import { SortByTimestampPipe } from './pipes/sort/sort-by-timestamp-pipe';

export interface GameplayHistoryEntry {
  timestamp: Date;
  action: string;
}

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [
    NgxSnakeModule,
    CommonModule,
    FormsModule,
    FilterByEventTypePipe,
    SortByTimestampPipe,
  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css',
})
export class GamePageComponent {
  @Output() points = new EventEmitter<number>();
  @Output() statusGame = new EventEmitter<string>();
  @ViewChild('game', { static: true }) game: NgxSnakeComponent;
  @Input() status: string;
  calculatedPoints: number = 0;
  @Output() gameTime = new EventEmitter<number>();

  private startTime: number;
  public elapsedTime: number = 0;
  private timer: any;

  gameplayHistory: GameplayHistoryEntry[] = [];
  filterEventType: string = 'all';
  sortOrder: 'latest' | 'oldest' = 'latest';

  private addToGameplayHistory(action: string) {
    const timestamp = new Date();
    this.gameplayHistory.push({ timestamp, action });
  }

  public showGameplayHistory: boolean = false;
  public toggleGameplayHistoryVisibility(): void {
    console.log();
    this.showGameplayHistory = !this.showGameplayHistory;
  }

  startGame() {
    if (this.status === 'Paused' || this.status === 'Ready') {
      this.statusGame.emit('Started');
      this.game.actionStart();
      this.startTimer();
      this.gameTime.emit(this.elapsedTime);
      this.addToGameplayHistory('Game Started');
    }

    if (this.status === 'Ready') {
        this.startTime = Date.now();
        this.calculatedPoints = 0;
        this.points.emit(0);
        this.elapsedTime = 0;
        this.gameTime.emit(this.elapsedTime);
    }
  }

  stopGame() {
    if (this.status === 'Started') {
      const endTime = Date.now();
      const elapsedMilliseconds = endTime - this.startTime;
      this.gameTime.emit(this.elapsedTime);
      this.stopTimer();
      this.statusGame.emit('Paused');
      this.game.actionStop();
      this.addToGameplayHistory('Game Paused');
    }

  }
  resetGame() {
    this.calculatedPoints = 0;
    this.points.emit(this.calculatedPoints);
    this.game.actionReset();
    this.statusGame.emit('Ready');
    this.elapsedTime = 0;
    this.stopTimer();
    this.gameTime.emit(this.elapsedTime);
    if(this.status !== 'Ready' )
    this.addToGameplayHistory('Game Reset');
  }

  eat(event) {
    this.calculatedPoints = this.calculatedPoints + 10;
    this.points.emit(this.calculatedPoints);
    this.addToGameplayHistory('Food Eaten');
  }

  gameOver(event) {
    const endTime = Date.now();
    const elapsedMilliseconds = endTime - this.startTime;
    this.elapsedTime += elapsedMilliseconds;
    this.stopTimer();
    this.statusGame.emit('Game Over');
    this.addToGameplayHistory('Game Over');
  }

  private startTimer() {
    this.timer = setInterval(() => {
      if (this.status === 'Started') {
        this.elapsedTime += 1000; //
        this.gameTime.emit(this.elapsedTime);
      }
    }, 1000);
  }

  private stopTimer() {
    clearInterval(this.timer);
  }

}


