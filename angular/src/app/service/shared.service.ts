import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  uid() {
    return Array(3)
      .fill(0)
      .map((_) => Math.random().toString(36).substr(2))
      .join('');
  }
}
