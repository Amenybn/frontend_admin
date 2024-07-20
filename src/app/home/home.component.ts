import { Component, OnInit } from '@angular/core';
import { CognitoService } from '../cognito.service';
import { IUser } from '../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ 'assets/css/bootstrap.min.css',
  'assets/css/animate.css',
  'assets/plugins/select2/css/select2.min.css',
  'assets/css/dataTables.bootstrap4.min.css',
  'assets/plugins/fontawesome/css/fontawesome.min.css',
  'assets/plugins/fontawesome/css/all.min.css',
  'assets/css/style.css']
})
export class HomeComponent implements OnInit {

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


  private loadScripts(): void {
    const dynamicScripts = [
      'assets/js/jquery-3.6.0.min.js',
      'assets/js/feather.min.js',
      'assets/js/jquery.slimscroll.min.js',
      'assets/js/jquery.dataTables.min.js',
      'assets/js/dataTables.bootstrap4.min.js',
      'assets/js/bootstrap.bundle.min.js',
      'assets/plugins/select2/js/select2.min.js',
      'assets/plugins/sweetalert/sweetalert2.all.min.js',
      'assets/plugins/sweetalert/sweetalerts.min.js',
      'assets/js/script.js'
    ];

    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = true;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }

}
