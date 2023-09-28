import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AdminList } from 'src/app/models/superAdmin';
import { SuperAdminsService } from 'src/app/services/super-admins.service';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'admins-list',
  templateUrl: './admins-list.component.html',
  styleUrls: ['./admins-list.component.scss']
})
export class AdminsListComponent implements OnInit {

  adminsList : AdminList[] = []
  idToDelete! : string

  @Output() UpdateEvent = new EventEmitter<AdminList>()
  @Output() DeleteEvent = new EventEmitter<string>()

  @ViewChild('confirmationModal') confirmationModal! : ModalComponent

  constructor(private readonly adminService : SuperAdminsService) {}

  ngOnInit(): void {
    this.adminService.getAdmins().subscribe((res) => {
      this.adminsList = res.data
    })
  }

  onUpdate(admin : AdminList) : void {
    this.UpdateEvent.emit(admin)
  }

  onDelete(id : string) : void {
    this.idToDelete = id
    this.confirmationModal.open()
  }

  onDeleteConfirm() : void {
    this.adminService.deleteAdmin(this.idToDelete)
  }

}
