import { Component, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/services/app/app.service';

type Path = {
  name : string,
  path : string
}
@Component({
  selector: 'app-superadmin-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private readonly appService : AppConfigService) {}

  ngOnInit(): void {
    this.appService.setDisplaySearchBar(false)
  }

  buttonsForSideBar : Path[] = [
    { name : 'Administradores', path : 'management'}
  ]
}
