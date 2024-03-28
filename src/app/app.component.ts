import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSnakeModule } from 'ngx-snake';
import { IntroPageComponent } from './intro-page/intro-page.component';
import { GamePageComponent } from './game-page/game-page.component';

interface UserInfo {
  name: string;
  emaiil: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NgxSnakeModule,
    IntroPageComponent,
    GamePageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public loginStatus = false;

  time: string = '00:00';
  score: number = 0;
  gameStatus = 'Log out';
  name = '';

  getTime(elapsedTime: number) {
    this.time = this.formatTime(elapsedTime);
  }

  public onGamePage(user: UserInfo) {
    this.loginStatus = true;
    // this.history.push(user);
    this.name = user.name;
    this.gameStatus = 'Ready';
  }
  public onLogOut() {
    this.loginStatus = false;
    this.time = '00:00';
    this.score = 0;
    this.gameStatus = 'Log out';
  }
  handleGameStatus(status: string) {
    this.gameStatus = status;
  }

  handlePoints(points: number) {
    this.score = points;
  }

  private formatTime(milliseconds: number): string {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedTime = `${this.pad(minutes)}:${this.pad(remainingSeconds)}`;
    return formattedTime;
  }

  private pad(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }

}

