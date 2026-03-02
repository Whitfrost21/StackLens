import type { CreateLogDTO, GetLogsDTO } from "../models/logs.models.js";
import { LogRepository } from "../repositories/log.repository.js";

//log service
export class LogService {
  static async createlog(data: CreateLogDTO) {
    return LogRepository.create(data);
  }

  static async getLogs(filters: GetLogsDTO) {
    return LogRepository.findAll(filters);
  }
}
