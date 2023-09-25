import { Component } from '@angular/core';
import { PropertyServiceService } from 'src/app/services/property-service.service';
import { Property } from 'src/app/models/property';
@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent {
  constructor(private service:PropertyServiceService){}

  properties:Property =[];

  loadProperties(){
    this.service.getProperties().subscribe((response: Property) => this.properties = response);
  }


}
