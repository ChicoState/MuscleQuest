import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SloaneLvlOneComponent } from './sloane-lvl-one.component';
import { SloaneItemGeneratorService } from '../sloane-item-generator.service';
import { SloaneUserUpdateService } from '../sloane-user-updater.service';

describe('SloaneLvlOneComponent', () => {
  let component: SloaneLvlOneComponent;
  let fixture: ComponentFixture<SloaneLvlOneComponent>;
  let mockItemGeneratorService: jasmine.SpyObj<SloaneItemGeneratorService>;
  let mockUserUpdateService: jasmine.SpyObj<SloaneUserUpdateService>;

  beforeEach(() => {
    // Create spy objects for the SloaneItemGeneratorService and SloaneUserUpdateService services
    mockItemGeneratorService = jasmine.createSpyObj(
      'SloaneItemGeneratorService',
      ['createNewItem']
    );
    mockUserUpdateService = jasmine.createSpyObj('SloaneUserUpdateService', [
      'updateUser',
    ]);

    TestBed.configureTestingModule({
      declarations: [SloaneLvlOneComponent],
      providers: [
        {
          provide: SloaneItemGeneratorService,
          useValue: mockItemGeneratorService,
        },
        { provide: SloaneUserUpdateService, useValue: mockUserUpdateService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SloaneLvlOneComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should generate a new item when the generateItem() method is called', () => {
    // Set up the mock return value for the createNewItem() method
    const mockItem = { id: 'test', strength: 10, dexterity: 5 };
    mockItemGeneratorService.createNewItem.and.returnValue(mockItem);

    // Call the generateItem() method and check that it sets the component's item property correctly
    component.generateItem();
    expect(component.item).toEqual(mockItem);
  });
});
