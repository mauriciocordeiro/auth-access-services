import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LogService } from 'src/app/services/log.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  list = [];

  constructor(
    private authService:AuthService,
    private userService:UserService,
    private logService:LogService
  ) { }

  ngOnInit(): void {
    this.load()
  }

  load() {
    this.list = []
    this.list.push(this.statusAuth());
    this.list.push(this.stausCrud());
    this.list.push(this.statusLog());    
  }

  statusAuth() {
    let status = { "service": "Auth", "app":"", "db":"" };
    
    this.authService.satusApp().subscribe(
      res => {
        status.app = res.message;
      },
      err => {
        let error = err.error;
        status.app = error.message;
      }
    );
    this.authService.satusDb().subscribe(
      res => {
        status.db = res.message;
      },
      err => {
        let error = err.error;
        status.db = error.message;
      }
    );

    return status;
  }

  stausCrud() {
    let status = { "service": "CRUD", "app":"", "db":"" };
    
    this.userService.satusApp().subscribe(
      res => {
        status.app = res.message;
      },
      err => {
        let error = err.error;
        status.app = error.message;
      }
    );
    this.userService.satusDb().subscribe(
      res => {
        status.db = res.message;
      },
      err => {
        let error = err.error;
        status.db = error.message;
      }
    );

    return status;
  }

  statusLog() {
    let status = { "service": "Log", "app":"", "db":"" };
    
    this.logService.satusApp().subscribe(
      res => {
        status.app = res.message;
      },
      err => {
        let error = err.error;
        status.app = error.message;
      }
    );
    this.logService.satusDb().subscribe(
      res => {
        status.db = res.message;
      },
      err => {
        let error = err.error;
        status.db = error.message;
      }
    );

    return status;
  }

}
