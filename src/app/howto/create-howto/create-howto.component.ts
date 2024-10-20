import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HowtoService} from '../howto.service';

@Component({
  selector: 'app-create-howto',
  templateUrl: './create-howto.component.html',
  styleUrls: ['./create-howto.component.scss'],

})
export class CreateHowtoComponent implements OnInit {

  howtoForm: FormGroup;

  selectedFile: File | null = null;

  imgPreview: string | ArrayBuffer = '';

  categories = [
    'technology',
    'cooking',
    'gardening',
    'crafts',
    'home-improvement',
    'health',
    'fitness',
    'finance',
    'business',
    'career',
    'education',
    'travel',
    'family',
    'relationships',
    'entertainment',
    'pets',
    'other'
  ];

  relatedHowto: any[] = null;

  constructor(private router: Router,
              private fb: FormBuilder,
              private howtoService: HowtoService) { }

  async ngOnInit() {

    this.howtoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', Validators.required],
      category: ['', Validators.required],
      related: ['', Validators.required],
      file: [null],
      tags: ['', Validators.required],
      totalTime: ['', Validators.required],
      content: ['', Validators.required]
    });

    this.relatedHowto = await this.howtoService.getHowtos();
    console.log('Related Howtos', this.relatedHowto);

  }

  cancel() {
    this.router.navigate(['/quick/howtos/']);
  }

  onFileSelected(event: any) {
    console.log('Event', event);

    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imgPreview = reader.result;
      }
      reader.readAsDataURL(this.selectedFile);

    }

  }

  async submitHowto() {

    if (this.howtoForm.invalid) {
      console.log('Invalid form');
      return;
    }

    const result = await this.howtoService.createHowto(this.howtoForm.value, this.selectedFile);
    console.log('Result', result);

    this.howtoForm.reset();
    this.howtoForm.patchValue({
      category: '',
      related: '',
    });

    this.imgPreview = '';
    this.selectedFile = null;

  }


}
