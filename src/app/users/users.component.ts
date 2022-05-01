import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  public users: User[] = [];
  public usersWithLongestDistance: User[] = [];
  public isUsersLongestDistanceVisible = false;

  constructor(private apiService: ApiService) { }

  async ngOnInit(): Promise<void> {
    this.users = await this.apiService.getUsers();
  }

  public calcUserLongestDistance() {
    let max = 0;

    for(let i = 0; i < this.users.length -1; i++){
      for(let j = i + 1; j < this.users.length; j++){
        let a = this.users[i].address.geolocation;
        let b = this.users[j].address.geolocation;
        let distance = Math.sqrt(Math.pow(b.lat - a.lat,2) + Math.pow(b.long - a.long,2));
        if (distance > max){
          max = distance;
          this.usersWithLongestDistance = [this.users[i],this.users[j]];
        }
      }
    }
    this.isUsersLongestDistanceVisible = true;
  }
}
