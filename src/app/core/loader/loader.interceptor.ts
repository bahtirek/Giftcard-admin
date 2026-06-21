// loading.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';
import { SHOW_LOADER } from './loader-context.token';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.context.get(SHOW_LOADER)) {
    return next(req); // skip loader entirely
  }

  const loading = inject(LoaderService);
  loading.show();
  return next(req).pipe(finalize(() => loading.hide()));
};

/*
How to use it
import { HttpContext } from '@angular/common/http';
import { SHOW_LOADER } from './loading-context.token';

// triggers the loader ✅
this.http.get('/api/data', {
  context: new HttpContext().set(SHOW_LOADER, true)
});

// no loader ✅
this.http.get('/api/data'); */
