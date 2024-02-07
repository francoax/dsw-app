import { AfterViewInit, Component } from '@angular/core';
import { AppConfigService } from 'src/app/services/app/app.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements AfterViewInit {
  constructor(private readonly appService: AppConfigService) {}

  ngAfterViewInit(): void {
    this.appService.setDisplaySearchBar(false);
  }
}
