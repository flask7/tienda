import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DesplieguePage } from './despliegue.page';

describe('DesplieguePage', () => {
  let component: DesplieguePage;
  let fixture: ComponentFixture<DesplieguePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplieguePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DesplieguePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
