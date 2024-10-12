import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {HowtoService} from '../howto.service';

@Component({
  selector: 'app-create-howto',
  templateUrl: './create-howto.component.html',
  styleUrls: ['./create-howto.component.css']
})
export class CreateHowtoComponent implements OnInit {

  howtoForm: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder,
              private howtoService: HowtoService) { }

  ngOnInit() {

    this.howtoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required],
      tags: ['', Validators.required]
    })

  }

  cancel() {
    this.router.navigate(['/quick/howtos/']);
  }

  async submitHowto() {


    const howto = this.howtoForm.value;


    const result = await this.howtoService.createHowto(howto);

    this.howtoForm.reset();

    console.log('Result', result);

  }
}
