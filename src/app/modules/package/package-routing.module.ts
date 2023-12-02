import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservePackageComponent } from './reserve-package/reserve-package.component';
import { ReservesListComponent } from './reserves-list/reserves-list.component';
import { CustomReserveComponent } from './custom-reserve/custom-reserve.component';
import { customReserveResolver } from 'src/app/resolvers/custom-reserve.resolver';
import { PackageResolverService } from 'src/app/resolvers/package.resolver.service';
import { MedicalAssistanceResolverService } from 'src/app/resolvers/MedicalAssist.resolver.service';
import { CarResolverService } from 'src/app/resolvers/car.resolver.service';
import { PropertyResolverService } from 'src/app/resolvers/property.resolver.service';
import { LocationResolverService } from 'src/app/resolvers/location.resolver.service';
import { packageResolver } from 'src/app/services/package/package.service';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [
  {
    path: ':id',
    component: ReservePackageComponent,
    resolve: { pack: packageResolver },
  },
  {
    path: 'reserves',
    component: ReservesListComponent,
    resolve: {
      propertyList: PropertyResolverService,
      packages: PackageResolverService,
      cars: CarResolverService,
      medAssists: MedicalAssistanceResolverService,
      locations: LocationResolverService,
    },
  },
  {
    path: 'confirmation',
    component: NotificationsComponent,
  },
  {
    path: 'reserve/:id',
    component: CustomReserveComponent,
    resolve: { data: customReserveResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackageRoutingModule {}
