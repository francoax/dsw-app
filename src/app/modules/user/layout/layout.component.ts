import { AfterViewInit, Component } from '@angular/core';
import { AppConfigService } from 'src/app/services/app/app.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements AfterViewInit {

  constructor(private readonly appService : AppConfigService) {}

  ngAfterViewInit(): void {
    this.appService.setDisplaySearchBar(false)
  }
}
