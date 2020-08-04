import {Component, OnInit} from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { Plant } from '../_models';
import { PlantService } from '../_services';

@Component({
  templateUrl: './home_old.component.html',
  styleUrls: ['./home_old.component.scss']
})
export class Home_oldComponent {
  loading = false;
  plants: Plant[] = [];
  all: Plant[] = [];
  flowers: Plant[] = [];
  herbs: Plant[] = [];
  cactus: Plant[] = [];
  selectedType = 'all';
  displayedColumns: string[] = ['name', 'moistureLimit', 'photoLimit', 'actions', 'viewDetails'];
  constructor(
    private plantService: PlantService,
    private router: Router
  ) { }

  // constructor(private userService: UserService) { }
  //
  ngOnInit() {
    this.loading = true;
    this.plantService.getAll().pipe(first()).subscribe(plants => {
      this.loading = false;
      this.all = this.plants = plants;
      plants.map((plant, index) => {
        if (plant.typeId === 1) {
          this.flowers.push(plant);
        } else if (plant.typeId === 2) {
          this.herbs.push(plant);
        } else if (plant.typeId === 3) {
          this.cactus.push(plant);
        }
      });
    });
  }
  onAll() {
    this.plants = this.all;
    this.selectedType = 'all';
  }
  onFlowers() {
    this.plants = this.flowers;
    this.selectedType = 'flowers';
  }
  onHerbs() {
    this.plants = this.herbs;
    this.selectedType = 'herbs';
  }
  onCactus() {
    this.plants = this.cactus;
    this.selectedType = 'cactus';
  }
  onAddNewPlant() {
    this.router.navigate(['/new-plant']);
  }
  onAction(plant) {
    localStorage.setItem('plant', JSON.stringify(plant));
    this.router.navigate(['/actions']);
  }
  onViewDetails(plant) {
    localStorage.setItem('plant', JSON.stringify(plant));
    this.router.navigate(['/view-more']);
  }
}

