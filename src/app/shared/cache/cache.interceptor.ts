import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheService } from './cache.service';
import { environment } from 'environments/environment';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    constructor(private cache: CacheService) { }

    intercept(request: HttpRequest<string>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Check if the request method is not GET, if so, proceed without caching
        if (request.method !== 'GET') { return next.handle(request); }

        // Attempt to retrieve cached data based on the request URL
        const cachedData = this.cache.get(request.url);

        if (cachedData) {
            // Check if the cached data has not expired
            const cacheTimestamp = this.cache.get(request.url + "ttl");
            const currentTime = Date.now();

            const ttl = environment.CACHE_TTL;

            // If data is still valid, return the cached response
            if (currentTime - cacheTimestamp <= ttl) {
                return of(new HttpResponse({ body: cachedData }));
            }
        }

        // If no cached data or expired, proceed with the request
        return next.handle(request).pipe(
            tap(event => {
                // If the response is an HttpResponse, cache the data and store the timestamp
                if (event instanceof HttpResponse) {
                    this.cache.set(request.url, event.body);
                    this.cache.set(request.url + "ttl", Date.now());
                }
            })
        );
    }
}
