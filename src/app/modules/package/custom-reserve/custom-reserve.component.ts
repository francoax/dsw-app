/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { validateDates } from './form-validators';
import { AppConfigService } from 'src/app/services/app/app.service';

type reserveSummary = {
  car: Car | null;
  medicalAssitance: MedicalAssistance | null;
  property: Property | null;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
};

@Component({
  selector: 'app-custom-reserve',
  templateUrl: './custom-reserve.component.html',
  styleUrls: ['./custom-reserve.component.scss'],
})
export class CustomReserveComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  property!: Property;
  propertyImgSrc! : string;
  cars!: Car[];
  medicalAssitance!: MedicalAssistance[];
  form!: FormGroup;

  @ViewChild('confirmationModal') private modalComponent!: ModalComponent;

  @ViewChild('carSelect') private carSelect!: ElementRef;
  @ViewChild('maSelect') private maSelect!: ElementRef;
  @ViewChild('focus') private scrollIntoView!: ElementRef;
  @ViewChild('carousel') private carouselReserve!: ElementRef;

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
    private readonly packageService: PackageService,
    private readonly reserveService: ReserveService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly toastService: ToastService,
    private readonly appService: AppConfigService
  ) {
    window.scrollTo(0, 0)
  }

  ngAfterViewInit(): void {
    this.appService.setDisplaySearchBar(false);
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ data }) => {
      this.property = data.at(0);
      this.cars = data.at(1).data;
      this.medicalAssitance = data.at(2).data;
    });

    this.propertyImgSrc = `${this.appService.apiUrl}/api/images/${this.property.image}`;

    this.form = this.initForm();

    this.reserveSummary = { ...this.reserveSummary, property: this.property };

    this.$form = this.form.valueChanges
      .pipe(startWith({}), pairwise())
      .subscribe(([prev, next]) => {
        this.updateSummary(prev, next);
      });

    this.scrollIntoView.nativeElement.scrollIntoView();
    this.appService.setDisplaySearchBar(false);
  }

  ngOnDestroy() {
    if (this.$form) {
      this.$form.unsubscribe();
    }
  }

  initForm(): FormGroup {
    return this.fb.group(
      {
        property: [this.property._id, [Validators.required]],
        car: [''],
        medicalAssistance: [''],
        checkIn: ['', [Validators.required]],
        checkOut: ['', [Validators.required]],
      },
      { validator: validateDates() }
    );
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

    this.calculateTotal();
  }

  calculateTotal() {
    if (this.form.hasError('invalidDate')) {
      return;
    }
    const checkIn = new Date(this.form.get('checkIn')?.value);
    const checkOut = new Date(this.form.get('checkOut')?.value);
    const prevCalculate = checkOut.getTime() - checkIn.getTime();
    const totalDays = prevCalculate / (1000 * 3600 * 24) || 0;
    const carPrice = this.reserveSummary.car?.price.value || 0;
    this.reserveSummary.totalPrice =
      carPrice + this.property.pricePerNight.price * totalDays;
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.open();
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
    const newPackage: PackageAgent = {
      car: this.form.value.car,
      medicalAssistance: this.form.value.medicalAssistance,
      property: this.form.value.property,
      type: 'custom',
      nameImage: '',
    };

    this.packageService.createPackage(newPackage).subscribe((res) => {
      if (res.error) {
        this.toastService.setup({ message: res.message, status: false });
        this.toastService.show();
      } else {
        const newReserve: Reserve = {
          date_end: this.form.value.checkOut,
          date_start: this.form.value.checkIn,
          packageReserved: res.data.id,
        };
        this.reserveService.createReserve(newReserve).subscribe({
          next: () => {
            this.router.navigate(['/confirmation'], {
              queryParams: { action: 'success' },
            });
          },
          error: () => {
            this.toastService.setup({ message: 'Error al intentar reservar...', status: false})
            this.toastService.show()
          }
        });
      }
    });
  }

  open(): void {
    this.modalComponent.open();
  }

  cleanCar() {
    if (!this.carSelect.nativeElement.checked) {
      this.form.patchValue({ car: '' });
    }
  }

  cleanMa() {
    if (!this.maSelect.nativeElement.checked) {
      this.form.patchValue({ medicalAssistance: '' });
    }
  }

  back() {
    this.router.navigate(['/']);
  }

  scrollOnCarousel(image : number): void {
    const carouselWidth = this.carouselReserve.nativeElement.clientWidth;

    // Images are numbered from 1 to 4 so thats why we substract 1
    const targetImage = image - 1;

    const targetXPixel = carouselWidth * targetImage + 1;

    this.carouselReserve.nativeElement.scrollTo(targetXPixel, 0);
  }
}
