import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMomentComponent } from './list-moment.component';

describe('ListMomentComponent', () => {
  let component: ListMomentComponent;
  let fixture: ComponentFixture<ListMomentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMomentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMomentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
