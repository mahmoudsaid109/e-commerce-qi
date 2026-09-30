import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const errorInterceptor: HttpInterceptorFn = (request, next) => {
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred!';

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }

      console.error('Error from Interceptor:', errorMessage);

      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Something went wrong while connecting to the server. Please try again later.',
        confirmButtonColor: '#d33'
      });

      return throwError(() => new Error(errorMessage));
    })
  );
};
