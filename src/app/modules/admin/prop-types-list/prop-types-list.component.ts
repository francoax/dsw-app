import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { PropertyType } from 'src/app/models/property-type';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-prop-types-list',
  templateUrl: './prop-types-list.component.html',
  styleUrls: ['./prop-types-list.component.scss'],
})
export class PropTypesListComponent {
  @ViewChild('confirmationModal') confirmationModal!: ModalComponent;
  @Input() typesList: PropertyType[] = [];
  @Output() UpdateEvent = new EventEmitter<PropertyType>();
  @Output() DeleteEvent = new EventEmitter<string>();

  idToDelete = '';

  onUpdate(id: string): void {
    const typeToUpdate = this.typesList.find((t) => t._id === id);
    this.UpdateEvent.emit(typeToUpdate);
  }

  onDelete(id: string): void {
    this.idToDelete = id;
    this.confirmationModal.open();
  }

  onDeleteConfirm(): void {
    this.DeleteEvent.emit(this.idToDelete);
  }
}
