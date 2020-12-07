import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type EntityResponseType = HttpResponse<any>;
type EntityArrayResponseType = HttpResponse<any[]>;

@Injectable({ providedIn: 'root' })
export class AppComponentService {
  public resourceUrl = 'http://localhost:8080/api';

  constructor(protected http: HttpClient) {}

  create(objetoDTO: any): Observable<EntityResponseType> {
    return this.http
      .post<any>(`${this.resourceUrl}/pessoas`, objetoDTO, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  getCandidatesByState(): Observable<EntityArrayResponseType> {
    return this.http
      .get<any[]>(`${this.resourceUrl}/candidatos`, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  getAverageByAge(): Observable<EntityArrayResponseType> {
    return this.http
      .get<any[]>(`${this.resourceUrl}/media-imc-idade`, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  getAverageOfObeseByGender(): Observable<EntityArrayResponseType> {
    return this.http
      .get<any[]>(`${this.resourceUrl}/media-obesos-generos`, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  getAverageByBloodType(): Observable<EntityArrayResponseType> {
    return this.http
      .get<any[]>(`${this.resourceUrl}/media-tipo-sanguineo`, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  getDonorsByBloodType(): Observable<EntityArrayResponseType> {
    return this.http
      .get<any[]>(`${this.resourceUrl}/doadores-tipo-sanguineo`, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

}
