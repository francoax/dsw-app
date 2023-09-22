import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  logInForm!: FormGroup;
  mail = new FormControl('');
  password = new FormControl('');

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.logInForm = new FormGroup({
      mail: this.mail,
      password: this.password,
    });
  }

  onSubmit() {
    console.log(this.logInForm.value);
    const { mail, password } = this.logInForm.value;
    this.userService.getUserByCredentials(mail, password).subscribe((res) => {
      console.log(res);
    });
  }
}
