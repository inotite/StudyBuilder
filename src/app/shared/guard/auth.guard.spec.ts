import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, Observable } from 'rxjs';

class MockRouter {
  navigate(path) {}
}

describe('AuthGuard', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        AuthGuard
      ]
    });
  }));

  describe('canActivate', () => {
    let authGuard: AuthGuard;
    let authService;
    let router;

    const createMockRoute = (id: string) => {
      return {
        params: { id: id }
      } as any;
    };

    const createMockRouteState = () => null;
    let guard: AuthGuard;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          AuthGuard,
        ]
      });

      guard = TestBed.get(AuthGuard);
    });

    const route = createMockRoute(null);
    const state = createMockRouteState();

    it('should return true for a logged in user', () => {
      authService = { isAuthenticatedUser$: () => of(true) };
      router = new MockRouter();
      authGuard = new AuthGuard(router, authService);
      const activatedGuard = authGuard.canActivate(route, state) as Observable<Boolean>;
      activatedGuard.subscribe((res) => {
        expect(res).toBe(true);
      });
    });

    it('should navigate to access denied page for unauthenticated user', () => {
      authService = { isAuthenticatedUser$: () => of(false) };
      router = new MockRouter();
      authGuard = new AuthGuard(router, authService);
      spyOn(router, 'navigate');

      const activatedGuard = authGuard.canActivate(route, state) as Observable<Boolean>;
      activatedGuard.subscribe((res) => {});

      expect(router.navigate).toHaveBeenCalledWith(['/access-denied']);
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
