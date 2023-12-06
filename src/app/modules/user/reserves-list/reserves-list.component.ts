/* eslint-disable prefer-const */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { MedicalAssistance } from 'src/app/models/medical-assistance';
import { PricePerNight, Property } from 'src/app/models/property';
import Reserve from 'src/app/models/reserve';
import { PackageService } from 'src/app/services/package/package.service';
import { ReserveService } from 'src/app/services/reserve/reserve.service';
import { ModalComponent } from '../../shared/modal/modal.component';

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
}

interface PropertyResponse {
  id: string;
  capacity: number;
  address: string;
  pricePerNight: PricePerNight;
  propertyType: string;
  location: string;
  urlImage: string;
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
    private route: ActivatedRoute
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
    };
    reserveDetails.id = reserve.id as string;

    this.packageService
      .getPackage(reserve.packageReserved)
      .subscribe((response) => {
        console.log(response.data);
        const property: PropertyResponse = response.data.property;
        const car: Car = response.data.car;
        const medAssist: MedicalAssistance = response.data.medicalAssistance;

        reserveDetails.propertyAddress = property.address;
        reserveDetails.price += property.pricePerNight.price;

        reserveDetails.car = `${car.brand} ${car.model}`;
        reserveDetails.price += car.price.value;

        const locations = this.route.snapshot.data['locations'];
        locations.forEach((location: { id: string; name: string }) => {
          if (location.id === property.location) {
            reserveDetails.location = location.name;
          }
        });

        reserveDetails.medicalAssistance = `${medAssist.description} Tipo ${medAssist.coverageType}`;

        reserveDetails.dateStart = reserve.date_start;
        reserveDetails.dateEnd = reserve.date_end;

        return reserveDetails; //aca devuelve
      });

    return reserveDetails;
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

  openModal(reserveId: string) {
    this.selectedReserveId = reserveId;
    this.modalComponent.open();
  }

  cancelReserve() {
    this.reserveService.deleteReserve(this.selectedReserveId).subscribe();
    this.selectedReserveId = '';
  }
}
