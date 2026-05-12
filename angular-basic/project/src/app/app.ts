import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  title = 'Registration Form';

  displayname = "";
  displayaddress = "";
  displaycontact = "";
  displayemail = "";

  getValue(name:string, address:string, contact:string, email:string)
  {
    this.displayname = name;
    this.displayaddress = address;
    this.displaycontact = contact;
    this.displayemail = email;
  }

}