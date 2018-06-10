import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchBuilderComponent } from './match-builder.component';

describe('MatchComponent', () => {
  let component: MatchBuilderComponent;
  let fixture: ComponentFixture<MatchBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
