import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PropertyServiceService } from 'src/app/services/property-service.service';
/*import { Property } from 'src/app/models/property';*/
@Component({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.scss']
})
export class CreatePropertyComponent {
  constructor(private service:PropertyServiceService){}
  propertyForm = new FormGroup ({
    capacity : new FormControl(''),
    address : new FormControl(''),
    pricePerNight: new FormGroup({
      price: new FormControl(''),
      date: new FormControl(''),}),
    propertyType: new FormControl(''),
  });

  onSubmit(){
    /*this.service.createProperty(this.propertyForm.value);*/
  }
  /*
  onSubmit(){
    console.log(this.propertyForm.value);
  }
  */

}
