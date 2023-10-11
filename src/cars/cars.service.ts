import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Car } from './interfaces/car.interface';
import { CreateCarDTO, UpdateCarDTO } from './dto';

@Injectable()
export class CarsService {

    private cars: Car[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla'
        }, 
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic'
        }, 
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee'
        }
    ];

    public findAll() {
        return this.cars;
    }

    public findOneById(id:string) {
        const carFound = this.cars.find(car => car.id === id);
        if( !carFound ) throw new NotFoundException(`Car with ID [${ id }] not found`);
        return carFound;
    }

    public create(createCarDto:CreateCarDTO) {
        const car: Car = {
            id: uuid(),
            ...createCarDto
        }
        this.cars.push(car);
        return car;
    }

    public update(id:string, updateCarDto:UpdateCarDTO) {
        let carDB = this.findOneById(id);

        if( updateCarDto.id && updateCarDto.id !== id ) {
            throw new BadRequestException(`Car id is not valid inside body`);
        }

        this.cars = this.cars.map( car => {
            if( car.id === id ) {
                carDB = {...carDB, ...updateCarDto, id }
                return carDB;
            }
            return car;
        } )

        return carDB;
    }

    public delete(id: string) {
        this.findOneById(id);

        this.cars = this.cars.filter(car => car.id !== id);
    }
}
