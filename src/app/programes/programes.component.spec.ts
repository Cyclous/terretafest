import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramesComponent } from './programes.component';

describe('ProgramesComponent', () => {
  let component: ProgramesComponent;
  let fixture: ComponentFixture<ProgramesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgramesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
