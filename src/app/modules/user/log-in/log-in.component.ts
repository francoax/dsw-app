import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  logInForm!: FormGroup;
  mail = new FormControl('');
  password = new FormControl('');
  responseError = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.logInForm = new FormGroup({
      mail: this.mail,
      password: this.password,
    });
  }

  onSubmit() {
    const { mail, password } = this.logInForm.value;
    this.userService.getUserByCredentials(mail, password).subscribe({
      next: (res) => {
        window.localStorage.setItem('loggedUser', JSON.stringify(res.data));
        window.location.reload();
      },
      error: (err) => {
        if (err.status === 0) {
          this.responseError = 'Unable to connect to server';
        } else {
          this.responseError = err.error.message;
        }
      },
    });
  }
}
