import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  formGroup:FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private userService: UserService,     
    private router: Router,
    private snack:SnackBarService) { }

  ngOnInit(): void {
    this.formGroup = this.build(new User());

    this.load();
  }

  onSubmit() {
    if(this.formGroup.invalid) {
      this.snack.alert("There are invalid fields.");
      return;
    }

    if(this.formGroup.getRawValue().pwd != this.formGroup.getRawValue().valPwd) {
      this.snack.alert("Password doesn't match.");
      return;
    }

    let user = this.formGroup.getRawValue();
    if(user._id) {
      user._id = user._id.$oid;
      this.update(user)
    } else {
      this.insert(user);
    }

  }

  insert(user) {
    this.userService.create(user).subscribe(
      user => {
        this.formGroup = this.build(user);
        this.snack.success('User created successfully.');
        this.router.navigateByUrl('user');
      },
      err => {               
        let error = err.error;
        this.snack.error(error.message, error.status);
      }
    );
  }

  update(user) {
    this.userService.update(user).subscribe(
      user => {
        this.formGroup = this.build(user);
        this.snack.success('User updated successfully.');
        this.router.navigateByUrl('user');
      },
      err => {       
        let error = err.error;
        this.snack.error(error.message, error.status);
      }
    );
  }

  load() {
    this.activatedRoute.paramMap.subscribe(params => {
      if(params.get('id')) {
        this.userService.read(params.get('id')).subscribe(
          user => {
            this.formGroup = this.build(user);
          },
          err => {
            let error = err.error;            
            this.snack.error(error.message, error.status);
          }
        );
      }
    });
  }

  build(user: User): FormGroup {
    return new FormGroup({
      _id: new FormControl(user._id),
      name: new FormControl(user.name, [Validators.required]),
      email: new FormControl(user.email, [Validators.required]),
      pwd: new FormControl(user.pwd, [Validators.required]),
      valPwd: new FormControl(user.pwd, [Validators.required])
    });
  }

}
