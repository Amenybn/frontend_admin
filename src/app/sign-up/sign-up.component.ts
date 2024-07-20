import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from '../cognito.service';
import { IUser } from '../user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {

  isConfirm: boolean = false;
  user: IUser = {} as IUser;
  errorMessage: string = '';
  constructor(private router: Router, private cognitoService: CognitoService,private httpClient:HttpClient) {
  }

  ngOnInit(): void {
   this.httpClient.get('https://6boqrnrszc.execute-api.us-east-1.amazonaws.com/user?firstName=stack&lastName=MJ')
   .subscribe(data=>{
    console.log(data);
   })
  }

  public signUp(): void {
    this.cognitoService.signUp(this.user).then(() => {
      this.isConfirm = true;
    }).catch((error) => {
      alert(error);
    })

  }

  public confirmSignUp(): void {
    this.cognitoService.confirmSignup(this.user).then(() => {
      this.router.navigate(['/signIn']);
    }).catch((error) => {
      alert(error);
    })
  }

}