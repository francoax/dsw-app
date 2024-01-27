/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Car } from 'src/app/models/car';
import { ToastService } from '../../shared/toast/toast.service';
import { LocationService } from 'src/app/services/location/location.service';
import { CarService } from 'src/app/services/car/car.service';

@Component({
  selector: 'app-cars-form',
  templateUrl: './cars-form.component.html',
  styleUrls: ['./cars-form.component.scss'],
})
export class CarsFormComponent implements OnInit {
  formTitle = 'Registrar un Nuevo Auto';
  buttonContent = 'Aceptar';
  idCarToEdit!: string;
  cars: Car[] = [];
  countries: { name: string; cca2: string }[] = [];
  ccode = '';
  states: { name: string; isoCode: string }[] = [];
  locations: string[] = [];
  formScope = 'create';

  @ViewChild('formCollapse') formCollase!: ElementRef;

  constructor(
    private service: CarService,
    private readonly toastService: ToastService,
    private locationService: LocationService
  ) {}
  carsForm!: FormGroup;
  brand = new FormControl('', [Validators.maxLength(30), Validators.required]);
  model = new FormControl('', [Validators.maxLength(30), Validators.required]);
  year = new FormControl('', [
    Validators.minLength(4),
    Validators.maxLength(4),
    Validators.required,
  ]);
  plate = new FormControl('', [Validators.maxLength(30), Validators.required]);
  date = new FormControl('', [Validators.maxLength(30), Validators.required]);
  value = new FormControl('', [Validators.maxLength(10), Validators.required]);
  country = new FormControl('', [Validators.required]);
  state = new FormControl('', [Validators.required]);
  city = new FormControl('', [Validators.required]);
  location = new FormControl('');

  ngOnInit(): void {
    this.carsForm = new FormGroup({
      brand: this.brand,
      model: this.model,
      year: this.year,
      plate: this.plate,
      price: new FormGroup({
        date: this.date,
        value: this.value,
      }),
      country: this.country,
      state: this.state,
      city: this.city,
      locality: this.location,
    });

    this.service.getCars().subscribe((res) => {
      this.cars = res.data;
    });

    this.locationService.getCountries().subscribe((res) => {
      res.forEach((country) => {
        if (country.name.common !== 'Falkland Islands')
          this.countries.push({
            name: country.name.common,
            cca2: country.cca2,
          });
      });
    });
  }

  onSubmit(form: FormGroup) {
    if (this.carsForm.valid) {
      const locality = `${form.controls['city'].value}, ${form.controls['country'].value}`;
      form.controls['locality'].setValue(locality);
      if (this.formScope === 'create') {
        this.service.createCar(form.value).subscribe((res) => {
          this.cars.push(res.data);
          this.toastService.setup({ message: 'Auto Creado', status: true });
          this.toastService.show();
          this.closeForm();
        });
      } else if (this.formScope === 'editar') {
        this.service
          .updateCar(this.idCarToEdit, form.value)
          .subscribe((res) => {
            this.toastService.setup({
              message: 'Auto Actualizado',
              status: true,
            });
            this.toastService.show();
            const index = this.cars.map((a) => a.id).indexOf(this.idCarToEdit);
            this.cars[index] = res.data;
            this.closeForm();
          });
      }
    } else {
      this.toastService.setup({
        message: 'Verifique que los datos ingresados sean validos',
        status: false,
      });
      this.toastService.show();
    }
  }
  onDelete(id: string): void {
    this.service.deleteCar(id).subscribe((res) => {
      this.cars = this.cars.filter((a) => a.id !== id);
      this.toastService.setup({ message: 'Auto Eliminado', status: true });
      this.toastService.show();
    });
  }

  onUpdate(car: Car) {
    this.formCollase.nativeElement.checked = true;
    this.formTitle = 'Editar Auto';
    this.carsForm.patchValue({
      brand: car.brand,
      model: car.model,
      year: car.year,
      plate: car.plate,
      price: car.price,
      locality: car.locality,
    });
    this.formScope = 'editar';
    this.idCarToEdit = car.id;
  }

  onCountryChange(event: any) {
    this.ccode = event.target.value;
    this.locationService.getStates(this.ccode).subscribe((res) => {
      this.states = [];
      res.data.forEach((state) => {
        this.states.push({ name: state.name, isoCode: state.isoCode });
      });
    });
  }

  onStateChange(event: any) {
    this.locationService
      .getLocations(this.ccode, event.target.value)
      .subscribe((res) => {
        this.locations = [];
        res.data.forEach((location) => {
          this.locations.push(location.name);
        });
      });
  }

  closeForm(): void {
    this.formCollase.nativeElement.checked = false;
    this.formTitle = 'Registrar un Nuevo Auto';
    this.buttonContent = 'Aceptar';
    this.carsForm.reset();
  }
}
