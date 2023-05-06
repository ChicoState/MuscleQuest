import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { of } from 'rxjs';
import { SloaneUserUpdateService } from './sloane-user-updater.service';
import { environment } from 'src/environments/environment';

describe('SloaneUserUpdateService', () => {
  let service: SloaneUserUpdateService;
  let firestoreSpy: jasmine.SpyObj<AngularFirestore>;
  let authSpy: jasmine.SpyObj<AngularFireAuth>;

  beforeEach(() => {
    const firestoreMock = {
      collection: jasmine.createSpy('collection').and.returnValue({
        doc: jasmine.createSpy('doc').and.returnValue({
          valueChanges: jasmine.createSpy('valueChanges'),
          set: jasmine.createSpy('set'),
        }),
        valueChanges: jasmine.createSpy('valueChanges'),
      }),
    };
    const authMock = {
      authState: of({}),
    };

    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase), // Add this line
      ],
      providers: [
        SloaneUserUpdateService,
        { provide: AngularFirestore, useValue: firestoreMock },
        { provide: AngularFireAuth, useValue: authMock },
      ],
    });
    service = TestBed.inject(SloaneUserUpdateService);
    firestoreSpy = TestBed.inject(
      AngularFirestore
    ) as jasmine.SpyObj<AngularFirestore>;
    authSpy = TestBed.inject(
      AngularFireAuth
    ) as jasmine.SpyObj<AngularFireAuth>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
