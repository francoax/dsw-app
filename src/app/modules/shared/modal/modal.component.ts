/* eslint-disable @angular-eslint/component-selector */
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'confirmation-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @ViewChild('dialog') dialog!: ElementRef
  @Output() confirmationEvent = new EventEmitter<void>()

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  open(): void {
    this.dialog.nativeElement.showModal()
  }

  onConfirm() : void {
    this.confirmationEvent.emit()
  }

}
