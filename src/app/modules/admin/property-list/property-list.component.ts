/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component } from '@angular/core';
import { PropertyServiceService } from 'src/app/services/property-service.service';
import { Property } from 'src/app/models/property';
import { OnInit } from '@angular/core';
import { PropertyType } from 'src/app/models/property-type';
@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
  constructor(private service:PropertyServiceService){}
  properties:Property[] =[];
  propertiesTypes:PropertyType[]=[];
  
  ngOnInit():void {
    this.service.getProperties().subscribe((response) => {this.properties = response.data
    });
    this.service.getPropertiesTypes().subscribe((response)=>{this.propertiesTypes = response.data});
  }

  
}
