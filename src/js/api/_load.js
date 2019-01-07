import { subscribe } from './_sdcModules';
import CountdownAnimation from 'components/countdown/src/countdown';
import FormSubmitter from '../form-submitter';
import SessionTimeoutUI from 'components/timeout/src/timeout';
import LoaderBtn from '../loader-btn';
import dialog from '../dialog';
import fetch from '../fetch';
import { getTimeNow, matchMedia } from '../utils';
import domready from '../domready';
import formSubmitterDOM from '../form-submitter.dom';
// import Tabs from 'components/tabs/tabs';
import timeoutDOM from 'components/timeout/src/timeout.dom';

/**
 * Import API
 */
import './extend';
import './boot';
import { awaitPolyfills } from '../polyfills/await-polyfills';

// awaitPolyfills.then(() => {
//   subscribe('utils', [
//     { method: getTimeNow,
//       methodName: 'getTimeNow'
//     },
//     { method: matchMedia,
//       methodName: 'matchMedia'
//     }
//   ]);
//   subscribe('fetch', [
//     {
//       method: fetch,
//       methodName: 'fetch'
//     }
//   ]);
//   subscribe('countdown', [
//     {
//       method: CountdownAnimation,
//       methodName: 'CountdownAnimation'
//     }
//   ]);
//   subscribe('dialog', [
//     {
//       method: dialog,
//       methodName: 'dialog'
//     }
//   ]);
//   subscribe('domready', [
//     {
//       method: domready,
//       methodName: 'domready'
//     }
//   ]);
//   subscribe('form-submitter', [
//     {
//       method: FormSubmitter,
//       methodName: 'FormSubmitter'
//     }
//   ]);
//   subscribe('form-submitter.dom', [
//     {
//       method: formSubmitterDOM,
//       methodName: 'formSubmitterDOM',
//       boot: true
//     }
//   ]);
//   subscribe('loader-btn', [
//     {
//       method: LoaderBtn,
//       methodName: 'LoaderBtn'
//     }
//   ]);
//   // subscribe('tabs', [
//   //   {
//   //     method: Tabs,
//   //     methodName: 'Tabs'
//   //   }
//   // ]);
//   subscribe('timeout', [
//     {
//       method: SessionTimeoutUI,
//       methodName: 'SessionTimeoutUI'
//     }
//   ]);
//   subscribe('timeout.dom', [
//     {
//       method: timeoutDOM,
//       methodName: 'timeoutDOM',
//       boot: true
//     }
//   ]);

//   /**
//   * Should eventually be called by each application
//   */
//   window.sdcAPI.boot();
// });
