import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { JwtService } from "./jwt.service";
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Injectable()
export class ApiService {
    constructor(
        private http: HttpClient,
        private jwtService: JwtService,
    ) { }

    private formatErrors(error: any) {
        return throwError(() => {
            new error(error.error);
        });
    }

    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get(`${environment.api_url}${path}`, { params }).pipe(catchError(this.formatErrors));
    }

    put(path: string, body: Object = {}) {

    }
}