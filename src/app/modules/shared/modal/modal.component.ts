/* eslint-disable @angular-eslint/component-selector */
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'confirmation-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @ViewChild('dialog') dialog!: ElementRef
  @Output() confirmationEvent = new EventEmitter<void>()

  open(): void {
    this.dialog.nativeElement.showModal()
  }

  onConfirm() : void {
    this.confirmationEvent.emit()
  }

}
