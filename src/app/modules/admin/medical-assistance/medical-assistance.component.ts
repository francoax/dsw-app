import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MedicalAssistanceRequest } from 'src/app/models/medical-assistance-request';
import { MedicalAssistance } from 'src/app/models/medical-assistance';
import { MedicalAssistanceService } from 'src/app/services/medical-assitance/medical-assistance.service';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-medical-assistance',
  templateUrl: './medical-assistance.component.html',
  styleUrls: ['./medical-assistance.component.scss'],
})
export class MedicalAssistanceComponent implements OnInit {
  _id = new FormControl('');
  description = new FormControl('', Validators.required);
  coverageType = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  public registros: MedicalAssistance[] = [];
  public mod = 'add';
  public collapse = false;
  public registro!: MedicalAssistance;
  public textAlert = '';
  public hasError = false;

  @ViewChild('details') details!: ElementRef;
  @ViewChild('confirmationModal') private modalComponent!: ModalComponent;

  public medicalAssistForm = this.formBuilder.group({
    _id: this._id,
    description: this.description,
    coverageType: this.coverageType,
    price: this.price,
  });

  constructor(
    public formBuilder: FormBuilder,
    private medAsistService: MedicalAssistanceService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.medAsistService.getAll().subscribe((res) => {
      this.registros = res.data;
    });
  }

  add(form: FormGroup) {
    this.mod = 'add';
    const medAsist: MedicalAssistanceRequest = {
      description: form.value.description || '',
      coverageType: form.value.coverageType || '',
      price: form.value.price || '',
    };
    this.medAsistService.add(medAsist).subscribe((res) => {
      if (res.error !== true) {
        this.medicalAssistForm.reset();
        this.getAll();
        this.hasError = false;
        this.textAlert = '';
      } else {
        this.hasError = true;
        this.textAlert = res.message;
      }
    });
  }

  toggleCollapse() {
    this.collapse = !this.collapse;
  }

  cancel() {
    this.medicalAssistForm.reset();
    this.mod = 'add';
    this.collapse = false;
  }

  onDelete(registro: MedicalAssistance) {
    this.modalComponent.open();
    this.registro = registro;
  }

  delete() {
    this.medAsistService.delete(this.registro).subscribe((res) => {
      if (res.error !== true) {
        this.getAll();
        this.hasError = false;
        this.textAlert = '';
      } else {
        this.hasError = true;
        this.textAlert = res.message;
      }
    });
  }

  onModify(registro: MedicalAssistance) {
    this.mod = 'modify';
    if (this.collapse === false) {
      this.toggleCollapse();
    }

    const data = {
      _id: registro._id,
      description: registro.description,
      coverageType: registro.coverageType,
    };

    this.medicalAssistForm.patchValue(data);
  }

  modify() {
    const medAsist: MedicalAssistance = {
      _id: this.medicalAssistForm.value._id || '',
      description: this.medicalAssistForm.value.description || '',
      coverageType: this.medicalAssistForm.value.coverageType || '',
      price: Number(this.medicalAssistForm.value.price) || 1000,
    };

    this.medAsistService.edit(medAsist).subscribe((res) => {
      if (res.error !== true) {
        this.medicalAssistForm.reset();
        this.getAll();
        this.mod = 'add';
        this.hasError = false;
        this.textAlert = '';
      } else {
        this.hasError = true;
        this.textAlert = res.message;
      }
    });
  }
}
