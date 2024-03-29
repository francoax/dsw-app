import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() content!: string; //texto que va adentro del botton
  @Input() classType!: string; //tipo del boton, puede ser primary, cancel o navbar
  @Input() type!: string;
  @Input() routerlink!: string; //navega hacia la ruta
}
