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
  styleUrls: ['./packages-form.component.scss']
})
export class PackagesFormComponent implements OnInit{

  cars: Car[] = [];
  medicalAssistances: MedicalAssistance[] = [];
  props: PropertyV2[] = [];
  packagesForm!: FormGroup;
  formTitle = 'Registrar nuevo Paquete';
  formScope = 'create';
  buttonContent = 'Aceptar';
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
    ){}
  
  
  ngOnInit(): void {
    this.packServ.getAll().subscribe((response) => {
      this.packages = response.data;
    })

    this.carServ.getCars().subscribe((response) => {
      this.cars = response.data;
    });
    
    this.propServ.getProperties().subscribe((response) => {
      this.props = response.data;
    });
    this.medServ.getAll().subscribe((response) => {
      this.medicalAssistances = response.data;
    });

    this.packagesForm = this.initForm();
    
  }

  initForm():FormGroup {
    return this.fb.group({
      property: [null,[Validators.required]],
      car: [null,[Validators.required]],
      medicalAssistance: [null,[Validators.required]],
      image: [Blob,[Validators.required]],
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
    loadCars() {
      console.log(this.selectedLoca);
      const index = this.props.map((p) => p._id).indexOf(this.selectedLoca!);
      console.log(this.props[index]);
      const prop = this.props[index];
      console.log(prop.location.id);
      this.carServ.getCarsFromLocation(prop.location.id).subscribe((response) => {
        this.cars = response.data;
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

    if(this.formScope === 'create'){
      this.packServ
      .createPackage(form.value)
      .subscribe(({ message, data, error}) => {
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
    }
    closeForm(): void {
      this.formCollapse.nativeElement.checked = false;
      this.formTitle = 'Registar nueva Propiedad';
      this.buttonContent = 'Aceptar';
      this.formScope = 'create';
      this.packagesForm.get('image')?.setValidators([Validators.required]);
      this.packagesForm.get('image')?.updateValueAndValidity();
      this.packagesForm.reset();
    }
    

}
