import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HanoiComponent } from '../../animation/hanoi/hanoi.component';
@Component({
  selector: 'app-hanoi-view',
  templateUrl: './hanoi-view.component.html',
  styleUrls: ['./hanoi-view.component.scss']
})
export class HanoiViewComponent implements OnInit {
  @ViewChild('appHanoi') appHanoi: HanoiComponent;
  validateForm: FormGroup;
  hanoiHeight = '5';
  seconds = 200;
  isStart = false;
  currentpercent = 0;
  submitForm(): void {

    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
    this.isStart = true;
    this.currentpercent = 0;
    this.appHanoi.start(+this.hanoiHeight, this.seconds);
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      hanoiHeight: [null, [Validators.required]],
      seconds: [null, [Validators.required, Validators.min(20), Validators.max(5000)]]
    });
  }

  updateProgerss(progress: number) {
    this.currentpercent = Number.parseInt(progress + '', 0);
    if (this.currentpercent >= 99.999) {
      this.isStart = false;
      this.currentpercent = 0;
    }
  }
}
