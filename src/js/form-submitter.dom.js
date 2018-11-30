import {classForm, classSubmissionConfirm} from './form-submitter';
import {get} from './api/_sdcModules';

const formSubmitterModule = get('form-submitter');

export default function formSubmitterDOM() {
  const FormSubmitter = formSubmitterModule.FormSubmitter;
  const elForm = document.querySelector(classForm);
  const elConfirm = document.querySelector(classSubmissionConfirm);

  return new FormSubmitter(elForm, elConfirm);
}
