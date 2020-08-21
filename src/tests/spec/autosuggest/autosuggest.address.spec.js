import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/address/_test-template.njk';
import '../../../scss/main.scss';
import AutosuggestAddress from '../../../components/input/autosuggest/autosuggest.address';
import AddressError from '../../../components/input/autosuggest/autosuggest.address.error';
import AddressSetter from '../../../components/input/autosuggest/autosuggest.address.setter';
import eventMock from 'stubs/event.stub.spec';
import fetchMock from 'stubs/window.fetch.stub.spec';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiSpies from 'chai-spies';

chai.should();
chai.use(chaiSpies);
chai.use(chaiAsPromised);

const params = {
  id: 'address',
  label: {
    text: 'Enter an address',
    classes: 'js-autosuggest-label',
  },
  autocomplete: 'off',
  autosuggest: {
    instructions:
      'Use up and down keys to navigate suggestions once youve typed more than two characters. Use the enter key to select a suggestion. Touch device users, explore by touch or with swipe gestures.',
    ariaYouHaveSelected: 'You have selected',
    ariaFoundByAlternativeName: 'found by alternative name',
    APIDomain: 'https://whitelodge-ai-api.census-gcp.onsdigital.uk',
    ariaMinChars: 'Enter 3 or more characters for suggestions.',
    ariaOneResult: 'There is one suggestion available.',
    ariaNResults: 'There are {n} suggestions available.',
    ariaLimitedResults: 'Results have been limited to 10 suggestions. Enter more characters to improve your search.',
    moreResults: 'Continue entering to improve suggestions',
    resultsTitle: 'Suggestions',
    noResults: 'No results found',
    typeMore: 'Enter more of the address to get results',
    tooManyResults: '{n} results found. Enter more of the address to improve results.',
    errorTitle: 'There is a problem with your answer',
    errorMessage: 'Enter an address ',
    errorMessageAPI: 'Sorry, there was a problem loading addresses. We are working to fix the problem. Please try again later.',
    externalInitialiser: true,
    isEditable: true,
  },
  line1: {
    label: 'Address line 1',
  },
  line2: {
    label: 'Address line 2',
  },
  town: {
    label: 'Town or city',
  },
  postcode: {
    label: 'Postcode',
  },
  searchButton: 'Search for an address',
  manualButton: 'Manually enter address',
};

