import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NormalizeStringService {

  constructor() { }
  nfd(characteres: string): string {
    return characteres.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}
