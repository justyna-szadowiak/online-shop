import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Product, User, Cart } from '../interfaces';
import { CartComponent } from './cart.component';
import { ApiService } from '../api.service';

const productsMock: Product[] = [
  {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    "rating": {
      "rate": 3.9,
      "count": 120
    }
  },
  {
    "id": 2,
    "title": "Mens Casual Premium Slim Fit T-Shirts ",
    "price": 22.3,
    "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    "rating": {
      "rate": 4.1,
      "count": 259
    }
  },
  {
    "id": 3,
    "title": "Mens Cotton Jacket",
    "price": 55.99,
    "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    "rating": {
      "rate": 4.7,
      "count": 500
    }
  }
];

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
  }
]

const cartsMock: Cart[] = [
  {
    "id": 1,
    "userId": 1,
    "date": "2020-03-02T00:00:02.000Z",
    "products": [
      {
        "productId": 1,
        "quantity": 4
      },
      {
        "productId": 2,
        "quantity": 1
      },
      {
        "productId": 3,
        "quantity": 6
      }
    ],
    "__v": 0
  },
  {
    "id": 2,
    "userId": 1,
    "date": "2020-01-02T00:00:02.000Z",
    "products": [
      {
        "productId": 2,
        "quantity": 4
      },
      {
        "productId": 1,
        "quantity": 10
      },
      {
        "productId": 5,
        "quantity": 2
      }
    ],
    "__v": 0
  }
]

class ApiServiceMock {
  public getProducts(){
    return productsMock;
  }
  public getUsers(){
    return usersMock;
  }
  public getCarts(){
    return cartsMock;
  }
}

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [{
        provide: ApiService,
        useClass: ApiServiceMock
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
  });

  it('should calculate summary', (done) => {
    const expected = 798.04;
    component.ngOnInit().then(() => {
      const summary = component.getSummary(cartsMock[0])
      expect(summary).toEqual(expected);
      done();
    });
  });

  it('should calculate highest summary', (done) => {
    const expected1 = {sum: 0};
    const expected2 = {
      user: usersMock[0],
      sum: 798.04
    };
    const expected3 = {
      user: usersMock[0],
      sum: 1188.7
    };
    component.ngOnInit().then(() => {
      component.calculateHighestSummary()
      expect(component.highestSummary).toEqual(expected1);
      component.getSummary(cartsMock[0]);
      component.calculateHighestSummary()
      expect(component.highestSummary).toEqual(expected2);
      component.getSummary(cartsMock[0]);
      component.getSummary(cartsMock[1]);
      component.calculateHighestSummary()
      expect(component.highestSummary).toEqual(expected3);
      done();
    });
  });
});
