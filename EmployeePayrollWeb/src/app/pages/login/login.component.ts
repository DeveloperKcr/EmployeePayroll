import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userObj: any={
    username:'admin',
    password:'112233'
  }

constructor(private route:Router){

}

  onLogin(){
    if(this.userObj.username == "admin" && this.userObj.password=="112233"){
      this.route.navigateByUrl("dashboard");
    }else{
      alert('Username or password is wrong.');
    }
  }
}
