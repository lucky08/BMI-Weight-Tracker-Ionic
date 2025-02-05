import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeightDate } from 'src/app/core/models/weight-date.model';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class WeightDateService {
  constructor(private http: HttpClient) {}

  getAllByUserProfileId(userProfileId: number) {
    return this.http.get<WeightDate[]>(`${BACKEND_URL}/weight-date/${userProfileId}`);
  }

  save(weightDate: WeightDate) {
    return this.http.post<WeightDate>(`${BACKEND_URL}/weight-date`, weightDate);
  }

  update(weightDate: WeightDate) {
    return this.http.patch<WeightDate>(`${BACKEND_URL}/weight-date`, weightDate);
  }

  delete(weightDateId: number) {
    return this.http.delete<WeightDate>(`${BACKEND_URL}/weight-date/${weightDateId}`);
  }
}
