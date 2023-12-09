/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { PropertyServiceService } from 'src/app/services/property/property-service.service';
import { Property, PropertyV2 } from 'src/app/models/property';
import { PropertyType } from 'src/app/models/property-type';
import { Router } from '@angular/router';
import { ModalComponent } from '../../shared/modal/modal.component';
@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss'],
})
export class PropertyListComponent implements OnChanges {
  constructor(
    private service: PropertyServiceService,
    private router: Router
  ) {}

  propertiesTypes: PropertyType[] = [];
  idPropDelete!: string;
  @ViewChild('confirmationModal') confirmationModal!: ModalComponent;
  @Input() properties: PropertyV2[] = [];
  @Output() UpdateEvent = new EventEmitter<PropertyV2>();
  @Output() DeleteEvent = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['properties'] && !changes['properties'].firstChange) {
      // Angular se encargará automáticamente de actualizar el ngFor
      console.log('Lista actualizada en tiempo real:', this.properties);
    }
  }

  onUpdate(prop: PropertyV2): void {
    this.UpdateEvent.emit(prop);
  }

  onDeleteConfirm(): void {
    this.DeleteEvent.emit(this.idPropDelete);
  }
  onDelete(id: string): void {
    this.idPropDelete = id;
    this.confirmationModal.open();
  }

  nav() {
    this.router.navigate(['CreateProperty']);
  }
}
