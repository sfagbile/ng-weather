import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheService } from './cache.service';
import { environment } from 'environments/environment';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    constructor(private cache: CacheService) { }

    intercept(
        request: HttpRequest<string>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (request.method !== 'GET') {
            return next.handle(request);
        }

        console.log(request.url);
        const cachedData = this.cache.get(request.url);
        console.log(cachedData);

        if (cachedData) {
            // Check if the cached data has not expired
            const cacheTimestamp = this.cache.getTimestamp(request.url);
            const currentTime = Date.now();

            const ttl = environment.CACHE_TTL;
            if (currentTime - cacheTimestamp <= ttl) {
                return of(new HttpResponse({ body: cachedData }));
            }
        }

        return next.handle(request).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    this.cache.set(request.url, event.body);
                    // Store the timestamp
                    this.cache.setTimestamp(request.url, Date.now());
                }
            })
        );
    }
}
