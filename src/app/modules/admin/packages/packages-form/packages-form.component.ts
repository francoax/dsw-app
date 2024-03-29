/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PackageService } from 'src/app/services/package/package.service';
import { PropertyServiceService } from 'src/app/services/property/property-service.service';
import { MedicalAssistanceService } from 'src/app/services/medical-assitance/medical-assistance.service';
import { CarService } from 'src/app/services/car/car.service';
import { Car } from 'src/app/models/car';
import { MedicalAssistance } from 'src/app/models/medical-assistance';
import { Property, PropertyV2 } from 'src/app/models/property';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/modules/shared/toast/toast.service';
import Package from 'src/app/models/package';
@Component({
  selector: 'app-packages-form',
  templateUrl: './packages-form.component.html',
  styleUrls: ['./packages-form.component.scss'],
})
export class PackagesFormComponent implements OnInit {
  idPackToEdit!: string;
  cars: Car[] = [];
  medicalAssistances: MedicalAssistance[] = [];
  props: PropertyV2[] = [];
  packagesForm!: FormGroup;
  formTitle = 'Registrar nuevo Paquete';
  formScope = 'create';
  buttonContent = 'Agregar';
  selectedLoca = null;
  packages: Package[] = [];
  @ViewChild('formCollapse') formCollapse!: ElementRef;

  constructor(
    private propServ: PropertyServiceService,
    private carServ: CarService,
    private medServ: MedicalAssistanceService,
    private packServ: PackageService,
    private readonly fb: FormBuilder,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.packServ.getCompletePackages().subscribe((response) => {
      this.packages = response.data;
      console.log(response.data);
    });

    this.carServ.getCars().subscribe((response) => {
      this.cars = response.data;
    });

    this.propServ.getProperties().subscribe((response) => {
      this.props = response.data;
      console.log(response.data);
    });
    this.medServ.getAll().subscribe((response) => {
      this.medicalAssistances = response.data;
    });

    this.packagesForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      property: [null, [Validators.required]],
      car: [null, [Validators.required]],
      medicalAssistance: [null, [Validators.required]],
      image: [Blob, [Validators.required]],
      type: ['completo'],
      discount: [null, [Validators.required]],
    });
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      if (!file.type.startsWith('image')) {
        this.packagesForm.get('image')?.setErrors({ required: true });
      } else {
        reader.onload = (e) => {
          const imgBase64 = reader.result;
          this.packagesForm.patchValue({
            image: imgBase64,
          });
        };
        reader.readAsDataURL(file);
      }
    }
  }
  loadCars(location?: string) {
    const index = this.props.map((p) => p._id).indexOf(this.selectedLoca!);
    const prop = this.props[index];
    this.carServ
      .getCarsFromLocation(location ?? prop.location)
      .subscribe((response) => {
        this.cars = response.data;
        if (!location) {
          this.packagesForm.patchValue({
            car: '',
          });
        }
      });
  }
  onSubmit(form: FormGroup) {
    if (!this.packagesForm.valid) {
      this.packagesForm.markAllAsTouched();
      this.toastService.setup({
        message: 'Error, por favor revise el formulario.',
        status: false,
      });
      this.toastService.show();
      return;
    }

    if (this.formScope === 'create') {
      this.packServ
        .createPackage({ ...form.value, discount: form.value.discount / 100 })
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
            this.packages.push(data);
          }
        });
    }

    if (this.formScope === 'update') {
      if (this.packagesForm.valid) {
        this.packServ
          .updatePackage(form.value, this.idPackToEdit)
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
            const index = this.packages.map((p) => p.id).indexOf(data.id);
            this.packages[index] = data;
            this.closeForm();
          });
      }
    }
  }

  onUpdate(pack: Package) {
    this.loadCars(pack.property.location);
    this.formCollapse.nativeElement.checked = true;
    this.formTitle = 'Editar Paquete';
    this.buttonContent = 'Editar';
    this.packagesForm.get('image')?.clearValidators();
    this.packagesForm.get('image')?.updateValueAndValidity();
    this.packagesForm.patchValue({
      property: pack.property._id,
      car: pack.car._id,
      medicalAssistance: pack.medicalAssistance._id,
      image: pack.image,
      discount: pack.discount * 100,
    });
    this.formScope = 'update';
    this.idPackToEdit = pack.id;
  }

  onDelete(id: string): void {
    this.packServ.deletePackage(id).subscribe((res) => {
      this.toastService.setup({ message: 'Paquete eliminada', status: true });
      this.toastService.show();
      this.packages = this.packages.filter((p) => p.id !== id);
    });
  }

  closeForm(): void {
    this.formCollapse.nativeElement.checked = false;
    this.formTitle = 'Registar nueva Paquete';
    this.buttonContent = 'Agregar';
    this.formScope = 'create';
    this.packagesForm.get('image')?.setValidators([Validators.required]);
    this.packagesForm.get('image')?.updateValueAndValidity();
    this.packagesForm.reset();
  }
}
