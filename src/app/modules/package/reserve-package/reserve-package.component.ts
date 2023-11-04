import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import Package from 'src/app/models/package';
import { PackageService } from 'src/app/services/package/package.service';
import { ReserveService } from 'src/app/services/reserve/reserve.service';

@Component({
  selector: 'app-reserve-package',
  templateUrl: './reserve-package.component.html',
  styleUrls: ['./reserve-package.component.scss'],
})
export class ReservePackageComponent implements OnInit {
  packageId!: string; //el componente recibe el paquete por query param
  package!: Package;
  token!: string;

  constructor(
    private reserveService: ReserveService,
    private packageService: PackageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.packageId = params['packageId'];
    });
    this.token = localStorage.getItem('user') || '';
    this.getPackage(this.packageId);
  }

  getPackage(packageId: string) {
    this.packageService.getPackage(packageId).subscribe((res) => {
      this.package = res.data;
    });
  }
}
