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
import { Property } from 'src/app/models/property';
import Reserve from 'src/app/models/reserve';
import { ReserveService } from 'src/app/services/reserve/reserve.service';
import { ModalComponent } from '../../shared/modal/modal.component';

interface PackageFull {
  type: string;
  property: Property;
  car: Car;
  medicalAssistance: MedicalAssistance;
  nameImage: string;
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

@Component({
  selector: 'app-reserve-package',
  templateUrl: './reserve-package.component.html',
  styleUrls: ['./reserve-package.component.scss'],
})
export class ReservePackageComponent implements OnInit {
  packageId!: string; //el componente recibe el paquete por query param
  package!: PackageFull;
  reserveForm!: FormGroup;
  checkIn = new FormControl('', Validators.required);
  checkOut = new FormControl('', Validators.required);
  error = false;

  @ViewChild('confirmationModal') private modalComponent!: ModalComponent;

  constructor(
    private reserveService: ReserveService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ pack }) => {
      this.package = pack.data;
    });

    this.reserveForm = new FormGroup(
      {
        checkIn: this.checkIn,
        checkOut: this.checkOut,
      },
      validateDates
    );
  }

  onSubmit() {
    if (this.reserveForm.valid) {
      const { token } = JSON.parse(localStorage.getItem('loggedUser') || '');
      const reserve: Reserve = {
        date_start: this.reserveForm.value.dateStart,
        date_end: this.reserveForm.value.dateEnd,
        packageReserved: this.packageId,
      };
      this.reserveService.createReserve(reserve, token).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: () => {
          alert('error');
        },
      });
    } else {
      alert('Verifique que los campos sean correctos');
    }
  }

  openModal(): void {
    this.modalComponent.open();
  }
}
