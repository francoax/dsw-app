import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() type = 'text';
  @Input() label! : string;
  @Input() placeholder! : string;
  @Input() required = false;
  @Input() inputControl! : FormControl;
}
