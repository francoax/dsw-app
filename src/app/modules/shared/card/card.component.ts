import { Component, Input } from '@angular/core';
import { Property } from 'src/app/models/property';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() propertyInfo! : Property
}
