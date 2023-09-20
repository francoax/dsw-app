import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() maxLength!: number;
  @Input() name!: string;

  inputControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(this.maxLength),
  ]);
}
