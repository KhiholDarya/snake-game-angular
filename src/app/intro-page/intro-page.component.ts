import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';

interface FormData {
  name: string;
  email: string;
  status: boolean;
}

@Component({
  selector: 'app-intro-page',
  standalone: true,
  imports: [
    AppComponent,
    FormsModule,
    CommonModule
  ],
  templateUrl: './intro-page.component.html',
  styleUrl: './intro-page.component.css'
})
export class IntroPageComponent {

  public name = '';
  public email = '';
  public userInfo: FormData;

  @Output()
  public userIsLogged = new EventEmitter<object>();

  public onStartClicked(form: FormData) {
    this.userInfo = form;
    this.userIsLogged.emit(this.userInfo);
    }
}
