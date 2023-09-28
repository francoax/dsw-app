import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminList } from 'src/app/models/superAdmin';
import { SuperAdminsService } from 'src/app/services/super-admins.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'admins-list',
  templateUrl: './admins-list.component.html',
  styleUrls: ['./admins-list.component.scss']
})
export class AdminsListComponent implements OnInit {

  adminsList : AdminList[] = []

  @Output() UpdateEvent = new EventEmitter<AdminList>()
  @Output() DeleteEvent = new EventEmitter<string>()

  constructor(private readonly adminsSvs : SuperAdminsService) {}

  ngOnInit(): void {
    this.adminsSvs.getAdmins().subscribe((res) => {
      this.adminsList = res.data
    })
  }

  onUpdate(admin : AdminList) : void {
    this.UpdateEvent.emit(admin)
  }

  onDelete(id : string) : void {
    this.DeleteEvent.emit(id)
  }

}
