/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReserveList } from 'src/app/models/reserve';
import { ReserveService } from 'src/app/services/reserve/reserve.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ToastService } from '../../shared/toast/toast.service';
import { SkeletonsService } from 'src/app/services/skeletons/skeletons.service';

@Component({
  selector: 'app-reserves-list',
  templateUrl: './reserves-list.component.html',
  styleUrls: ['./reserves-list.component.scss'],
})
export class ReservesListComponent implements OnInit {
  reserves: ReserveList[] = [];
  reservesFiltered: ReserveList[] = [];
  dateFilterForm = new FormGroup({
    radioOption: new FormControl('', Validators.required),
    dateFilter: new FormControl('', Validators.required),
  });
  selectedReserveId = '';
  error = false;
  $isLoading = this.skeletonService.userReservesLoading$;

  @ViewChild('confirmationModal') private modalComponent!: ModalComponent;

  constructor(
    private reserveService: ReserveService,
    private router: Router,
    private toastService: ToastService,
    private readonly skeletonService: SkeletonsService
  ) {}

  ngOnInit() {
    this.skeletonService.showUserReservesLoading();
    this.reserveService
      .getReservesByUser()
      .subscribe(({ message, data, error }) => {
        if (error) {
          console.log(error);
          return;
        }
        console.log(message);
        this.reserves = data.sort(
          (a: { date_start: Date }, b: { date_start: Date }) =>
            a.date_start > b.date_start ? -1 : 1
        );
        this.reservesFiltered = this.reserves;
        this.skeletonService.hideUserReservesLoading();
      });
  }

  calculateTotalPrice(
    days: number,
    propertyPrice: number,
    carPrice: number
  ): number {
    return days * propertyPrice + carPrice;
  }

  filterReserves() {
    if (this.dateFilterForm.value.radioOption === 'option1') {
      this.reservesFiltered = this.reserves.filter(
        (reserve) =>
          new Date(reserve.date_start) >
          new Date(this.dateFilterForm.value.dateFilter as string)
      );
    }

    if (this.dateFilterForm.value.radioOption === 'option2') {
      this.reservesFiltered = this.reserves.filter(
        (reserve) =>
          new Date(reserve.date_end) <=
          new Date(this.dateFilterForm.value.dateFilter as string)
      );
    }
  }

  resetFilter() {
    this.reservesFiltered = this.reserves;
    this.dateFilterForm.reset();
  }

  openModal(event: Event) {
    this.selectedReserveId = (event.target as HTMLButtonElement).id;
    this.modalComponent.open();
  }

  cancelReserve() {
    this.reserveService.deleteReserve(this.selectedReserveId).subscribe({
      next: () => {
        this.router.navigate(['/confirmation'], {
          queryParams: { action: 'cancel' },
        });
      },
      error: () => {
        this.toastService.setup({
          message: 'Error al cancelar reserva',
          status: false,
        });
        this.toastService.show();
      },
    });
    this.selectedReserveId = '';
  }

  checkCurrentReserve(reserve: ReserveList): boolean {
    const today = new Date();
    const dateStart = new Date(reserve.date_start);
    const dateEnd = new Date(reserve.date_end);
    if ((today > dateStart && today < dateEnd) || today > dateEnd) return true;
    return false;
  }
}
