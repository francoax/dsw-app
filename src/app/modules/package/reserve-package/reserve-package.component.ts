/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Car from 'src/app/models/car';
import { MedicalAssistance } from 'src/app/models/medical-assistance';
import Package from 'src/app/models/package';
import { Property } from 'src/app/models/property';
import Reserve from 'src/app/models/reserve';
import { CarService } from 'src/app/services/car/car.service';
import { PackageService } from 'src/app/services/package/package.service';
import { PropertyServiceService } from 'src/app/services/property/property-service.service';
import { ReserveService } from 'src/app/services/reserve/reserve.service';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-reserve-package',
  templateUrl: './reserve-package.component.html',
  styleUrls: ['./reserve-package.component.scss'],
})
export class ReservePackageComponent implements OnInit {
  packageId!: string; //el componente recibe el paquete por query param
  package!: Package;
  property!: Property;
  car!: Car;
  medicalAssist!: MedicalAssistance;
  token!: any;
  reserveForm!: FormGroup;
  dateStart = new FormControl('', Validators.required);
  dateEnd = new FormControl('', Validators.required);
  hosts = new FormControl('', Validators.required);

  @ViewChild('confirmationModal') private modalComponent!: ModalComponent;

  constructor(
    private reserveService: ReserveService,
    private packageService: PackageService,
    private propertyService: PropertyServiceService,
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  esFechaMayor(fecha1: string, fecha2: string): boolean {
    const fechaInicial = new Date(fecha1);
    const fechaFinal = new Date(fecha2);

    if (fechaInicial > fechaFinal) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.packageId = params['packageId'];
    });
    this.token = JSON.parse(localStorage.getItem('loggedUser') || '');
    this.token = this.token.token;
    this.packageService.getPackage(this.packageId).subscribe((res) => {
      this.package = res.data;
      this.propertyService
        .getProperty(this.package.property)
        .subscribe((res) => {
          this.property = res.data;
        });
      this.carService.getCar(this.package.car).subscribe((res) => {
        this.car = res.data;
      });
    });

    this.reserveForm = new FormGroup({
      dateStart: this.dateStart,
      dateEnd: this.dateEnd,
      hosts: this.hosts,
    });
  }

  onSubmit() {
    if (
      this.reserveForm.valid &&
      this.esFechaMayor(
        this.reserveForm.value.dateEnd,
        this.reserveForm.value.dateStart
      )
    ) {
      const reserve: Reserve = {
        date_start: this.reserveForm.value.dateStart,
        date_end: this.reserveForm.value.dateEnd,
        packageReserved: this.packageId,
      };
      this.reserveService.createReserve(reserve, this.token).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      alert('Verifique que los campos sean correctos');
    }
  }

  openModal(): void {
    this.modalComponent.open();
  }
}
