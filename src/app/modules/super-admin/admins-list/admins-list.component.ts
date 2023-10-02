import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Admin } from 'src/app/models/superAdmin';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'admins-list',
  templateUrl: './admins-list.component.html',
  styleUrls: ['./admins-list.component.scss']
})
export class AdminsListComponent {

  idToDelete! : string

  @Input() List : Admin[] = []
  @Output() UpdateEvent = new EventEmitter<Admin>()
  @Output() DeleteEvent = new EventEmitter<string>()

  @ViewChild('confirmationModal') confirmationModal! : ModalComponent

  onUpdate(admin : Admin) : void {
    this.UpdateEvent.emit(admin)
  }

  onDelete(id : string) : void {
    this.idToDelete = id
    this.confirmationModal.open()
  }

  onDeleteConfirm() : void {
    this.DeleteEvent.emit(this.idToDelete)
  }

}
