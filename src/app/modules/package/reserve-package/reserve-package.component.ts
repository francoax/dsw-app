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
import Reserve from 'src/app/models/reserve';
import { ReserveService } from 'src/app/services/reserve/reserve.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ToastService } from '../../shared/toast/toast.service';
import { LocationService } from 'src/app/services/location/location.service';
import { SkeletonsService } from 'src/app/services/skeletons/skeletons.service';

interface PackageFull {
  type: string;
  property: {
    _id: string;
    capacity: number;
    address: string;
    pricePerNight: number;
    propertyType: string;
    location: string;
    image: File;
  };
  car: Car;
  discount: number;
  medicalAssistance: MedicalAssistance;
  image: string;
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
  isLoading$ = this.skeletonService.reserveLoading$;
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
  subTotalPrice = 0;
  discount = 0;
  error = false;
  hasReserves = false;

  minDate: Date = new Date();
  reserves = [
    {
      start: new Date('2024/02/1'),
      end: new Date('2024/02/4'),
    },
    {
      start: new Date('2024/02/6'),
      end: new Date('2024/02/9'),
    },
    {
      start: new Date('2024/02/14'),
      end: new Date('2024/02/16'),
    },
    {
      start: new Date('2024/02/20'),
      end: new Date('2024/02/22'),
    },
  ];

  @ViewChild('confirmationModal') private modalComponent!: ModalComponent;

  constructor(
    private reserveService: ReserveService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private locationService: LocationService,
    private skeletonService: SkeletonsService
  ) {}

  ngOnInit() {
    const { data } = this.route.snapshot.data['pack'];
    this.package = data;
    this.skeletonService.showReserveLoading();
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
      this.subTotalPrice =
        days * this.package.property.pricePerNight +
        this.package.car.price +
        this.package.medicalAssistance.price;

      this.discount = this.subTotalPrice * this.package.discount;

      this.totalPrice = this.subTotalPrice - this.discount;
    });

    this.skeletonService.hideReserveLoading();
  }

  myFilter = (d: Date): boolean => {
    let dates: Date[] = [];
    this.reserves.forEach((date) => {
      if (
        d.valueOf() >= date.start.valueOf() &&
        d.valueOf() <= date.end.valueOf()
      ) {
        dates = [...this.generateDatesBetween(date.start, date.end)];
      }
    });
    return (
      dates.findIndex((date) => date.toDateString() == d?.toDateString()) < 0
    );
  };

  generateDatesBetween(startDate: Date, endDate: Date): Date[] {
    const dates = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }

  onSubmit() {
    let hasReservedDates = false;

    const { checkIn, checkOut } = this.reserveForm.value;

    const datesReserved = this.generateDatesBetween(checkIn, checkOut);

    this.reserves.forEach((date) => {
      const isIn = datesReserved.some(
        (d) =>
          d.valueOf() >= date.start.valueOf() &&
          d.valueOf() <= date.end.valueOf()
      );

      if (isIn) {
        hasReservedDates = true;
      }
    });

    if (hasReservedDates) {
      this.reserveForm.get('checkIn')?.setErrors([Validators.required]);
      this.toastService.setup({
        message: 'Las fechas dadas contienen fechas no disponibles.',
        status: false,
      });
      this.toastService.show();
      return;
    }

    this.reserveService.getReservesByUser().subscribe(({ data }) => {
      if (data.length > 0) {
        const reserves = data.filter(
          (r: Reserve) => new Date(r.date_end).getDate() > new Date().getDate()
        );
        this.hasReserves = reserves.length > 0;
      }

      if (this.hasReserves) {
        this.toastService.setup({
          message:
            'Posee una reserva vigente. Una vez finalizada, podra volver a reservar.',
          status: false,
        });
        this.toastService.show();
      } else if (this.reserveForm.valid) {
        this.openModal();
      } else {
        this.reserveForm.markAllAsTouched();
        this.toastService.setup({
          message: 'Por favor, ingrese correctamente los campos.',
          status: false,
        });
        this.toastService.show();
      }
    });
  }

  openModal(): void {
    this.modalComponent.open();
  }

  confirmReserve() {
    this.totalPrice = this.totalPrice - this.totalPrice * this.package.discount;
    const reserve: Reserve = {
      date_start: this.reserveForm.value.checkIn,
      date_end: this.reserveForm.value.checkOut,
      packageReserved: this.package.id,
      totalPrice: this.totalPrice,
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

  back() {
    this.router.navigate(['/']);
  }
}
