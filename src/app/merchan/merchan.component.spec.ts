import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchanComponent } from './merchan.component';

describe('MerchanComponent', () => {
  let component: MerchanComponent;
  let fixture: ComponentFixture<MerchanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MerchanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
