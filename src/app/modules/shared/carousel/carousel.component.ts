import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { MedicalAssistance } from 'src/app/models/medical-assistance';
import Package from 'src/app/models/package';
import { Property } from 'src/app/models/property';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit{
 
  @Input() packageList: Package[] | undefined;
  @Input() propertyList: Property[] | undefined;
  @Input() carList: Car[] | undefined;
  @Input() asistMedList: MedicalAssistance[] | undefined;

  ngOnInit(): void {
    console.log(this.packageList);
  }

  getPropertyAddress(id: string): string{
    if(this.propertyList !== undefined){
      const property = this.propertyList.find(p => p._id === id);
      return property ? property.address : '';
    }
    return '';
  }  

  getAssistMed(id: string): string{
    if(this.asistMedList !== undefined){
      const asistMed = this.asistMedList.find(a => a._id === id);
      return asistMed ? asistMed.description + " " + asistMed.coverageType : '';
    }
    return '';
  }

  getCar(id: string): string{
    if(this.carList !== undefined){
      const car = this.carList.find(c => c.id === id);
      return car ? car.brand + " " + car.model : '';
    }
    return '';
  }

  goToReserve(id:string){
    window.location.href = `/packages?packageId=${id}`;      
  }

  userLogged(){
    if(localStorage.getItem('loggedUser') !== null ){
      return true
    }else{
      return false
    }
  }
}
