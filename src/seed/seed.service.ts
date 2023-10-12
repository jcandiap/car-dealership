import { Injectable } from '@nestjs/common';
import { CarsService } from 'src/cars/cars.service';
import { CAR_SEED } from './database/cars.seed';
import { BrandsService } from 'src/brands/brands.service';
import { BRAND_SEED } from './database/brands.seed';

@Injectable()
export class SeedService {
  
  constructor(
    private readonly carsService:CarsService,
    private readonly beandsService:BrandsService
  ) {}

  populateDb() {
    this.carsService.fillCarsWithSeedData(CAR_SEED);
    this.beandsService.fillBrandsWithSeedData(BRAND_SEED);
    return `Seed executed`;
  }

}
