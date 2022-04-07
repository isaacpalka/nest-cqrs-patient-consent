import {
  Controller,
  Post,
  Put,
  Body,
  Logger,
  Get,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { PatientsService } from './patients.service';
import { CreatePatientDto } from './interfaces/create-patient.dto';
import { ChangePatientNameDto } from './interfaces/change-patient-name.dto';
import { GrantConsentDto } from './interfaces/grant-consent.dto';
import { RevokeConsentDto } from './interfaces/revoke-consent.dto';

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

  @ApiResponse({ status: 201, description: 'Patient name changed' })
  @Put('change-name')
  async changePatientName(
    @Body()
    data: ChangePatientNameDto,
  ) {
    return await this.patientService.changePatientName(data);
  }

  @ApiResponse({ status: 201, description: 'Grant consent' })
  @Put('grant-consent')
  async grantConsent(
    @Body()
    data: GrantConsentDto,
  ) {
    return await this.patientService.grantConsent(data);
  }

  @ApiResponse({ status: 201, description: 'Revoke consent' })
  @Put('revoke-consent')
  async revokeConsent(
    @Body()
    data: RevokeConsentDto,
  ) {
    return await this.patientService.revokeConsent(data);
  }

  @ApiResponse({ status: 200, description: 'Get all patients' })
  @Get()
  async getAllPatients() {
    return await this.patientService.getAllPatients();
  }

  @ApiResponse({ status: 200, description: 'Get patient consents' })
  @Get(':id/consents/:entity_id')
  async getConsents(@Param() params) {
    const { id, entity_id } = params;
    return await this.patientService.getConsents({ id, entity_id });
  }
}
