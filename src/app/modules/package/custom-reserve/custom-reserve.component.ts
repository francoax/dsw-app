/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, pairwise, startWith } from 'rxjs';
import { Car } from 'src/app/models/car';
import { MedicalAssistance } from 'src/app/models/medical-assistance';
import { Property } from 'src/app/models/property';

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
    private readonly activatedRoute: ActivatedRoute,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ data }) => {
      this.property = data.at(0);
      this.cars = data.at(1).data;
      this.medicalAssitance = data.at(2).data;
    });

    this.form = this.generateForm();

    this.reserveSummary = {...this.reserveSummary, totalPrice: this.property.pricePerNight.price, property: this.property}

    this.$form = this.form.valueChanges.pipe(startWith({}), pairwise()).subscribe(([prev, next]) => {
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
      property: [this.property._id],
      car: [],
      medicalAssistance: [],
      checkIn: [],
      checkOut: [],
    });
  }

  updateSummary(prevValue : any, nextValue : any) {
    if(prevValue.car !== nextValue.car) {
      this.reserveSummary = {...this.reserveSummary, car: this.cars.find((c) => c.id === nextValue.car)!}
      this.reserveSummary.totalPrice += this.reserveSummary.car?.price.value ?? 0
    }

    if(prevValue.medicalAssistance !== nextValue.medicalAssistance) {
      this.reserveSummary = {...this.reserveSummary, medicalAssitance : this.medicalAssitance.find(ma => ma._id === nextValue.medicalAssistance)!}
    }

    if(prevValue.checkIn !== nextValue.checkIn) {
      this.reserveSummary = {...this.reserveSummary, checkIn: nextValue.checkIn}
    }

    if(prevValue.checkOut !== nextValue.checkOut) {
      this.reserveSummary = {...this.reserveSummary, checkOut: nextValue.checkOut}
    }

    if(this.form.get('checkIn')?.value && this.form.get('checkOut')?.value) {
      const prevCalculate = nextValue.checkIn.getTime() - nextValue.checkOut.getTime();
      const totalDays = prevCalculate / (1000 * 3600 * 24);
      this.reserveSummary.totalPrice += this.property.pricePerNight.price * totalDays
    }
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);
  }
}
