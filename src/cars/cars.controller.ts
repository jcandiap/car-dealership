import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDTO, UpdateCarDTO } from './dto';

@Controller('cars')
// @UsePipes( ValidationPipe )
export class CarsController {

    constructor(
        private readonly carsService:CarsService
    ) {}

    @Get()
    getAllCars() {
        return this.carsService.findAll();
    }

    @Get(':id')
    getCarById(
        @Param('id', ParseUUIDPipe) id:string
    ) {
        return this.carsService.findOneById(id);
    }

    @Post()
    createCar(
        @Body() createCarDto:CreateCarDTO
    ) {
        return this.carsService.create( createCarDto );
    }

    @Patch(':id')
    updateCar(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateCarDto: UpdateCarDTO
    ) {
        return this.carsService.update(id, updateCarDto);
    }

    @Delete(':id')
    deleteCard(
        @Param('id', ParseUUIDPipe) id: string
    ) {
        this.carsService.delete(id);
        
        return {
            method: 'delete',
            id
        }
    }

}
