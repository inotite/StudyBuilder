import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeVerticalRowComponent } from './home-vertical-row.component';
import { MenuItem } from './../../shared/models/menu-item.model';
import { TestHelper } from './../../shared/helpers/test.helper';

describe('HomeVerticalRowComponent', () => {
  let component: HomeVerticalRowComponent;
  let fixture: ComponentFixture<HomeVerticalRowComponent>;
  let items: MenuItem[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeVerticalRowComponent ]
    })
    .compileComponents()
    .then(() => {
      items = [
        {
          textKey: 'key 1',
          displayName: 'name 1',
          cssIcon: 'icon-1',
          isDone: true,
          url: '/url1',
          isBelowBar: true
        },
        {
          textKey: 'key 2',
          displayName: 'name 2',
          cssIcon: 'icon-2',
          isDone: false,
          url: '/url2',
          isBelowBar: false
        }
      ];

      fixture = TestBed.createComponent(HomeVerticalRowComponent);
      component = fixture.componentInstance;
      component.items = items;
      component.title = 'test title';
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign the Component\'s title to the inner text of the label',
    () => {
      const header = TestHelper.getElementByCss(fixture, 'label') as HTMLHeadingElement;

      expect(header.innerText).toEqual(component.title.toUpperCase());
    });

  it('should create a div row for each item',
    () => {
      const rows = TestHelper.getAllElementsByCss(fixture, 'div.row:not(.header-title)');

      expect(rows.length).toEqual(items.length);
    });

  it('should create a div.col-md-12 inside each div.row',
    () => {
      const cols = TestHelper.getAllElementsByCss(fixture, 'div.row:not(.header-title) div.col-md-12');

      expect(cols.length).toEqual(items.length);
    });

  it('should create an anchor tag for each item under the col-md-12 div',
    () => {
      const anchors = TestHelper.getAllElementsByCss(fixture, 'div.col-md-12 a');

      expect(anchors.length).toEqual(items.length);
    });

  it('should assign the item\'s url to the href of the anchor',
    () => {
      const first = items[0];
      const anchor = TestHelper.getElementByCss(fixture, 'a') as HTMLAnchorElement;

      expect(anchor.href).toContain(first.url);
    });

  it('should assign the display name in all caps to the anchor tag\'s inner text',
    () => {
      const first = items[0];
      const anchor = TestHelper.getElementByCss(fixture, 'a') as HTMLAnchorElement;

      expect(anchor.innerText).toEqual(first.displayName.toUpperCase());
    });

  // The i18n attribute does not stay on the element when it gets rendered, so we can't test that value.
});
