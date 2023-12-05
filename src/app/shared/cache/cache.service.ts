import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  // Retrieve data from the session storage based on the key
  get(key: string) {
    const cachedData = sessionStorage.getItem(key);
    return cachedData ? JSON.parse(cachedData) : null;
  }

  // Store data in the session storage based on the key
  set(key: string, value: any | null) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}
