import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private timestamps: { [key: string]: number } = {};

  get(key: string) {
    const cachedData = sessionStorage.getItem(key);
    return cachedData ? JSON.parse(cachedData) : null;
  }

  getTimestamp(key: string) {
    return this.timestamps[key] || 0;
  }

  set(key: string, value: any | null) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  setTimestamp(key: string, timestamp: number) {
    this.timestamps[key] = timestamp;
  }
}
