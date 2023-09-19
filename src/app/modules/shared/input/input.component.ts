import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() maxLength!:number;
  @Input() name!:String;
  inputControl = new FormControl('',[Validators.required,Validators.maxLength(10)]);
}
