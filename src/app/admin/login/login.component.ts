import { Component, OnInit } from '@angular/core';
import {AuthService} from 'src/app/auth/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;

  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  async ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || 'employees';
    this.form = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
    // if (await this.authService.checkAuthenticated()) {
    //         await this.router.navigate([this.returnUrl]);
    //       }    
  }

  async onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false; 
    if (this.form.valid) {
      try {
        const email = 
        this.form.get('email').value;
        const password = 
        this.form.get('password').value;
        await this.authService.login(email, 
          password); 
        } catch (err) {
          this.loginInvalid = true;
        }
      }
        else{
          this.formSubmitAttempt = true; 
        }
  }
  
}
