import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SetupService } from '../services/setup.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    private setupService: SetupService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.setupService.isAuthenticatedUser$()
    .pipe(
      map((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          return true;
        } else {
          this.router.navigate(['/access-denied']);
        }
      })
    );
  }
}
