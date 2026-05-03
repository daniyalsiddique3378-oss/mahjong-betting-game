import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckInfo } from './deck-info';

describe('DeckInfo', () => {
  let component: DeckInfo;
  let fixture: ComponentFixture<DeckInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(DeckInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
