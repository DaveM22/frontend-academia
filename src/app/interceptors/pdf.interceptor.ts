import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PdfInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Solo interceptamos las peticiones que esperan un PDF
    if (request.responseType === 'blob') {
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof Blob) {
            // Wrap the promise in an Observable and cast to the correct type
            return from(new Promise<HttpEvent<unknown>>((_, reject) => {
              const reader = new FileReader();
              reader.onload = () => {
                try {
                  const errorBody = JSON.parse(reader.result as string);
                  // Crear un nuevo error con el cuerpo parseado
                  const newError = new HttpErrorResponse({
                    error: errorBody,
                    headers: error.headers,
                    status: error.status,
                    statusText: error.statusText,
                    url: error.url || undefined
                  });
                  reject(newError);
                } catch {
                  reject(error);
                }
              };
              reader.onerror = () => reject(error);
              reader.readAsText(error.error);
            }));
          }
          return throwError(() => error);
        })
      );
    }
    return next.handle(request);
  }
}
