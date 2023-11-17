import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Car } from 'src/app/models/car';
import { MedicalAssistance } from 'src/app/models/medical-assistance';
import Package from 'src/app/models/package';
import { Property } from 'src/app/models/property';
import KeenSlider, { KeenSliderInstance } from "keen-slider"

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss','../../../../../node_modules/keen-slider/keen-slider.min.css']
})
export class CarouselComponent implements OnInit, AfterViewInit, OnDestroy{
 
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

  @ViewChild("sliderRef") sliderRef!: ElementRef<HTMLElement>

  currentSlide = 1;
  dotHelper: Array<number> = [];
  slider: KeenSliderInstance | null = null;

  ngAfterViewInit() {
    setTimeout(() => {
      this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        initial: this.currentSlide,
        slideChanged: (s) => {
          this.currentSlide = s.track.details.rel
        },
      })
      this.dotHelper = [
        ...Array(this.slider.track.details.slides.length).keys(),
      ]
    })
  }

  ngOnDestroy(): void {
    if (this.slider) {
      this.slider.destroy();
    }
    if (this.slider) this.slider.destroy()
  }
}
