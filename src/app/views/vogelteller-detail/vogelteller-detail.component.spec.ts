import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VogeltellerDetailComponent } from './vogelteller-detail.component';

describe('VogeltellerDetailComponent', () => {
  let component: VogeltellerDetailComponent;
  let fixture: ComponentFixture<VogeltellerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VogeltellerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VogeltellerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
