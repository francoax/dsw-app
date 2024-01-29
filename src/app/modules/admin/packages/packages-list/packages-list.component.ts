/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */

import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import Package from 'src/app/models/package';
import { ModalComponent } from 'src/app/modules/shared/modal/modal.component';
@Component({
  selector: 'app-packages-list',
  templateUrl: './packages-list.component.html',
  styleUrls: ['./packages-list.component.scss']
})
export class PackagesListComponent {

  idPackDelete!: string;
  @ViewChild('confirmationModal') confirmationModal!: ModalComponent;
  @Input() paquetes: Package[] = [];
  @Output() UpdateEvent = new EventEmitter<Package>();
  @Output() DeleteEvent = new EventEmitter<string>();

  onUpdate(pack: Package): void {
    this.UpdateEvent.emit(pack);
  }
  onDeleteConfirm(): void {
    this.DeleteEvent.emit(this.idPackDelete);
  }
  
  onDelete(id: string): void {
    this.idPackDelete = id;
    this.confirmationModal.open();
  }

}