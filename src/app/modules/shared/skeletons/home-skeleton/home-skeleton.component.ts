import { Component } from '@angular/core';
import { SkeletonsService } from '../skeletons.service';

@Component({
  selector: 'app-home-skeleton',
  templateUrl: './home-skeleton.component.html',
  styles: []
})
export class HomeSkeletonComponent {
  isLoading$ = this.skeletonsService.homeLoading$

  constructor(private readonly skeletonsService : SkeletonsService) {}
}
