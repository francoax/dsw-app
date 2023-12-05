import { Component, Input } from '@angular/core';
import { Property } from 'src/app/models/property';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent {
  @Input() propertiesList! : Property[]
}
