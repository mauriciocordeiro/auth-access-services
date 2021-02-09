import { Component, OnInit } from '@angular/core';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { Log } from 'src/app/model/log';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  displayedColumns: string[] = ['email', 'action', 'timestamp'];
  logs: Array<Log> = [];

  constructor(
    private logService:LogService,
    private snackServices:SnackBarService
  ) { }

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.logService.readAll().subscribe(
      logs => {
        this.logs = logs;
      },
      err => {
        this.logs = [];
        this.snackServices.error(err.message);
      }
    );
  }
  

}
