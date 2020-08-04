import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Plant} from '../_models';
import {PlantService} from '../_services';

@Component({
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
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
}
