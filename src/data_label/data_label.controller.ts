import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DataLabelService } from './data_label.service';

@Controller('data-label')
export class DataLabelController {
  constructor(private readonly dataLabelService: DataLabelService) {}

  @Get()
  findAll() {
    return this.dataLabelService.findAll();
  }
}
