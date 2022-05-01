import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { User } from '../interfaces';
import { UsersComponent } from './users.component';
import { ApiService } from '../api.service';

const usersMock: User[] = [
  {
      "address": {
          "geolocation": {
              "lat": -37.3159,
              "long": 81.1496
          },
          "city": "kilcoole",
          "street": "new road",
          "number": 7682,
          "zipcode": "12926-3874"
      },
      "id": 1,
      "email": "john@gmail.com",
      "username": "johnd",
      "password": "m38rmF$",
      "name": {
          "firstname": "john",
          "lastname": "doe"
      },
      "phone": "1-570-236-7033",
      "__v": 0
  },
  {
      "address": {
          "geolocation": {
              "lat": -37.3159,
              "long": 81.1496
          },
          "city": "kilcoole",
          "street": "Lovers Ln",
          "number": 7267,
          "zipcode": "12926-3874"
      },
      "id": 2,
      "email": "morrison@gmail.com",
      "username": "mor_2314",
      "password": "83r5^_",
      "name": {
          "firstname": "david",
          "lastname": "morrison"
      },
      "phone": "1-570-236-7033",
      "__v": 0
  },
  {
      "address": {
          "geolocation": {
              "lat": 40.3467,
              "long": -30.1310
          },
          "city": "Cullman",
          "street": "Frances Ct",
          "number": 86,
          "zipcode": "29567-1452"
      },
      "id": 3,
      "email": "kevin@gmail.com",
      "username": "kevinryan",
      "password": "kev02937@",
      "name": {
          "firstname": "kevin",
          "lastname": "ryan"
      },
      "phone": "1-567-094-1345",
      "__v": 0
  },
  {
      "address": {
          "geolocation": {
              "lat": 50.3467,
              "long": -20.1310
          },
          "city": "San Antonio",
          "street": "Hunters Creek Dr",
          "number": 6454,
          "zipcode": "98234-1734"
      },
      "id": 4,
      "email": "don@gmail.com",
      "username": "donero",
      "password": "ewedon",
      "name": {
          "firstname": "don",
          "lastname": "romer"
      },
      "phone": "1-765-789-6734",
      "__v": 0
  }
]

class ApiServiceMock {
  public getUsers(){
    return usersMock;
  }
}

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [{
        provide: ApiService,
        useClass: ApiServiceMock
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
  });

  it('should calc user longest distance', (done) => {
    const expected = [
      usersMock[0],
      usersMock[2]
    ]
    component.ngOnInit().then(() => {
      component.calcUserLongestDistance();
      expect(component.usersWithLongestDistance).toEqual(expected);
      done();
    });
  });
});
