import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
// import { SectionAnimation } from 'src/app/shared/animations/section-animation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  // animations: [SectionAnimation],
})
export class SignupComponent implements OnInit, OnDestroy {
  // current page flag
  currentStep: string;

  // check icon in done = true
  done: object | any;

  // using to handel back action
  storeCurrent: number;

  // Validation Step
  validStep: any;

  // store service Id Value
  serviceIdValue: any;

  // store user Name Value
  userNameValue: any;

  // store Password Value
  passwordValue: any;

  subscriptions: Subscription[] = [];

  constructor(private authService: AuthService) {
    this.currentStep = 'step1';
    this.done = {
      step1: false,
      step2: false,
      step3: false,
      step4: false,
    };
    this.storeCurrent = 0;
  }

  ngOnInit(): void {}

  // go to next step
  nextStep(current: number, next: number) {
    this.currentStep = 'step' + next;
    this.done['step' + current] = true;
    this.storeCurrent = current;
  }

  perviousStep() {
    if (this.storeCurrent > 0) {
      this.currentStep = 'step' + this.storeCurrent;
      this.done['step' + this.storeCurrent] = false;
      this.storeCurrent -= 1;
      console.log(this.storeCurrent);
    }
  }

  checkServiceId(data: any, currnet?: any, next?: any) {
    this.subscriptions.push(
      this.authService.checkServiceCode(data?.serviceId).subscribe({
        next: (res: any) => {
          this.nextStep(currnet, next);
        },
        error: (err: any) => {
          this.currentStep = 'error';
        },
      })
    );
  }

  bookServiceId(data: any, currnet?: any, next?: any) {
    this.nextStep(currnet, next);
  }

  completeRegister(data?: any) {
    const requiredData = {
      data: true,
      name: this.userNameValue,
    };
    console.log(requiredData);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscribe) => {
      subscribe.unsubscribe();
    });
  }
}
