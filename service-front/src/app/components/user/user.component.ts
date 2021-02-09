import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'menu'];
  users: Array<User> = [];

  constructor(
    private userService:UserService,
    private snack:SnackBarService,
  ) { }

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.userService.readAll().subscribe(
      users => {
        this.users = users;
        console.log(users)
      },
      err => {
        this.users = [];
        this.snack.error("Error");
      }
    );
  }

}
