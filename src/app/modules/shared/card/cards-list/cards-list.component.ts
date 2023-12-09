import { Component, Input } from '@angular/core';
import { PropertyV2 } from 'src/app/models/property';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent {
  @Input() propertiesList! : PropertyV2[]
}
