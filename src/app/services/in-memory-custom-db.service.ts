import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryCustomDbService implements InMemoryDbService {
  createDb() {
    const db=[]
    return {db}
  }

  constructor() {}
}
