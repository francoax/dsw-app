/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { MedicalAssistance } from 'src/app/models/medical-assistance';
import { PricePerNight } from 'src/app/models/property';
import Reserve from 'src/app/models/reserve';
import { ReserveService } from 'src/app/services/reserve/reserve.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ToastService } from '../../shared/toast/toast.service';
import { LocationService } from 'src/app/services/location/location.service';

interface PackageFull {
  type: string;
  property: {
    _id: string;
    capacity: number;
    address: string;
    pricePerNight: PricePerNight;
    propertyType: string;
    location: string;
    image: File;
  };
  car: Car;
  medicalAssistance: MedicalAssistance;
  nameImage: string;
  id: string;
}

function validateDates(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const checkIn = formGroup.get('checkIn')?.value;
    const checkOut = formGroup.get('checkOut')?.value;

    if (checkIn && checkOut && new Date(checkOut) < new Date(checkIn)) {
      return { invalidDate: true };
    }

    return null;
  };
}

function calculateDays(date1: Date, date2: Date): number {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

@Component({
  selector: 'app-reserve-package',
  templateUrl: './reserve-package.component.html',
  styleUrls: ['./reserve-package.component.scss'],
})
export class ReservePackageComponent implements OnInit {
  package!: PackageFull;
  reserveForm!: FormGroup;
  checkIn = new FormControl('', Validators.required);
  checkOut = new FormControl('', Validators.required);
  todayDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };
  totalPrice = 0;
  error = false;

  @ViewChild('confirmationModal') private modalComponent!: ModalComponent;

  constructor(
    private reserveService: ReserveService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private locationService: LocationService
  ) {}

  ngOnInit() {
    const { data } = this.route.snapshot.data['pack'];
    this.package = data;

    this.locationService.getLocation(this.package.property.location).subscribe({
      next: (res) => {
        this.package.property.location = res.data.name;
      },
      error: (err) => {
        this.toastService.setup({
          message: err.message,
          status: false,
        });
        this.toastService.show();
      },
    });

    this.reserveForm = new FormGroup(
      {
        checkIn: this.checkIn,
        checkOut: this.checkOut,
      },
      { validators: validateDates() }
    );

    this.reserveForm.valueChanges.subscribe(() => {
      const days = calculateDays(
        new Date(this.reserveForm.value.checkIn),
        new Date(this.reserveForm.value.checkOut)
      );
      this.totalPrice =
        days * this.package.property.pricePerNight.price +
        this.package.car.price.value;
    });
  }

  onSubmit() {
    if (this.reserveForm.valid) {
      this.openModal();
    } else {
      this.toastService.setup({
        message: 'Por favor, ingrese correctamente los campos.',
        status: false,
      });
      this.toastService.show();
    }
  }

  openModal(): void {
    this.modalComponent.open();
  }

  confirmReserve() {
    const reserve: Reserve = {
      date_start: this.reserveForm.value.checkIn,
      date_end: this.reserveForm.value.checkOut,
      packageReserved: this.package.id,
    };
    this.reserveService.createReserve(reserve).subscribe({
      next: () => {
        this.router.navigate(['/confirmation'], {
          queryParams: { status: 'success' },
        });
      },
      error: (err) => {
        this.toastService.setup({
          message: err.message,
          status: false,
        });
        this.toastService.show();
      },
    });
  }
}
