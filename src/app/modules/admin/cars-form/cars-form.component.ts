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
  formTitle = 'Registrar nuevo Vehiculo';
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
  value = new FormControl('', [Validators.required]);
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
      price: this.value,
      country: this.country,
      state: this.state,
      city: this.city,
      location: this.location,
    });

    this.service.getCars().subscribe((res) => {
      this.cars = res.data;
    });

    this.locationService.getCountries().subscribe((res) => {
      res.data.forEach((country: { name: { common: string }; cca2: any }) => {
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
      const location = `${form.controls['city'].value}, ${form.controls['country'].value}`;
      form.controls['location'].setValue(location);
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
    this.formTitle = `Editar auto: ${car.brand.toUpperCase()} ${car.model.toUpperCase()}`;
    this.carsForm.patchValue({
      brand: car.brand,
      model: car.model,
      year: car.year,
      plate: car.plate,
      price: car.price,
      location: car.location,
    });
    this.formScope = 'editar';
    this.idCarToEdit = car.id;
    this.buttonContent = 'Editar';
  }

  onCountryChange(event: any) {
    this.ccode = event.target.value;
    this.locationService.getStates(this.ccode).subscribe((res) => {
      const response = res.data.data;
      this.states = [];
      response.forEach((state: { name: any; isoCode: any }) => {
        this.states.push({ name: state.name, isoCode: state.isoCode });
      });
    });
  }

  onStateChange(event: any) {
    console.log(event.target.value);
    this.locationService
      .getLocations(this.ccode, event.target.value)
      .subscribe((res) => {
        const response = res.data.data;
        this.locations = [];
        response.forEach((location: { name: string }) => {
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
