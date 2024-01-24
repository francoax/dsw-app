import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertyType } from 'src/app/models/property-type';
import { PropertyServiceService } from 'src/app/services/property/property-service.service';
import { ToastService } from '../../shared/toast/toast.service';

@Component({
  selector: 'app-property-type-management',
  templateUrl: './property-type-management.component.html',
  styleUrls: ['./property-type-management.component.scss'],
})
export class PropertyTypeManagementComponent implements OnInit {
  @ViewChild('formCollapse') formCollapse!: ElementRef;
  formTitle = '';
  formScope = '';
  formButton = '';
  form!: FormGroup;
  idToUpdate = '';
  propertyTypesList: PropertyType[] = [];

  formBody = {
    create: () => {
      this.formTitle = 'Registrar nuevo Tipo de propiedad';
      this.formScope = 'create';
      this.formButton = 'Agregar';
      this.idToUpdate = '';
      this.formCollapse.nativeElement.checked = false;
    },
    update: (type: PropertyType) => {
      this.formTitle = `Editar tipo de propiedad: ${type.description}`;
      this.formScope = 'update';
      this.formButton = 'Editar';
      this.idToUpdate = type._id;
      this.form.patchValue({
        description: type.description,
      });
      this.formCollapse.nativeElement.checked = true;
    },
  };

  constructor(
    private readonly fb: FormBuilder,
    private readonly propTypesService: PropertyServiceService,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.form = this.initForm();
    this.initList();
    this.formBody.create();
  }

  initForm(): FormGroup {
    return this.fb.group({
      description: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  initList(): void {
    this.propTypesService
      .getPropertiesTypes()
      .subscribe(({ message, data, error }) => {
        if (error) {
          this.toastService.setup({
            message: message,
            status: !error,
          });

          this.toastService.show();
        } else {
          this.propertyTypesList = data;
        }
      });
  }

  onSubmit(formSubmited: FormGroup): void {
    if (this.formScope === 'create') {
      if (formSubmited.valid) {
        this.propTypesService
          .createPropertyType(formSubmited.value)
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
              status: !error,
            });
            this.toastService.show();
            this.propertyTypesList.push(data);
            this.closeForm();
          });
      } else {
        this.form.markAllAsTouched();
        this.toastService.setup({
          message: 'Error, por favor revise el formulario.',
          status: false,
        });
        this.toastService.show();
      }
    }

    if (this.formScope === 'update') {
      if (formSubmited.valid) {
        this.propTypesService
          .updatePropertyType(this.idToUpdate, formSubmited.value)
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
              status: !error,
            });
            this.toastService.show();
            const index = this.propertyTypesList
              .map((a) => a._id)
              .indexOf(data._id);
            this.propertyTypesList[index] = data;
            this.closeForm();
          });
      } else {
        this.form.markAllAsTouched();
        this.toastService.setup({
          message: 'Error, por favor revise el formulario.',
          status: false,
        });
        this.toastService.show();
      }
    }
  }

  onUpdate(type: PropertyType): void {
    this.formBody.update(type);
  }

  onDelete(id: string): void {
    this.propTypesService
      .deletePropertyType(id)
      .subscribe(({ message, error }) => {
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
          status: !error,
        });
        this.toastService.show();
        this.propertyTypesList = [
          ...this.propertyTypesList.filter((t) => t._id !== id),
        ];
      });
  }

  closeForm(): void {
    this.form.reset();
    this.formBody.create();
  }
}
