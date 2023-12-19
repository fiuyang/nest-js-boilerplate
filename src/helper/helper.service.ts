import { HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class HelperService {
  successWrapper(
    response?: Response,
    data?: any,
    message?: string,
  ): Response<any> {
    return response.status(HttpStatus.OK).send({
      success: true,
      msg: message || 'success providing services',
      data: data || [],
      code: HttpStatus.OK,
    });
  }

  createdWrapper(
    response?: Response,
    data?: any,
    message?: string,
  ): Response<any> {
    return response.status(HttpStatus.CREATED).send({
      success: true,
      msg: message || 'data created successfully',
      data: data || [],
      code: HttpStatus.CREATED,
    });
  }

  notFoundWrapper(response: Response, data?: any): Response<any> {
    return response.status(HttpStatus.NOT_FOUND).send({
      success: false,
      msg: 'Data request was not found',
      data: data || [],
      code: HttpStatus.NOT_FOUND,
    });
  }

  conflictWrapper(response: Response, data: any): Response<any> {
    return response.status(HttpStatus.CONFLICT).send({
      success: false,
      msg: 'Data already exists',
      data,
      code: HttpStatus.CONFLICT,
    });
  }
  unauthorizedHelper(response: Response, data?: any): Response<any> {
    return response.status(HttpStatus.UNAUTHORIZED).send({
      success: false,
      msg: 'Unauthorized',
      data,
      code: HttpStatus.UNAUTHORIZED,
    });
  }

  internalServerErrorWrapper(response: Response, error: any): Response<any> {
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      success: false,
      msg: 'Internal Server Error',
      error,
      code: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
  badRequestHelper(
    response: Response,
    error: any,
    message?: string,
  ): Response<any> {
    return response.status(HttpStatus.BAD_REQUEST).send({
      success: false,
      msg: message || 'Bad Request',
      error,
      code: HttpStatus.BAD_REQUEST,
    });
  }
}
