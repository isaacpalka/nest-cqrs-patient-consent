import {
  Controller,
  Post,
  Body,
  Logger,
  Get,
  //  Param
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { PatientsService } from './patients.service';
import { CreatePatientDto } from './interfaces/create-patient.dto';

@Controller('patients')
@ApiTags('Patients')
export class PatientsController {
  private readonly logger = new Logger(PatientsController.name);

  constructor(private readonly patientService: PatientsService) {}

  @ApiResponse({ status: 201, description: 'Patient created' })
  @Post()
  async createPatient(
    @Body()
    data: CreatePatientDto,
  ) {
    return await this.patientService.createPatient(data);
  }

  @ApiResponse({ status: 200, description: 'Get all patients' })
  @Get()
  async getAllPatients() {
    return await this.patientService.getAllPatients();
  }
}
