import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Car } from 'src/app/models/car';
import { MedicalAssistance } from 'src/app/models/medical-assistance';
import Package from 'src/app/models/package';
import { PropertyV2 } from 'src/app/models/property';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { Router } from '@angular/router';

interface PackageFull {
  id: string;
  type: string;
  car: Car;
  medicalAssist: MedicalAssistance;
  property: PropertyV2;
  nameImage: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: [
    './carousel.component.scss',
    '../../../../../node_modules/keen-slider/keen-slider.min.css',
  ],
})
export class CarouselComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() packageList: Package[] | undefined;
  packageFull: PackageFull[] = [];

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    if (this.packageList !== undefined) {
      this.packageList = this.packageList.filter((p) => p.type === 'completo');

      this.packageList.forEach((p) => {
        this.packageFull.push({
          id: p.id,
          type: p.type,
          car: p.car as unknown as Car,
          medicalAssist: p.medicalAssistance as unknown as MedicalAssistance,
          property: p.property as unknown as PropertyV2,
          nameImage: p.nameImage,
        });
      });
    }
  }

  goToReserve(id: string) {
    this.router.navigate(['packages', id]);
  }

  userLogged() {
    if (localStorage.getItem('loggedUser') !== null) {
      return true;
    } else {
      return false;
    }
  }

  @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLElement>;

  currentSlide = 0;
  dotHelper: Array<number> = [];
  slider!: KeenSliderInstance;

  ngAfterViewInit() {
    setTimeout(() => {
      this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        loop: true,
        initial: this.currentSlide,
        slideChanged: (s) => {
          this.currentSlide = s.track.details.rel;
        },
      });
      this.dotHelper = [
        ...Array(this.slider.track.details.slides.length).keys(),
      ];
    });
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy();
  }
}
