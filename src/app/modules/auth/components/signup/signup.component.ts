import { Component, OnDestroy, OnInit } from '@angular/core';
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
  constructor() {
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

  ngOnDestroy(): void {}
}
