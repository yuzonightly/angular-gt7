import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Circuit } from '../shared/models/circuit.model';

@Injectable()
export class CircuitService {

    constructor(private http: HttpClient) { }

    getCircuits(): Observable<Circuit[]> {
        return this.http.get<Circuit[]>('/api/circuits');
    }

    countCircuits(): Observable<number> {
        return this.http.get<number>('/api/circuits/count');
    }

    addCircuit(circuit: Circuit): Observable<Circuit> {
        return this.http.post<Circuit>('/api/circuit', circuit);
    }

    getCircuit(circuit: Circuit): Observable<Circuit> {
        return this.http.get<Circuit>(`/api/circuit/${circuit._id}`);
    }

    editCircuit(circuit: Circuit): Observable<any> {
        return this.http.put(`/api/circuit/${circuit._id}`, circuit, { responseType: 'text' });
    }

    deleteCircuit(circuit: Circuit): Observable<any> {
        return this.http.delete(`/api/circuit/${circuit._id}`, { responseType: 'text' });
    }

}
