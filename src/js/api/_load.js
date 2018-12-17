import { subscribe } from './_sdcModules';
// import CountdownAnimation from '../../../components/countdown/countdown';
import FormSubmitter from '../form-submitter';
// import SessionTimeoutUI from '../../../components/timeout/timeout';
import LoaderBtn from '../loader-btn';
import dialog from '../dialog';
import fetch from '../fetch';
import { getTimeNow, matchMedia } from '../utils';
import domready from '../domready';
import formSubmitterDOM from '../form-submitter.dom';
// import Tabs from '../../../components/tabs/tabs';
// import timeoutDOM from '../../../components/timeout/timeout.dom';

/**
 * Import API
 */
import './extend';
import './boot';
import { awaitPolyfills } from '../polyfills/await-polyfills';



awaitPolyfills.then(() => {

  // subscribe('countdown', [
  //   { 
  //     method: CountdownAnimation,
  //     methodName: 'CountdownAnimation'
  //   }
  // ]);

  subscribe('dialog', [
    { 
      method: dialog,
      methodName: 'dialog'
    }
  ]);
  subscribe('domready', [
    { 
      method: domready, 
      methodName: 'domready'
    }
  ]);
  subscribe('fetch', [
    { 
      method: fetch,
      methodName: 'fetch'
    }
  ]);
  subscribe('form-submitter', [
    { 
      method: FormSubmitter,
      methodName: 'FormSubmitter'
    }
  ]);
  subscribe('form-submitter.dom', [
    { 
      method: formSubmitterDOM,
      methodName: 'formSubmitterDOM',
      boot: true
    }
  ]);
  subscribe('loader-btn', [
    { 
      method: LoaderBtn,
      methodName: 'LoaderBtn'
    }
  ]);
  // subscribe('tabs', [
  //   { 
  //     method: Tabs,
  //     methodName: 'Tabs'
  //   }
  // ]);
  // subscribe('timeout', [
  //   { 
  //     method: SessionTimeoutUI,
  //     methodName: 'SessionTimeoutUI'
  //   }
  // ]);
  // subscribe('timeout.dom', [
  //   { 
  //     method: timeoutDOM,
  //     methodName: 'timeoutDOM',
  //     boot: true
  //   }
  // ]);

  subscribe('utils', [
    { method: getTimeNow,
      methodName: 'getTimeNow' 
    },
    { method: matchMedia,
      methodName: 'matchMedia'
    }
  ]);

  /**
 * Should eventually be called by each application
 */
  window.sdcAPI.boot();
});
