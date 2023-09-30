/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, EventEmitter, Output } from '@angular/core';
import { PropertyServiceService } from 'src/app/services/property-service.service';
import { Property } from 'src/app/models/property';
import { OnInit } from '@angular/core';
import { PropertyType } from 'src/app/models/property-type';
import { Router} from '@angular/router';
@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
  constructor(private service:PropertyServiceService, private router:Router){}
  properties:Property[] =[];
  propertiesTypes:PropertyType[]=[];

  @Output() UpdateEvent = new EventEmitter<Property>();
  @Output() DeleteEvent = new EventEmitter<string>();


  ngOnInit():void {
    this.service.getProperties().subscribe((response) => {this.properties = response.data
    });
  }

  onUpdate(prop : Property) : void {
    this.UpdateEvent.emit(prop);
  }

  onDelete(id : string) : void {
    this.DeleteEvent.emit(id);
  }

  nav(){
    this.router.navigate(['CreateProperty']);
  }
}
