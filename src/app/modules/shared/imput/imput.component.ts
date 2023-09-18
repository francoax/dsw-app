import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-imput',
  templateUrl: './imput.component.html',
  styleUrls: ['./imput.component.scss']
})
export class ImputComponent {
  @Input() maxLength!:number;
  @Input() name!:String;
  imputControl = new FormControl('',[Validators.required,Validators.maxLength(10)]);
  
}
