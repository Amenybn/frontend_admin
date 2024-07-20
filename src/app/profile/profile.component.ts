import { Component, OnInit } from '@angular/core';
import { CognitoService } from '../cognito.service';
import { IUser } from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  user: IUser = {} as IUser;

  constructor(private cognitoService: CognitoService) {
  }

  public ngOnInit(): void {
    this.cognitoService.getUser().then((user) => {
      this.user = user.attributes;
      this.user.role = user.attributes['custom:role'];
    })
  }

  public update(): void {
    this.cognitoService.updateUser(this.user).then(() => {
      alert('Updated successfully.');
    }).catch((error) => {
      alert(error);
    });
  }

}