import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateNewTask } from './create-new-task';

describe('CreateNewTask', () => {
  let component: CreateNewTask;
  let fixture: ComponentFixture<CreateNewTask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewTask],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateNewTask);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
