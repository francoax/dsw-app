import { Component, ElementRef, OnInit } from '@angular/core';
import { PackageService } from '../services/package/package.service';
import Package from '../models/package';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private packageService: PackageService,
    private elementRef: ElementRef
  ) {}

  listaPaquetes: Package[] = [];

  carousel = this.elementRef.nativeElement.querySelector('.carousel');
  slides = this.elementRef.nativeElement.querySelectorAll('.carousel');
  prevButton = document.getElementById('prev');
  nextButton = document.getElementById('next');
  slide_translate = false;

  currentIndex = 0;

  ngOnInit(): void {
    this.packageService.getAll().subscribe((res) => {
      this.listaPaquetes = res.data;
      console.log(res.data);
    });
    this.showSlide(this.currentIndex);
  }

  showSlide(index: number) {
    if (index < 0) {
      this.currentIndex = this.slides.length - 1;
    } else if (index >= this.slides.length) {
      this.currentIndex = 0;
    }
  }

  prevSlide() {
    this.currentIndex--;
    this.showSlide(this.currentIndex);
  }

  nextSlide() {
    this.currentIndex++;
    this.showSlide(this.currentIndex);
  }

  goToReserve(){
    window.location.href = `/packages?packageId=652dd48c82681f59fdc830a3`;
  }
}
