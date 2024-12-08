import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HowtoService} from '../howto.service';

@Component({
  selector: 'app-edit-howto',
  templateUrl: './edit-howto.component.html',
  styleUrls: ['./edit-howto.component.css']
})
export class EditHowtoComponent implements OnInit {

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

  editHowtoForm: FormGroup;

  howto: any;

  relatedHowto: any;

  relatedHowtos: any;

  imgPreview: string | ArrayBuffer = '';

  selectedFile: File | null = null;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private howtoService: HowtoService,
              private router: Router) {

  }

  async ngOnInit() {

   this.route.data.subscribe(async (data) => {

      console.log(':::###Data:', data?.howtoData);
      this.howto = data.howtoData?.howto;
      this.relatedHowto = data.howtoData?.relatedHowto;
      this.imgPreview = this.howto?.imageUrl;

      this.relatedHowtos = await this.howtoService.getHowtos();
      this.relatedHowtos = this.relatedHowtos.filter((howto:any) => howto?.id !== this.howto?.id);

      this.editHowtoForm = this.fb.group({
        title: [this.howto?.title, Validators.required],
        description: [this.howto?.description, Validators.required],
        url: [this.howto?.url, Validators.required],
        category: [this.howto?.category, Validators.required],
        related: [''],
        file: [null],
        tags: [this.howto?.tags, Validators.required],
        totalTime: [this.howto?.totalTime, Validators.required],
        content: [this.howto?.content, Validators.required]
      });

    })
  }

  onFileSelected(event: any) {
    console.log('Event..', event);

    if (event.target.files.length > 0) {

      this.selectedFile = event.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imgPreview = reader.result;
      }
      console.log('Selected file', this.selectedFile);

      reader.readAsDataURL(this.selectedFile);

    }

  }

  async saveHowto() {

    console.log(':::>>><<>>Form', this.editHowtoForm.value);

    if (this.editHowtoForm.invalid) {
      console.log('Invalid form');
      return;
    }

    const result = await this.howtoService.editHowto(this.howto.id, this.editHowtoForm.value, this.selectedFile);
    console.log('Result', result);

    this.editHowtoForm.reset();
    this.editHowtoForm.patchValue({
      category: '',
      related: '',
    });

    this.imgPreview = '';
    this.selectedFile = null;

    await this.router.navigate(['/quick/howtos/']);

  }

  async cancel() {
    await this.router.navigate(['/quick/howtos/']);
  }
}
