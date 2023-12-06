import { Component } from '@angular/core';
import { SkeletonsService } from 'src/app/services/skeletons/skeletons.service';

@Component({
  selector: 'app-reserve-skeleton',
  templateUrl: './reserve-skeleton.component.html',
  styleUrls: ['./reserve-skeleton.component.scss']
})
export class ReserveSkeletonComponent {
  isLoading$ = this.skeletonService.reserveLoading$

  constructor(private readonly skeletonService : SkeletonsService) {}
}
