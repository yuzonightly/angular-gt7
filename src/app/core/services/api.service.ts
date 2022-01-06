import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { JwtService } from "./jwt.service";
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http'

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
}