describe('Autosuggest.address component', function() {
  before(function(done) {
    awaitPolyfills.then(() => {
      this.rewiremock = require('rewiremock/webpack').default;
      done();
    });
  });

  // describe('When a fetch is made', function() {
  //   beforeEach(function() {
  //     // Mock
  //     this.originalFetch = window.fetch;

  //     window.fetch = fetchMock(true);

  //     this.fetchSpy = chai.spy(require('../../../components/input/autosuggest/abortable-fetch').default);
  //     this.rewiremock('./src/components/input/autosuggest/abortable-fetch')
  //       .es6()
  //       .withDefault(this.fetchSpy);

  //     this.rewiremock.enable();

  //     const mockedautosuggestAddress = require('components/input/autosuggest/autosuggest.address').default;

  //     // Render
  //     const component = renderComponent(params);

  //     // Initialise
  //     Object.keys(component).forEach(key => {
  //       this[key] = component[key];
  //     });

  //     const context = this.context;
  //     this.autosuggestAddress = new mockedautosuggestAddress(context);
  //   });

  //   afterEach(function() {
  //     window.fetch = this.originalFetch;
  //     this.rewiremock.disable();

  //     if (this.wrapper) {
  //       this.wrapper.remove();
  //     }
  //   });

  //   describe('and the fetch is successful', function() {
  //     beforeEach(function() {
  //       setTimeout(() => {
  //         this.autosuggestAddress.fetch.send = this.fetchSpy()
  //           .send()
  //           .then(resolve => {
  //             resolve();
  //           })
  //           .catch(() => {});
  //         // this.autosuggestAddress.fetch.response.json().status.code = 200;
  //         // this.abortSpy = chai.spy.on(this.autosuggestAddress.fetch, 'abort');
  //         // this.autosuggestAddress.abortFetch();
  //       });
  //     });

  //     it('then the function should return immediately', function() {
  //       console.log('response', this.autosuggestAddress.fetch);
  //       // expect(this.abortSpy).to.have.been.called();
  //     });
  //   });
  // });

  describe('When the component initialises', function() {
    beforeEach(function(done) {
      const component = renderComponent(params);

      Object.keys(component).forEach(key => {
        this[key] = component[key];
      });

      const context = this.context;
      this.autosuggestAddress = new AutosuggestAddress(context);
      done();
    });

    afterEach(function() {
      if (this.wrapper) {
        this.wrapper.remove();
      }
    });

    describe('and the user inputs', function() {
      beforeEach(function() {
        this.findAddressSpy = chai.spy.on(this.autosuggestAddress, 'findAddress');
        this.testPostcodeSpy = chai.spy.on(this.autosuggestAddress, 'testFullPostcodeQuery');
      });

      describe('when the value does not match an existing query', function() {
        beforeEach(function(done) {
          this.autosuggestAddress.suggestAddresses('195 colle', [], false);
          setTimeout(done);
        });
        it('then the findAddress function should be called', function() {
          expect(this.findAddressSpy).to.have.been.called();
        });
      });

      describe('when the value is a full postcode', function() {
        const postcode = 'CF14 2NT';
        beforeEach(function(done) {
          this.autosuggestAddress.findAddress(postcode);
          setTimeout(done);
        });
        it('then the testFullPostcodeQuery function should return true', function() {
          expect(this.testPostcodeSpy).to.have.been.called();
          expect(this.autosuggestAddress.testFullPostcodeQuery(postcode)).to.equal(true);
        });
      });

      describe('when addresses are retrieved', function() {
        describe('when the query is not a part postcode', function() {
          beforeEach(function(done) {
            this.results = {
              response: {
                input: '196 coll',
                addresses: [
                  {
                    uprn: '100070332099',
                    bestMatchAddress: '196 College Road, Birmingham, B44 8HF',
                    bestMatchAddressType: 'PAF',
                  },
                  {
                    uprn: '100100119969',
                    bestMatchAddress: '196 College Road, Whitchurch, Cardiff, CF14 2NZ',
                    bestMatchAddressType: 'PAF',
                  },
                ],
              },
            };
            this.mapAddressesSpy = chai.spy.on(this.autosuggestAddress, 'addressMapping');
            this.autosuggestAddress.mapFindResults(this.results.response, 10, 200);
            setTimeout(done);
          });

          it('then the addressMapping function will be called', function() {
            expect(this.mapAddressesSpy).to.have.been.called();
          });
        });

        describe('when the query is a part postcode', function() {
          beforeEach(function(done) {
            this.results = {
              response: {
                partpostcode: 'cf14 2',
                postcodes: [
                  {
                    postcode: 'CF14 2AA',
                    streetName: 'Penlline Road',
                    townName: 'Whitchurch',
                    addressCount: 41,
                    firstUprn: 10002526869,
                    postTown: 'Cardiff',
                  },
                  {
                    postcode: 'CF14 2AB',
                    streetName: 'Penlline Road',
                    townName: 'Whitchurch',
                    addressCount: 1,
                    firstUprn: 10002511038,
                    postTown: 'Cardiff',
                  },
                ],
              },
            };
            this.postcodeGroupsMappingSpy = chai.spy.on(this.autosuggestAddress, 'postcodeGroupsMapping');
            this.replaceSingleCountAddressesSpy = chai.spy.on(this.autosuggestAddress, 'replaceSingleCountAddresses');
            this.createAddressObjectSpy = chai.spy.on(this.autosuggestAddress, 'createAddressObject');
            this.autosuggestAddress.mapFindResults(this.results.response, 10, 200);
            setTimeout(done);
          });

          it('then the postcodeGroupsMapping function will be called', function() {
            expect(this.postcodeGroupsMappingSpy).to.have.been.called();
          });

          it('then the replaceSingleCountAddresses function will be called', function() {
            expect(this.replaceSingleCountAddressesSpy).to.have.been.called();
          });

          describe('when the results contain an address with an address count of 1', function() {
            it('then the createAddressObject function will be called', function() {
              expect(this.createAddressObjectSpy).to.have.been.called();
            });
          });
        });

        describe('when a non-grouped address is selected', function() {
          beforeEach(function(done) {
            this.selectedResult = {
              lang: '195 College Road, Whitchurch, Cardiff, CF14 2NT',
              sanitisedText: '195 college road whitchurch cardiff cf14 2nt',
              uprn: '100100119968',
              displayText: '195 College Road, Whitchurch, Cardiff, CF14 2NT',
            };
            this.formattedAddress = {
              addressLine1: '195 College Road',
              addressLine2: 'Whitchurch',
              addressLine3: '',
              townName: 'Cardiff',
              postcode: 'CF14 2NT',
            };
            this.retrieveAddressSpy = chai.spy.on(this.autosuggestAddress, 'retrieveAddress');
            this.autosuggestAddress.onAddressSelect(this.selectedResult);
            setTimeout(done);
          });

          it('then the retrieveAddress function will be called', function() {
            expect(this.retrieveAddressSpy).to.have.been.called();
          });

          describe('when the address is retrieved', function() {
            beforeEach(function() {
              this.address = {
                response: {
                  address: {
                    uprn: '100100119968',
                    formattedAddress: '195 College Road, Whitchurch, Cardiff, CF14 2NT',
                    addressLine1: '195 College Road',
                    addressLine2: 'Whitchurch',
                    addressLine3: '',
                    townName: 'Cardiff',
                    postcode: 'CF14 2NT',
                    foundAddressType: 'PAF',
                  },
                },
              };
            });

            it('then the address should be formatted correctly', function(done) {
              expect(this.autosuggestAddress.createAddressLines(this.address, done)).to.equal(this.formattedAddress);
            });
          });

          describe('when the address is set', function() {
            beforeEach(function(done) {
              this.addressSetter = new AddressSetter(this.context);
              this.manualModeSpy = chai.spy.on(this.addressSetter, 'setManualMode');
              this.triggerManualInputsChangesSpy = chai.spy.on(this.addressSetter, 'triggerManualInputsChanges');
              this.addressSetter.setAddress(this.formattedAddress);
              setTimeout(done);
            });

            it('then manual mode should be set', function() {
              expect(this.manualModeSpy).to.have.been.called();
            });

            it('then triggerManualInputsChanges should be called', function() {
              expect(this.triggerManualInputsChangesSpy).to.have.been.called();
            });

            it('then the manual inputs should match the formatted address lines', function() {
              const addressline1 = this.wrapper.querySelector('#address-line1');
              const addressline2 = this.wrapper.querySelector('#address-line2');
              const addressTown = this.wrapper.querySelector('#address-town');
              const addressPostcode = this.wrapper.querySelector('#address-postcode');

              expect(addressline1.value).to.equal(this.formattedAddress.addressLine1);
              expect(addressline2.value).to.equal(this.formattedAddress.addressLine2);
              expect(addressTown.value).to.equal(this.formattedAddress.townName);
              expect(addressPostcode.value).to.equal(this.formattedAddress.postcode);
            });
          });

          describe('when a grouped address is selected', function() {
            beforeEach(function(done) {
              this.selectedResult = {
                lang: 'Penlline Road, Whitchurch, Cardiff, CF14 2AA',
                postcode: 'CF14 2AA',
                streetName: 'Penlline Road',
                townName: 'Whitchurch',
                postTown: 'Cardiff',
              };

              this.handleChangeSpy = chai.spy.on(this.autosuggestAddress.autosuggest, 'handleChange');

              setTimeout(() => {
                this.autosuggestAddress.onAddressSelect(this.selectedResult);
                done();
              });
            });

            it('then the handleChange function will be called', function() {
              expect(this.handleChangeSpy).to.have.been.called();
            });

            it('then input value should be the same as the selected results', function() {
              expect(this.autosuggestAddress.input.value).to.equal(this.selectedResult.lang);
            });
          });
        });
        describe('when a grouped address is selected', function() {
          beforeEach(function(done) {
            this.selectedResult = {
              lang: 'Penlline Road, Whitchurch, Cardiff, CF14 2AA',
              postcode: 'CF14 2AA',
              streetName: 'Penlline Road',
              townName: 'Whitchurch',
              postTown: 'Cardiff',
            };

            this.handleChangeSpy = chai.spy.on(this.autosuggestAddress.autosuggest, 'handleChange');

            setTimeout(() => {
              this.autosuggestAddress.onAddressSelect(this.selectedResult);
              done();
            });
          });

          it('then the handleChange function will be called', function() {
            expect(this.handleChangeSpy).to.have.been.called();
          });

          it('then input value should be the same as the selected results', function() {
            expect(this.autosuggestAddress.input.value).to.equal(this.selectedResult.lang);
          });
        });
      });

      describe('when the form is submitted', function() {
        describe('when the input is empty', function() {
          beforeEach(function(done) {
            this.setAriaStatusSpy = chai.spy.on(this.autosuggestAddress.autosuggest, 'setAriaStatus');

            this.mockedEvent = eventMock({ key: 'Enter' });
            this.autosuggestAddress.handleSubmit(this.mockedEvent);
            setTimeout(done);
          });

          it('then preventDefault should be called on the event', function() {
            expect(this.mockedEvent.preventDefault).to.have.been.called();
          });

          it('then setAriaStatus should be called', function() {
            expect(this.setAriaStatusSpy).to.have.been.called();
          });
        });

        describe('when the submit errors', function() {
          beforeEach(function(done) {
            this.errorPanel =
              '<div class="panel panel--error u-mb-m js-error-panel"><div class="panel__header"><div class="panel__title u-fs-r--b">There is a problem with your answer</div></div><div class="panel__body"><ol class="list list--bare"><li class="list__item"><span>1. </span><a class="list__link js-inpagelink js-error" href="#autosuggest-input-error">Enter an address</a></li></ol></div></div>';
            this.errorInput =
              '<div class="panel panel--error panel--simple" id="autosuggest-input-error"><div class="panel__body"><p class="panel__error"><strong>Enter an address</strong></p>';
            this.error = new AddressError(this.context);
            this.error.showErrorPanel();
            setTimeout(done);
          });

          it('then an error summary panel should be added to the DOM', function() {
            expect(this.errorPanel).to.exist;
          });

          it('then the input should be wrapped in an error', function() {
            expect(this.errorInput).to.exist;
          });
        });
      });
    });

    describe('When a fetch is made', function() {
      beforeEach(function() {
        this.result = {
          results: [{ 'en-gb': 'yes', alternatives: [], sanitisedAlternatives: [] }],
          totalResults: 1,
        };

        window.fetch = fetchMock(true, null, this.result);
      });

      it('and the fetch successfully returns', function() {
        this.autosuggestAddress.suggestAddresses('yes', [], false).should.eventually.eql(this.result);
      });
    });

    describe('When the fetch errors', function() {
      beforeEach(function() {
        window.fetch = fetchMock(false);
      });

      it('then the function should reject', function() {
        this.autosuggestAddress.suggestAddresses('yes', [], false).should.be.rejected;
      });
    });

    describe('When the API status is checked', function() {
      beforeEach(function(done) {
        setTimeout(() => {
          this.checkAPIStatusSpy = chai.spy.on(this.autosuggestAddress, 'checkAPIStatus');
          this.autosuggestAddress.checkAPIStatus();
          done();
        });
      });

      it('then checkAPIStatus function should be called', function() {
        expect(this.checkAPIStatusSpy).to.have.been.called();
      });
    });
  });
});

function renderComponent(params) {
  const html = template.render({ params });
  const wrapper = document.createElement('div');
  wrapper.classList.add('question');

  document.documentElement.setAttribute('lang', 'en');

  wrapper.innerHTML = html;

  document.body.appendChild(wrapper);

  const context = wrapper.querySelector('.field');
  const input = context.querySelector('.js-autosuggest-input');
  const resultsContainer = context.querySelector('.js-autosuggest-results');
  const listbox = context.querySelector('.js-autosuggest-listbox');
  const status = context.querySelector('.js-autosuggest-aria-status');
  const form = context.closest('form');
  const container = context.querySelector('.autosuggest-input');
  const search = context.querySelector('.js-address-input__search');
  const APIDomain = container.getAttribute('data-api-domain');
  return {
    wrapper,
    context,
    input,
    resultsContainer,
    listbox,
    status,
    form,
    container,
    search,
    APIDomain,
  };
}
