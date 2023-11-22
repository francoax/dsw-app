/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, pairwise, startWith } from 'rxjs';
import { Car } from 'src/app/models/car';
import { MedicalAssistance } from 'src/app/models/medical-assistance';
import { Property } from 'src/app/models/property';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ToastService } from '../../shared/toast/toast.service';
import { PackageAgent } from 'src/app/models/package';
import { PackageService } from 'src/app/services/package/package.service';
import { ReserveService } from 'src/app/services/reserve/reserve.service';
import Reserve from 'src/app/models/reserve';

type reserveSummary = {
  car: Car | null,
  medicalAssitance: MedicalAssistance | null,
  property: Property | null,
  checkIn: string,
  checkOut: string,
  totalPrice: number
}

@Component({
  selector: 'app-custom-reserve',
  templateUrl: './custom-reserve.component.html',
  styleUrls: ['./custom-reserve.component.scss'],
})
export class CustomReserveComponent implements OnInit, OnDestroy {
  property!: Property;
  cars!: Car[];
  medicalAssitance!: MedicalAssistance[];
  form!: FormGroup;

  @ViewChild('confirmationModal') private modalComponent!: ModalComponent;

  @ViewChild('carSelect') private carSelect! : ElementRef;
  @ViewChild('maSelect') private maSelect! : ElementRef;

  reserveSummary: reserveSummary = {
    car: null,
    medicalAssitance: null,
    property: null,
    checkIn: '',
    checkOut: '',
    totalPrice: 0,
  };

  $form!: Subscription;

  constructor(
    private readonly packageService : PackageService,
    private readonly reserveService : ReserveService,
    private readonly router : Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly toastService : ToastService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ data }) => {
      this.property = data.at(0);
      this.cars = data.at(1).data;
      this.medicalAssitance = data.at(2).data;
    });

    this.form = this.generateForm();

    this.reserveSummary = { ...this.reserveSummary, property: this.property };

    this.$form = this.form.valueChanges
      .pipe(startWith({}), pairwise())
      .subscribe(([prev, next]) => {
        this.updateSummary(prev, next);
      });
  }

  ngOnDestroy() {
    if (this.$form) {
      this.$form.unsubscribe();
    }
  }

  generateForm(): FormGroup {
    return this.fb.group({
      property: [this.property._id, [Validators.required]],
      car: [''],
      medicalAssistance: [''],
      checkIn: ['', [Validators.required]],
      checkOut: ['', [Validators.required]],
    });
  }

  updateSummary(prevValue: any, nextValue: any) {
    if (prevValue.car !== nextValue.car) {
      this.reserveSummary = {
        ...this.reserveSummary,
        car: this.cars.find((c) => c.id === nextValue.car)!,
      };
    }

    if (prevValue.medicalAssistance !== nextValue.medicalAssistance) {
      this.reserveSummary = {
        ...this.reserveSummary,
        medicalAssitance: this.medicalAssitance.find(
          (ma) => ma._id === nextValue.medicalAssistance
        )!,
      };
    }

    if (prevValue.checkIn !== nextValue.checkIn) {
      this.reserveSummary = {
        ...this.reserveSummary,
        checkIn: nextValue.checkIn,
      };
    }

    if (prevValue.checkOut !== nextValue.checkOut) {
      this.reserveSummary = {
        ...this.reserveSummary,
        checkOut: nextValue.checkOut,
      };
    }

    this.calculateTotal()
  }

  calculateTotal() {
    const checkIn = new Date(this.form.get('checkIn')?.value);
    const checkOut = new Date(this.form.get('checkOut')?.value);
    const prevCalculate = checkOut.getTime() - checkIn.getTime();
    const totalDays = prevCalculate / (1000 * 3600 * 24) || 0;
    const carPrice = this.reserveSummary.car?.price.value || 0;
    this.reserveSummary.totalPrice = carPrice + this.property.pricePerNight.price * totalDays;
  }

  onSubmit(form: FormGroup) {
    if(form.valid) {
      this.open()
    } else {
      this.form.markAllAsTouched();
      this.toastService.setup({
        message: 'Por favor, ingrese correctamente los campos.',
        status: false,
      });
      this.toastService.show();
    }

  }

  confirmReserve() {
    const newPackage : PackageAgent = {
      car: this.form.value.car,
      medicalAssistance : this.form.value.medicalAssistance,
      property: this.form.value.property,
      type: 'custom',
      nameImage : ''
    }

    let token = JSON.parse(localStorage.getItem('loggedUser') || '');
    token = token.token;

    this.packageService.createPackage(newPackage, token).subscribe((res) => {
      if(res.error) {
        this.toastService.setup({ message : res.message, status: false});
        this.toastService.show()
      } else {
        const newReserve : Reserve = {
          date_end : this.form.value.checkOut,
          date_start : this.form.value.checkIn,
          packageReserved : res.data.id,
        }
        this.reserveService.createReserve(newReserve, token).subscribe(() => {
          this.router.navigate(['./completed'], {
            relativeTo: this.activatedRoute,
          });
        })
      }
    })

  }

  open(): void {
    this.modalComponent.open();
  }

  cleanCar() {
    if(!this.carSelect.nativeElement.checked) {
      this.form.patchValue({car : ''})
    }
  }

  cleanMa() {
    if(!this.maSelect.nativeElement.checked) {
      this.form.patchValue({ medicalAssistance : ''})
    }
  }
}
