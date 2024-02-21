import { BadRequestException } from '@nestjs/common'
import dayjs from 'dayjs'

export class ValidateProperties {
  static isAfterPropertyDate(startDate: Date, endDate: Date) {
    if (dayjs(startDate).isAfter(dayjs(endDate)))
      throw new BadRequestException('The start date cannot be greater than the end date.')
    return true
  }

  static isAfterPropertyTime(startTime: Date, endTime: Date) {
    if (dayjs(`1900-01-01T${startTime}`).isAfter(dayjs(`1900-01-01T${endTime}`)))
      throw new BadRequestException('The start time cannot be greater than the end time.')
    return true
  }
}
