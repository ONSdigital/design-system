import { classForm, classSubmissionConfirm } from './form-submitter';
import FormSubmitter from './form-submitter';

export default function formSubmitterDOM() {
  const elForm = document.querySelector(classForm);
  const elConfirm = document.querySelector(classSubmissionConfirm);

  return new FormSubmitter(elForm, elConfirm);
}
