import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { ActionsComponent } from './actions';
import { AuthGuard } from './_helpers';
import {NewPlantComponent} from './new-plant';
import {ViewMoreComponent} from './viewMore';
import { ConfigurationComponent } from './configuration';
import { RatingComponent } from "./rating";
import { NotificationComponent } from "./notification";
import { ProfileComponent } from "./profile";
import { ChartComponent } from "./chart";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'actions', component: ActionsComponent, canActivate: [AuthGuard] },
  { path: 'new-plant', component: NewPlantComponent, canActivate: [AuthGuard] },
  { path: 'view-more', component: ViewMoreComponent, canActivate: [AuthGuard] },
  { path: 'configuration', component: ConfigurationComponent, canActivate: [AuthGuard] },
  { path: 'rating', component: RatingComponent, canActivate: [AuthGuard] },
  { path: 'notification', component: NotificationComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'chart', component: ChartComponent, canActivate: [AuthGuard] },
  // otherwise redirect to home
  { path: '**', redirectTo: 'home' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
