import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

export interface Food {
   value: string;
   display: string;
}
@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css'],
   providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class AppComponent implements OnInit {
  isLinear = true;
  title = 'materialApp';
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  infoFormGroup: FormGroup;
  addSubGenreFormGroup: FormGroup;
  optionalSubGenre = false;
  selectedGenre = '';
  selectedSubGenre = '';
  requiredDesc = false;
  procedureFinished = false;

   dummyObj = {
    genres: [
      {
        id: 1,
        name: 'Genre 1',
        subgenres: [
          {
            id: 10,
            name: 'Subgenre 1',
            isDescriptionRequired: true
          },
          {
            id: 11,
            name: 'Subgenre 2',
            isDescriptionRequired: false
          },
          {
            id: 12,
            name: 'Subgenre 3',
            isDescriptionRequired: true
          },
          {
            id: 13,
            name: 'Subgenre 4',
            isDescriptionRequired: true
          },
          {
            id: 14,
            name: 'Subgenre 5',
            isDescriptionRequired: true
          }
        ]
      },
      {
        id: 2,
        name: 'Genre 2',
        subgenres: [
          {
            id: 15,
            name: 'Subgenre 1',
            isDescriptionRequired: true
          },
          {
            id: 16,
            name: 'Subgenre 2',
            isDescriptionRequired: false
          },
          {
            id: 17,
            name: 'Subgenre 3',
            isDescriptionRequired: true
          }
        ]
      },
      {
        id: 3,
        name: 'Genre 3',
        subgenres: [
          {
            id: 18,
            name: 'Subgenre 1',
            isDescriptionRequired: true
          },
          {
            id: 19,
            name: 'Subgenre 2',
            isDescriptionRequired: true
          },
          {
            id: 20,
            name: 'Subgenre 3',
            isDescriptionRequired: true
          }
        ]
      },
      {
        id: 4,
        name: 'Genre 4',
        subgenres: [
          {
            id: 21,
            name: 'Subgenre 1',
            isDescriptionRequired: false
          },
          {
            id: 22,
            name: 'Subgenre 2',
            isDescriptionRequired: false
          },
          {
            id: 23,
            name: 'Subgenre 3',
            isDescriptionRequired: false
          }
        ]
      },
      {
        id: 5,
        name: 'Genre 5',
        subgenres: [
          {
            id: 24,
            name: 'Subgenre 1',
            isDescriptionRequired: true
          }
        ]
      }
    ]
  };

  selectGenre(e, i): void {
    this.selectedGenre = i.toString();
    this.firstFormGroup.setValue({firstCtrl : i});
    this.addClassSelected(e);
  }

  addClassSelected(e): void{
    const gh = document.getElementsByClassName('button-selected')[0];
    if (gh) {gh.classList.remove('button-selected'); }
    if (e) {e.currentTarget.classList.add('button-selected'); }
  }

  selectSubGenre(e, i): void {
    this.selectedSubGenre = i.toString();
    this.optionalSubGenre = false;
    this.secondFormGroup.setValue({secondCtrl : i});
    this.addClassSelected(e);
  }

  addSubGenreButton(e): void {
    this.optionalSubGenre = true;
    this.secondFormGroup.setValue({secondCtrl : 'new'});
    this.addClassSelected(e);
  }

  addSubGenre(): void {
    /// checking the last id was gaven to subGenre
    const lenG = this.dummyObj.genres.length - 1;
    const lenSubG = this.dummyObj.genres[lenG].subgenres.length - 1;
    const lastId = this.dummyObj.genres[lenG].subgenres[lenSubG].id;
    this.dummyObj.genres[this.selectedGenre].subgenres.push({
      id: lastId + 1,
      name: this.addSubGenreFormGroup.value.inputCtrl,
      isDescriptionRequired: this.addSubGenreFormGroup.value.optionalCtrl
    });
    this.requiredDesc = this.addSubGenreFormGroup.value.optionalCtrl;
  }

  checkboxChange(): void{
    this.requiredDesc = ! this.requiredDesc;
    console.log('fuck');
  }

  handlefinish(): boolean{
    this.procedureFinished = true;
    fetch('/')
      .then(response => {
        if (!response.ok) {throw Error(response.statusText); }
        return response;
      })
      .then(res => console.log(res, this.infoFormGroup.value));
    return false;
  }

  resetAll(): void{
    this.optionalSubGenre = false;
    this.selectedGenre = '';
    this.selectedSubGenre = '';
    this.requiredDesc = false;
    this.procedureFinished = false;
    this.ngOnInit();
  }

   constructor(private formBuilder: FormBuilder) {}
   ngOnInit(): void {
      this.firstFormGroup = this.formBuilder.group({
         firstCtrl: ['', Validators.required]
      });
      this.secondFormGroup = this.formBuilder.group({
         secondCtrl: ['', Validators.required]
      });
      this.addSubGenreFormGroup = new FormGroup({
         optionalCtrl: new FormControl(),
         inputCtrl: new FormControl()

      });
      this.infoFormGroup = this.formBuilder.group({
         infoCtrl: ['', Validators.required],
         infoCtrl2: ['', Validators.required],
         infoCtrl3: ['', Validators.required],
         infoCtrl4: ['', Validators.required],
         infoCtrl5: ['', Validators.required],
         infoCtrl6: ['', Validators.required],
         infoCtrl7: ['', Validators.required],
         infoCtrl8: ['', Validators.required],
         infoCtrl9: ['', Validators.required],
         infoCtrl10: [],
      });
    }
  }
