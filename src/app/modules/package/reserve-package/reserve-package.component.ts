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
import { SkeletonsService } from 'src/app/services/skeletons/skeletons.service';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
  _id: string;
}

type ReservedDates = {
  date_start: Date;
  date_end: Date;
};

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

  discount = 0;
  subTotalPrice = 0;
  totalPrice = 0;

  hasReserves = false;

  minDate: Date = new Date();
  reservesDone: ReservedDates[] = [];

  @ViewChild('confirmationModal') private modalComponent!: ModalComponent;

  constructor(
    private reserveService: ReserveService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
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

    this.reserveService
      .getReservesFromProperty(this.package.property._id)
      .subscribe(({ data }) => {
        this.reservesDone = data;
      });

    this.skeletonService.hideReserveLoading();
  }

  async onSubmit() {
    const { checkIn, checkOut } = this.reserveForm.value;

    if (this.reserveForm.valid) {
      try {
        if (!(await this.verifyUserReserves())) {
          return;
        }

        if (!this.verifyDatesSelected(checkIn, checkOut)) {
          return;
        }

        if (!(await this.verifyCarSelected(checkIn, checkOut))) {
          return;
        }

        this.openModal();
      } catch (error) {
        this.toastService.setup({
          message: 'Error durante carga de formulario.',
          status: false,
        });
        this.toastService.show();
      }
    } else {
      this.reserveForm.markAllAsTouched();
      this.toastService.setup({
        message: 'Por favor, revise el formulario',
        status: false,
      });
      this.toastService.show();
    }
  }

  private async verifyUserReserves(): Promise<boolean> {
    try {
      const { data } = await firstValueFrom(
        this.reserveService.getReservesByUser()
      );
      console.log(data);
      if (data.length > 0) {
        const reserves = data.filter((r: Reserve) => {
          const reserveEndDate = new Date(r.date_end).getTime();
          const todayDate = new Date().getTime();
          return reserveEndDate > todayDate;
        });
        console.log(reserves.length);
        this.hasReserves = reserves.length > 0;
      }

      if (this.hasReserves) {
        this.toastService.setup({
          message:
            'Posee una reserva vigente. Una vez finalizada, podrá volver a reservar.',
          status: false,
        });
        this.toastService.show();
        throw new Error();
      }

      return true;
    } catch (e) {
      return false;
    }
  }

  private verifyDatesSelected(checkIn: Date, checkOut: Date): boolean {
    try {
      let hasReservedDates = false;

      const datesReserved = this.generateDatesBetween(checkIn, checkOut);

      this.reservesDone.forEach((date) => {
        const isIn = datesReserved.some((d) => {
          const dateReserved = d.getTime();
          const reserveDoneDateStart = new Date(date.date_start).getTime();
          const reserveDoneDateEnd = new Date(date.date_end).getTime();
          return (
            dateReserved > reserveDoneDateStart &&
            dateReserved < reserveDoneDateEnd
          );
        });
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
        throw new Error('Fechas no disponibles');
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  private async verifyCarSelected(
    checkIn: Date,
    checkOut: Date
  ): Promise<boolean> {
    try {
      let carAvailable = true;
      const car = this.package.car._id;

      const { data } = await firstValueFrom(
        this.reserveService.getReservesBetween(checkIn, checkOut, car)
      );

      carAvailable = data;

      if (!carAvailable) {
        throw new Error('Coche no disponible en las fechas seleccionadas.');
      }

      return true;
    } catch (error) {
      console.error('Error al verificar coche seleccionado:');

      if (error instanceof HttpErrorResponse) {
        const errorMessage =
          error.error?.message || 'Error al verificar coche seleccionado';
        this.toastService.setup({
          message: errorMessage,
          status: false,
        });
        this.toastService.show();
      }

      return false;
    }
  }

  myFilter = (d: Date): boolean => {
    let dates: Date[] = [];
    this.reservesDone.forEach((date) => {
      const start = new Date(date.date_start);
      const end = new Date(date.date_end);
      if (d.valueOf() >= start.valueOf() && d.valueOf() <= end.valueOf()) {
        dates = [...this.generateDatesBetween(start, end)];
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

  openModal(): void {
    this.modalComponent.open();
  }

  confirmReserve() {
    this.totalPrice = this.totalPrice - this.totalPrice * this.package.discount;
    const reserve: Reserve = {
      date_start: this.reserveForm.value.checkIn,
      date_end: this.reserveForm.value.checkOut,
      packageReserved: this.package._id,
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
