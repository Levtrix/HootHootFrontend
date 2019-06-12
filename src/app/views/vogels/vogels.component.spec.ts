import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VogelsComponent } from './vogels.component';

describe('VogelsComponent', () => {
  let component: VogelsComponent;
  let fixture: ComponentFixture<VogelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VogelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VogelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
