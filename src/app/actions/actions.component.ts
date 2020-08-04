import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Plant} from '../_models';
import {PlantService} from '../_services';

@Component({
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  plant: Plant;
  constructor(
    private router: Router,
    private plantService: PlantService
  ) {}
  ngOnInit() {
    this.plant = JSON.parse(localStorage.getItem('plant'));
  }
  onBack() {
      this.router.navigate(['/home']);
  }
  onDelete() {
    this.plantService.delete().subscribe(
      data => {
        this.router.navigate(['/home']);
      }
    );
  }
  onLight() {
    this.plantService.turnOnLight().subscribe(
      data => {
        this.router.navigate(['/home']);
      }
    );
  }
  onPump() {
    this.plantService.turnOnPump().subscribe(
      data => {
        this.router.navigate(['/home']);
      }
    );
  }
}
