import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Cactus, Flower, Herb, Plant} from '../_models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PlantService} from '../_services';

@Component({
  templateUrl: './new-plant.component.html',
  styleUrls: ['./new-plant.component.scss']
})
export class NewPlantComponent implements OnInit {
  newPlantForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  plant: Plant = new Plant();
  flower: Flower = new Flower();
  herb: Herb = new Herb();
  cactus: Cactus = new Cactus();
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private plantService: PlantService
  ) {}
  ngOnInit() {
    this.newPlantForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required]
    });
  }
  onBack() {
    this.router.navigate(['/home']);
  }
  get f() { return this.newPlantForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.newPlantForm.invalid) {
      return;
    }
    this.loading = true;
    this.plant.name = this.f.name.value;
    if (this.f.type.value === '1') {
      this.plant.typeId = 1;
      this.plant.moistureLimit = this.flower.moistureLimit;
      this.plant.photoLimit = this.flower.photoLimit;
    } else if (this.f.type.value === '2') {
      this.plant.typeId = 2;
      this.plant.moistureLimit = this.herb.moistureLimit;
      this.plant.photoLimit = this.herb.photoLimit;
    } else {
      this.plant.typeId = 3;
      this.plant.moistureLimit = this.cactus.moistureLimit;
      this.plant.photoLimit = this.cactus.photoLimit;
    }
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.plant.userId = currentUser.userId;
    this.plantService.create(
      this.plant.userId,
      this.plant.typeId,
      this.plant.moistureLimit,
      this.plant.photoLimit,
      this.plant.name
    ).subscribe(
      data => {
        this.router.navigate(['/home']);
      },
      error => {
        console.log(error);
        this.error = error;
        this.loading = false;
      }
    );
    this.loading = false;
  }
}
