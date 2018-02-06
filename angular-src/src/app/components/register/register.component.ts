import { Component, OnInit } from "@angular/core";
import { ValidateService } from "../../services/validate.service";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {}

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };
    // required fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show("请提供所有信息", {
        cssClass: "alert-danger",
        timeout: 2000
      });
      return false;
    }
    // validate email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show("无效邮箱", {
        cssClass: "alert-danger",
        timeout: 2000
      });
      return false;
    }
  }
}
