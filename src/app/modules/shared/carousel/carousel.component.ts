import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import Package from 'src/app/models/package';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: [
    './carousel.component.scss',
    '../../../../../node_modules/keen-slider/keen-slider.min.css',
  ],
})
export class CarouselComponent implements AfterViewInit, OnDestroy {
  @Input() packageList: Package[] = [];

  constructor(private readonly router: Router) {}

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
