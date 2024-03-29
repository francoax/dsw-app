/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PropertyServiceService } from 'src/app/services/property/property-service.service';
import { Property } from 'src/app/models/property';
import { OnInit } from '@angular/core';
import { PropertyType } from 'src/app/models/property-type';
import { ToastService } from '../../shared/toast/toast.service';
import { LocationService } from 'src/app/services/location/location.service';
@Component({
  selector: 'app-create-property',
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.scss'],
})
export class CreatePropertyComponent implements OnInit {
  propertiesTypes: PropertyType[] =
    []; /* crear modelo y pasar a :PropertyType */
  formTitle = 'Registrar nueva Propiedad';
  buttonContent = 'Aceptar';
  idPropToEdit!: string;
  formScope = 'create';
  properties: Property[] = [];
  localities: any[] = [];
  countries: { name: string; cca2: string }[] = [];
  ccode = '';
  states: { name: string; isoCode: string }[] = [];
  locations: string[] = [];
  @ViewChild('formCollapse') formCollapse!: ElementRef;

  propertyForm!: FormGroup;
  imageUploaded!: any;
  preview!: string;

  @Output() eventoListado = new EventEmitter<Property[]>();

  constructor(
    private service: PropertyServiceService,
    private locationService: LocationService,
    private readonly fb: FormBuilder,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.service.getPropertiesTypes().subscribe((Response) => {
      this.propertiesTypes = Response.data;
    });
    this.service.getProperties().subscribe((response) => {
      this.properties = response.data;
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

    this.propertyForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      capacity: [null, [Validators.required, Validators.min(1)]],
      address: [null, [Validators.required]],
      pricePerNight: [null, [Validators.required]],
      propertyType: [null, [Validators.required]],
      location: [null, [Validators.required]],
      image: [Blob, [Validators.required]],
    });
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      if (!file.type.startsWith('image')) {
        this.propertyForm.get('image')?.setErrors({ required: true });
      } else {
        reader.onload = (e) => {
          const imgBase64 = reader.result;
          this.propertyForm.patchValue({
            image: imgBase64,
          });
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onSubmit(form: FormGroup): void {
    if (!this.propertyForm.valid) {
      this.propertyForm.markAllAsTouched();
      this.toastService.setup({
        message: 'Error, por favor revise el formulario.',
        status: false,
      });
      this.toastService.show();
      return;
    }

    if (this.formScope === 'create') {
      form.value.location = `${form.value.location}, ${this.ccode}`;
      this.service
        .createProperty(form.value)
        .subscribe(({ message, data, error }) => {
          if (error) {
            this.toastService.setup({
              message: message,
              status: false,
            });
            this.toastService.show();
          } else {
            this.toastService.setup({
              message: message,
              status: true,
            });
            this.toastService.show();

            this.closeForm();
            this.properties.push(data);
          }
        });
    }

    if (this.formScope === 'update') {
      if (this.propertyForm.valid) {
        this.service
          .UpdateProperty(form.value, this.idPropToEdit)
          .subscribe(({ message, data, error }) => {
            if (error) {
              this.toastService.setup({
                message,
                status: !error,
              });
              this.toastService.show();
              return;
            }

            this.toastService.setup({
              message,
              status: true,
            });
            this.toastService.show();
            const index = this.properties.map((p) => p._id).indexOf(data._id);
            this.properties[index] = data;
            this.closeForm();
          });
      }
    }
  }

  onDelete(id: string): void {
    this.service.deleteProperty(id).subscribe((res) => {
      this.toastService.setup({ message: 'Propiedad eliminada', status: true });
      this.toastService.show();
      this.properties = this.properties.filter((a) => a._id !== id);
    });
  }

  onUpdate(prop: Property) {
    this.formCollapse.nativeElement.checked = true;
    this.formTitle = `Editar Propiedad`;
    this.propertyForm.get('image')?.clearValidators();
    this.propertyForm.get('image')?.updateValueAndValidity();
    this.propertyForm.patchValue({
      capacity: prop.capacity,
      address: prop.address,
      pricePerNight: prop.pricePerNight,
      propertyType: prop.propertyType._id,
      location: prop.location,
      image: prop.image,
    });
    this.formScope = 'update';
    this.idPropToEdit = prop._id;
  }
  closeForm(): void {
    this.formCollapse.nativeElement.checked = false;
    this.formTitle = 'Registar nueva Propiedad';
    this.buttonContent = 'Aceptar';
    this.formScope = 'create';
    this.propertyForm.get('image')?.setValidators([Validators.required]);
    this.propertyForm.get('image')?.updateValueAndValidity();
    this.propertyForm.reset();
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
}
