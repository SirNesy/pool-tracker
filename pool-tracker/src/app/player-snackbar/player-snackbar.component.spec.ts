import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSnackbarComponent } from './player-snackbar.component';

describe('PlayerSnackbarComponent', () => {
  let component: PlayerSnackbarComponent;
  let fixture: ComponentFixture<PlayerSnackbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerSnackbarComponent]
    });
    fixture = TestBed.createComponent(PlayerSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
