import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MedicalAssistanceRequest } from 'src/app/models/medical-assistance-request';
import { MedicalAssistance } from 'src/app/models/medical-assistance'
import { MedicalAssistanceService } from 'src/app/services/medical-assitance/medical-assistance.service';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-medical-assistance',
  templateUrl: './medical-assistance.component.html',
  styleUrls: ['./medical-assistance.component.scss']
})
export class MedicalAssistanceComponent implements OnInit{

  _id = new FormControl('');
  description = new FormControl('',Validators.required);
  coverageType = new FormControl('',Validators.required);

  public registros: MedicalAssistance[] = [];
  public mod : string = 'add'; 
  public registro !: MedicalAssistance;

  @ViewChild('my_modal') myModal!: ElementRef;
  @ViewChild('confirmationModal') private modalComponent! : ModalComponent;

  public medicalAssistForm = this.formBuilder.group({
    _id: this._id,
    description: this.description,
    coverageType: this.coverageType 
  })

  constructor(public formBuilder: FormBuilder, 
              private medAsistService : MedicalAssistanceService){
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.medAsistService.getAll().subscribe(res =>{
      console.log(res.data)
      this.registros = res.data;
    })
  }

  add(form : FormGroup){
    this.mod='add';
    const medAsist : MedicalAssistanceRequest = {
      description : form.value.description || '',
      coverageType : form.value.coverageType || ''
    }
    this.medAsistService.add(medAsist).subscribe(res => {
      if(res.error !== true){
        const dialogElement = this.myModal.nativeElement as HTMLDialogElement;
        dialogElement.close();
        this.medicalAssistForm.reset();
        this.getAll();
      }
    });
  }

  cancel(){
    this.medicalAssistForm.reset();
    this.mod = 'add';
  }

  onDelete(registro : MedicalAssistance){
    this.modalComponent.open();
    this.registro = registro;
  }

  delete(){
    this.medAsistService.delete(this.registro).subscribe(res => {
      if(res.error !== true){
        console.log(this.registro);
        this.getAll();
      }
    });
  }

  onModify(registro : MedicalAssistance){

    this.mod = 'modify';

    const data = {
      _id: registro._id,
      description: registro.description,
      coverageType: registro.coverageType
    };

    this.medicalAssistForm.patchValue(data);

    const dialogElement = this.myModal.nativeElement as HTMLDialogElement;
    dialogElement.showModal();
  }

  modify(){
    const medAsist : MedicalAssistance = {
      _id: this.medicalAssistForm.value._id || '',
      description : this.medicalAssistForm.value.description || '',
      coverageType : this.medicalAssistForm.value.coverageType || ''
    }

    this.medAsistService.edit(medAsist).subscribe(res => {
      if(res.error !== true){
        const dialogElement = this.myModal.nativeElement as HTMLDialogElement;
        dialogElement.close();
        this.medicalAssistForm.reset();
        this.getAll();
        this.mod='add'
      }
    });
  }
}
