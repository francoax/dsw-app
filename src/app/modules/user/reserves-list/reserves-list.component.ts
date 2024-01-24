/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { MedicalAssistance } from 'src/app/models/medical-assistance';
import Reserve from 'src/app/models/reserve';
import { PackageService } from 'src/app/services/package/package.service';
import { ReserveService } from 'src/app/services/reserve/reserve.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ToastService } from '../../shared/toast/toast.service';
import { AppConfigService } from 'src/app/services/app/app.service';

interface ReserveDetails {
  id: string;
  location: string;
  propertyAddress: string;
  propertyType: string;
  car: string;
  medicalAssistance: string;
  dateStart: string;
  dateEnd: string;
  price: number;
  imageUrl: string;
}

interface PropertyResponse {
  id: string;
  capacity: number;
  address: string;
  pricePerNight: number;
  propertyType: string;
  location: string;
  image: string;
}

@Component({
  selector: 'app-reserves-list',
  templateUrl: './reserves-list.component.html',
  styleUrls: ['./reserves-list.component.scss'],
})
export class ReservesListComponent implements OnInit {
  reserves: ReserveDetails[] = [];
  reservesFull: ReserveDetails[] = [];
  dateFilterForm = new FormGroup({
    radioOption: new FormControl(''),
    dateFilter: new FormControl('', Validators.required),
  });
  selectedReserveId = '';
  error = false;

  @ViewChild('confirmationModal') private modalComponent!: ModalComponent;

  constructor(
    private reserveService: ReserveService,
    private packageService: PackageService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private appService: AppConfigService
  ) {}

  ngOnInit() {
    this.reserveService.getReservesByUser().subscribe((response) => {
      response.data.forEach((reserve: Reserve) => {
        this.reserves.push(this.getReserveDetails(reserve));
      });
    });

    this.reservesFull = this.reserves;
  }

  getReserveDetails(reserve: Reserve): ReserveDetails {
    let reserveDetails: ReserveDetails = {
      id: '',
      location: '',
      propertyAddress: '',
      propertyType: '',
      car: '',
      medicalAssistance: '',
      dateStart: '',
      dateEnd: '',
      price: 0,
      imageUrl: '',
    };
    reserveDetails.id = reserve._id as string;

    this.packageService
      .getPackage(reserve.packageReserved)
      .subscribe((response) => {
        const property: PropertyResponse = response.data.property;
        const car: Car = response.data.car;
        const medAssist: MedicalAssistance = response.data.medicalAssistance;

        reserveDetails.propertyAddress = property.address;
        reserveDetails.imageUrl = `${this.appService.apiUrl}/api/images/${property.image}`;

        reserveDetails.car = `${car.brand} ${car.model}`;

        const locations = this.route.snapshot.data['locations'];
        locations.forEach((location: { id: string; name: string }) => {
          if (location.id === property.location) {
            reserveDetails.location = location.name;
          }
        });

        reserveDetails.medicalAssistance = `${medAssist.description} Tipo ${medAssist.coverageType}`;
        reserveDetails.dateStart = reserve.date_start;
        reserveDetails.dateEnd = reserve.date_end;

        const getDays = () => {
          const date1 = new Date(reserve.date_start);
          const date2 = new Date(reserve.date_end);
          const timeDiff = Math.abs(date2.getTime() - date1.getTime());
          const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
          return diffDays;
        };
        reserveDetails.price = this.calculateTotalPrice(
          getDays(),
          property.pricePerNight,
          car.price.value
        );

        return reserveDetails; //aca devuelve
      });

    return reserveDetails;
  }

  calculateTotalPrice(
    days: number,
    propertyPrice: number,
    carPrice: number
  ): number {
    return days * propertyPrice + carPrice;
  }

  filterReserves() {
    this.resetFilter();

    if (this.dateFilterForm.value.radioOption === 'option1') {
      this.reserves = this.reserves.filter(
        (reserve) =>
          new Date(reserve.dateStart) >
          new Date(this.dateFilterForm.value.dateFilter as string)
      );
    }

    if (this.dateFilterForm.value.radioOption === 'option2') {
      this.reserves = this.reserves.filter(
        (reserve) =>
          new Date(reserve.dateEnd) <=
          new Date(this.dateFilterForm.value.dateFilter as string)
      );
    }
  }

  resetFilter() {
    this.reserves = this.reservesFull;
  }

  openModal(event: Event) {
    this.selectedReserveId = (event.target as HTMLButtonElement).id;
    this.modalComponent.open();
  }

  cancelReserve() {
    this.reserveService.deleteReserve(this.selectedReserveId).subscribe({
      next: () => {
        this.router.navigate(['/confirmation'], {
          queryParams: { action: 'cancel' },
        });
      },
      error: () => {
        this.toastService.setup({
          message: 'Error al cancelar reserva',
          status: false,
        });
        this.toastService.show();
      },
    });
    this.selectedReserveId = '';
  }

  checkCurrentReserve(reserve: ReserveDetails): boolean {
    const today = new Date();
    const dateStart = new Date(reserve.dateStart);
    const dateEnd = new Date(reserve.dateEnd);
    if ((today > dateStart && today < dateEnd) || today > dateEnd) return true;
    return false;
  }
}
