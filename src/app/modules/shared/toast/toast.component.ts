/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'snackbar',
  template: `
    <div *ngIf="show" class="toast toast-center">
      <div
        class="alert toastPhs"
        [ngClass]="status ? 'response-ok' : 'response-error'"
      >
        <span *ngIf="message">{{ message }}</span>
        <ng-content *ngIf="!message"></ng-content>
        <ng-container *ngIf="status">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </ng-container>
        <ng-container *ngIf="!status">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </ng-container>
      </div>
    </div>
  `,
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  message!: string | undefined;
  show!: boolean;
  status!: boolean;

  constructor(private readonly toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.showToast$.subscribe((visible) => {
      this.show = visible;
    });

    this.toastService.toastConfig$.subscribe((setup) => {
      this.message = setup.message;
      this.status = setup.status;
    });
  }
}
