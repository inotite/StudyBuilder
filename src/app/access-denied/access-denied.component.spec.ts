import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessDeniedComponent } from './access-denied.component';

describe('AccessDeniedComponent', () => {
    let component: AccessDeniedComponent;
    let fixture: ComponentFixture<AccessDeniedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AccessDeniedComponent ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccessDeniedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('text should read "You are currently not logged in or you do not have access to this section."', () => {
        const paragraphs = fixture.debugElement.nativeElement.querySelectorAll('p');
        expect(paragraphs[ 0 ].innerHTML).toEqual('You are currently not logged in or you do not have access to this section.');
        expect(paragraphs[ 1 ].innerHTML).toEqual('Click the button below to continue.');
    });

    it('should have only 1 anchor tag', () => {
        const as: HTMLAnchorElement[] = fixture.debugElement.nativeElement.querySelectorAll('a');
        expect(as.length).toEqual(1);
    });

    it('contains the href to "http://mock.com/123"', () => {
        spyOn(component, 'getSSOPortalUrl').and.returnValue('http://mock.com/123');
        component.ngOnInit();
        fixture.detectChanges();
        const a: HTMLAnchorElement = fixture.debugElement.nativeElement.querySelectorAll('a')[0];
        expect(a.href).toEqual('http://mock.com/123');
    });

    it('has the rel "noopener"', () => {
        const a: HTMLAnchorElement = fixture.debugElement.nativeElement.querySelectorAll('a')[ 0 ];
        expect(a.rel).toEqual('noopener');
    });
});
