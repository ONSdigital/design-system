import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/address/_test-template.njk';
import '../../../scss/main.scss';
import AutosuggestAddress from '../../../components/input/autosuggest/autosuggest.address';
import AddressError from '../../../components/input/autosuggest/autosuggest.address.error';
import AddressSetter from '../../../components/input/autosuggest/autosuggest.address.setter';
import eventMock from 'stubs/event.stub.spec';
import fetchStub from 'stubs/window.fetch.stub.spec';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiSpies from 'chai-spies';
import fetchMock from 'fetch-mock';

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
    mandatory: true,
    options: {
      regionCode: 'gb-eng',
    },
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

let lang = 'en';

describe('Autosuggest.address component', function() {
  before(function(done) {
    awaitPolyfills.then(() => {
      this.rewiremock = require('rewiremock/webpack').default;
      done();
    });
  });

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

    describe('When the address setter is initialised', function() {
      describe('and the manual fields are empty', function() {
        beforeEach(function(done) {
          this.setManualModeSpy = chai.spy.on(this.autosuggestAddress.addressSetter, 'setManualMode');
          this.autosuggestAddress.addressSetter.toggleMode();
          setTimeout(done);
        });

        it('then the setManualMode function should be called', function() {
          expect(this.setManualModeSpy).to.have.been.called();
        });
      });

      describe('When the manual fields contain a value', function() {
        beforeEach(function(done) {
          this.autosuggestAddress.input.value = 'address line 1';
          this.wrapper.querySelector('#address-line1').value = 'address line 1';
          this.setManualModeSpy = chai.spy.on(this.autosuggestAddress.addressSetter, 'setManualMode');
          this.autosuggestAddress.addressSetter.toggleMode();
          setTimeout(done);
        });

        it('then the manual fields should be visible', function() {
          this.manualFields = this.wrapper.querySelector('.js-address-input__manual');
          expect(this.manualFields.classList.contains('u-db-no-js_enabled')).to.be.false;
        });

        it('then the autosuggest input should be cleared', function() {
          expect(this.autosuggestAddress.input.value).to.equal('');
        });
      });
    });

    describe('When the API status is checked', function() {
      beforeEach(function(done) {
        setTimeout(() => {
          const response = {
            status: {
              code: 403,
            },
          };
          fetchMock.get('https://whitelodge-ai-api.census-gcp.onsdigital.uk/addresses/eq?input=CF142&limit=10', JSON.stringify(response), {
            overwriteRoutes: true,
          });
          this.autosuggestAddress.checkAPIStatus();
          done();
        });
      });

      it('then fetch url should match params', function() {
        this.lookupURL = 'https://whitelodge-ai-api.census-gcp.onsdigital.uk/addresses/eq?input=CF142&limit=10';
        expect(this.autosuggestAddress.fetch.url).to.equal(this.lookupURL);
      });
    });

    describe('and the user inputs', function() {
      beforeEach(function() {
        this.findAddressSpy = chai.spy.on(this.autosuggestAddress, 'findAddress');
        this.abortSpy = chai.spy.on(this.autosuggestAddress.fetch, 'abort');
        this.testPostcodeSpy = chai.spy.on(this.autosuggestAddress, 'testFullPostcodeQuery');
        this.generateURLParamsSpy = chai.spy.on(this.autosuggestAddress, 'generateURLParams');
      });

      describe('and a query is sent', function() {
        beforeEach(function(done) {
          this.autosuggestAddress.suggestAddresses('195 colle', [], false);
          setTimeout(done);
        });

        it('then the findAddress function should be called', function() {
          expect(this.findAddressSpy).to.have.been.called();
        });

        it('then the fetch url should contain the correct limit parameter', function() {
          this.limit = 10;
          expect(this.autosuggestAddress.fetch.url).to.equal(
            'https://whitelodge-ai-api.census-gcp.onsdigital.uk/addresses/eq?input=195 colle&limit=10',
          );
        });

        it('then any current fetches should be aborted', function() {
          expect(this.abortSpy).to.have.been.called();
        });
      });

      describe('when the value is a full postcode', function() {
        const postcode = 'CF14 2NT';
        beforeEach(function(done) {
          this.results = {
            response: {
              input: 'CF14 2NT',
              addresses: [
                {
                  uprn: '100070332099',
                  formattedAddress: '196 College Road, Birmingham, B44 8HF',
                  addressType: 'PAF',
                },
                {
                  uprn: '100100119969',
                  formattedAddress: '196 College Road, Whitchurch, Cardiff, CF14 2NZ',
                  addressType: 'PAF',
                },
              ],
            },
          };
          this.autosuggestAddress.findAddress(postcode);
          this.addressMappingSpy = chai.spy.on(this.autosuggestAddress, 'addressMapping');
          setTimeout(done);
        });

        it('then the testFullPostcodeQuery function should return true', function() {
          expect(this.testPostcodeSpy).to.have.been.called();
          expect(this.autosuggestAddress.testFullPostcodeQuery(postcode)).to.equal(true);
        });

        it('then the generateURLParams function should be called', function() {
          expect(this.generateURLParamsSpy).to.have.been.called();
        });

        it('then the fetch url should contain the correct limit parameter', function() {
          this.limit = 100;
          expect(this.autosuggestAddress.fetch.url).to.equal(
            'https://whitelodge-ai-api.census-gcp.onsdigital.uk/addresses/eq?input=CF14 2NT&limit=100',
          );
        });

        it('then the addressMapping function will be called', function() {
          this.autosuggestAddress.mapFindResults(this.results.response, 10, 200);
          expect(this.addressMappingSpy).to.have.been.called();
        });
      });

      describe('when addresses are retrieved', function() {
        beforeEach(function(done) {
          this.response = {
            status: {
              code: 200,
            },
            response: {
              input: '195 colle',
              limit: 10,
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

          fetchMock.get(
            'https://whitelodge-ai-api.census-gcp.onsdigital.uk/addresses/eq?input=195 colle&limit=10',
            JSON.stringify(this.response),
            {
              overwriteRoutes: true,
            },
          );
          this.autosuggestAddress.findAddress('195 colle', false);
          setTimeout(done);
        });

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
            this.addressMappingSpy = chai.spy.on(this.autosuggestAddress, 'addressMapping');
            this.autosuggestAddress.mapFindResults(this.results.response, 10, 200);
            setTimeout(done);
          });

          it('then the addressMapping function will be called', function() {
            expect(this.addressMappingSpy).to.have.been.called();
          });
        });

        describe('when the query is a part postcode', function() {
          beforeEach(function(done) {
            this.postcodeGroupsMappingSpy = chai.spy.on(this.autosuggestAddress, 'postcodeGroupsMapping');
            this.replaceSingleCountAddressesSpy = chai.spy.on(this.autosuggestAddress, 'replaceSingleCountAddresses');
            this.createAddressObjectSpy = chai.spy.on(this.autosuggestAddress, 'createAddressObject');
            const lang = 'en';
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

            this.items = [
              {
                addressCount: 41,
                [lang]: 'Penlline Road, Whitchurch, Cardiff, CF14 2AA (<span class="autosuggest-input__group">41 addresses</span>)',
                firstUprn: 10002526869,
                postTown: 'Cardiff',
                postcode: 'CF14 2AA',
                streetName: 'Penlline Road',
                townName: 'Whitchurch',
              },
              {
                [lang]: 'Penlline Road, Whitchurch, Cardiff, CF14 2AB',
                sanitisedText: 'penlline road, whitchurch, cardiff, cf14 2ab',
                uprn: '10002511038',
              },
            ];

            fetchMock.get(
              'https://whitelodge-ai-api.census-gcp.onsdigital.uk/addresses/eq/bucket?postcode=CF14 2AA&streetname=Penlline Road&townname=Whitchurch&limit=100',
              JSON.stringify(this.results),
              {
                overwriteRoutes: true,
              },
            );

            this.autosuggestAddress.mapFindResults(this.results.response, 10, 200);
            setTimeout(done);
          });

          it('then the postcodeGroupsMapping function will be called', function() {
            expect(this.postcodeGroupsMappingSpy).to.have.been.called();
            this.autosuggestAddress.postcodeGroupsMapping(this.results).should.eventually.eql(this.items);
          });

          it('then the replaceSingleCountAddresses function will be called', function() {
            expect(this.replaceSingleCountAddressesSpy).to.have.been.called();
          });

          describe('when the results contain an address with an address count of 1', function() {
            it('then the createAddressObject function will be called', function() {
              expect(this.createAddressObjectSpy).to.have.been.called();
            });

            describe('when the createAddressObject is called', function() {
              const uprn = '10002511038';
              beforeEach(function(done) {
                this.retrieveAddressSpy = chai.spy.on(this.autosuggestAddress, 'retrieveAddress');
                this.autosuggestAddress.createAddressObject(uprn);
                setTimeout(done);
              });

              it('then the retrieveAddress function will be called', function() {
                expect(this.retrieveAddressSpy).to.have.been.called();
              });

              describe('When the result is returned', function() {
                beforeEach(function(done) {
                  setTimeout(() => {
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
                    fetchMock.get(
                      'https://whitelodge-ai-api.census-gcp.onsdigital.uk/addresses/eq/uprn/100100119968?addresstype=paf',
                      JSON.stringify(this.address),
                      {
                        overwriteRoutes: true,
                      },
                    );
                    const lang = 'en';
                    this.createdObject = {
                      [lang]: '195 College Road, Whitchurch, Cardiff, CF14 2NT',
                      sanitisedText: '195 college road whitchurch cardiff cf14 2nt',
                      uprn: '100100119968',
                    };
                    done();
                  });
                });

                it('then the object will contain the values', function() {
                  const uprn = '100100119968';
                  this.autosuggestAddress.createAddressObject(uprn).should.eventually.eql(this.createdObject);
                });
              });
            });
          });
        });

        describe('when a non-grouped address is selected', function() {
          beforeEach(function(done) {
            this.retrieveAddressSpy = chai.spy.on(this.autosuggestAddress, 'retrieveAddress');
            this.address = {
              response: {
                address: {
                  uprn: '100081151291',
                  formattedAddress: 'University Of Hertfordshire, Meridian House 32-36, The Common, Hatfield, AL10 0NZ',
                  addressLine1: 'University Of Hertfordshire',
                  addressLine2: 'Meridian House 32-36',
                  addressLine3: 'The Common',
                  townName: 'Hatfield',
                  postcode: 'AL10 0NZ',
                  foundAddressType: 'PAF',
                },
              },
            };
            this.selectedResult = {
              lang: 'University Of Hertfordshire, Meridian House 32-36, The Common, Hatfield, AL10 0NZ',
              sanitisedText: 'university of hertfordshir meridian house 32-36 the common, hatfield, al10 0nz',
              uprn: '100081151291',
              displayText: 'University Of Hertfordshire, Meridian House 32-36, The Common, Hatfield, AL10 0NZ',
            };
            this.formattedAddress = {
              addressLine1: 'University Of Hertfordshire, Meridian House 32-36',
              addressLine2: 'The Common',
              addressLine3: '',
              townName: 'Hatfield',
              postcode: 'AL10 0NZ',
            };

            fetchMock.get(
              'https://whitelodge-ai-api.census-gcp.onsdigital.uk/addresses/eq/uprn/100081151291?addresstype=paf',
              JSON.stringify(this.address),
              {
                overwriteRoutes: true,
              },
            );
            this.autosuggestAddress.onAddressSelect(this.selectedResult);
            setTimeout(done);
          });

          it('then the retrieveAddress function will be called', function() {
            expect(this.retrieveAddressSpy).to.have.been.called();
          });

          describe('when the address is retrieved', function() {
            it('then the address should be formatted correctly', function(done) {
              expect(this.autosuggestAddress.createAddressLines(this.address, done)).to.equal(this.formattedAddress);
            });
          });

          describe('when the address is set', function() {
            beforeEach(function(done) {
              this.addressSetter = new AddressSetter(this.context);
              this.manualModeSpy = chai.spy.on(this.addressSetter, 'setManualMode');
              this.addressSetter.setAddress(this.formattedAddress);
              setTimeout(done);
            });

            it('then manual mode should be set', function() {
              expect(this.manualModeSpy).to.have.been.called();
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

        describe('when there is an error retrieving the address', function() {
          beforeEach(function(done) {
            this.selectedResult = {
              uprn: 'bad',
            };
            this.handleAPIErrorSpy = chai.spy.on(this.autosuggestAddress, 'handleAPIError');
            setTimeout(() => {
              const response = {
                status: {
                  code: 400,
                },
              };
              fetchMock.get(
                'https://whitelodge-ai-api.census-gcp.onsdigital.uk/addresses/eq/uprn/bad?addresstype=paf',
                JSON.stringify(response),
                {
                  overwriteRoutes: true,
                },
              );
              this.autosuggestAddress.onAddressSelect(this.selectedResult);
              done();
            });
          });

          it('then handleAPIError function should be called', function() {
            this.autosuggestAddress.onAddressSelect(this.selectedResult).should.eventually.be.called();
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

        describe('when the submit is invalid', function() {
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

        describe('when the mode is set to manual', function() {
          beforeEach(function(done) {
            this.autosuggestAddress.addressSetter.setManualMode(true, false);
            setTimeout(done);
          });

          it('then the error summary should be removed', function() {
            expect(this.errorPanel).to.not.exist;
          });
        });
      });
    });

    describe('When a fetch is made', function() {
      beforeEach(function() {
        this.result = {
          results: [{ en: 'yes', alternatives: [], sanitisedAlternatives: [] }],
          totalResults: 1,
        };

        window.fetch = fetchStub(true, null, this.result);
      });

      it('and the fetch successfully returns', function() {
        this.autosuggestAddress.suggestAddresses('yes', [], false).should.eventually.eql(this.result);
      });
    });
  });

  describe('when the language is Welsh', function() {
    beforeEach(function(done) {
      lang = 'cy';
      const component = renderComponent(params);

      Object.keys(component).forEach(key => {
        this[key] = component[key];
      });

      const context = this.context;
      this.autosuggestAddress = new AutosuggestAddress(context);
      this.autosuggestAddress.suggestAddresses('195 colle', [], false);
      setTimeout(done);
    });

    afterEach(function() {
      if (this.wrapper) {
        this.wrapper.remove();
      }
    });

    it('then the fetch url should contain the favour Welsh parameter', function() {
      this.limit = 10;
      expect(this.autosuggestAddress.fetch.url).to.equal(
        'https://whitelodge-ai-api.census-gcp.onsdigital.uk/addresses/eq?input=195 colle&limit=10&favourwelsh=true',
      );
    });
  });

  describe('When the component initialises a non-editable address lookup', function() {
    const paramsAlt = {
      id: 'address',
      autosuggest: {
        externalInitialiser: true,
      },
    };

    beforeEach(function(done) {
      const component = renderComponent(paramsAlt);

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
  });

  describe('When the component initialises with options - english, epoch, educational', function() {
    const paramsOptions = {
      id: 'address',
      autosuggest: {
        externalInitialiser: true,
        options: {
          regionCode: 'gb-eng',
          oneYearAgo: true,
          addressType: 'educational',
        },
      },
    };

    beforeEach(function(done) {
      lang = 'en';
      const component = renderComponent(paramsOptions);

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

    describe('and a query is sent', function() {
      beforeEach(function(done) {
        this.autosuggestAddress.suggestAddresses('195 colle', [], false);
        setTimeout(done);
      });

      it('then the fetch url should contain the correct parameters', function() {
        this.limit = 10;
        expect(this.autosuggestAddress.fetch.url).to.equal(
          '/addresses/eq?input=195 colle&limit=10&classificationfilter=educational&epoch=72',
        );
      });
    });
  });

  describe('When the component initialises with options - ni, educational', function() {
    const paramsOptions = {
      id: 'address',
      autosuggest: {
        externalInitialiser: true,
        options: {
          regionCode: 'gb-nir',
          addressType: 'educational',
        },
      },
    };

    beforeEach(function(done) {
      lang = 'en';
      const component = renderComponent(paramsOptions);

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

    describe('and a query is sent', function() {
      beforeEach(function(done) {
        this.autosuggestAddress.suggestAddresses('195 colle', [], false);
        setTimeout(done);
      });

      it('then the fetch url should contain the correct parameters', function() {
        this.limit = 10;
        expect(this.autosuggestAddress.fetch.url).to.equal(
          '/addresses/eq?input=195 colle&limit=10&classificationfilter=educational&fromsource=nionly',
        );
      });
    });
  });

  describe('When the component initialises with options - ni, workplace', function() {
    const paramsOptions = {
      id: 'address',
      autosuggest: {
        externalInitialiser: true,
        options: {
          regionCode: 'gb-nir',
          addressType: 'workplace',
        },
      },
    };

    beforeEach(function(done) {
      lang = 'en';
      const component = renderComponent(paramsOptions);

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

    describe('and a query is sent', function() {
      beforeEach(function(done) {
        this.autosuggestAddress.suggestAddresses('195 colle', [], false);
        setTimeout(done);
      });

      it('then the fetch url should contain the correct parameters', function() {
        this.limit = 10;
        expect(this.autosuggestAddress.fetch.url).to.equal(
          '/addresses/eq?input=195 colle&limit=10&classificationfilter=workplace&fromsource=niboost',
        );
      });
    });

    describe('and an address is selected', function() {
      beforeEach(function(done) {
        this.autosuggestAddress.retrieveAddress('11000000');
        setTimeout(done);
      });

      it('then the retrieve url should contain the correct parameters', function() {
        expect(this.autosuggestAddress.fetch.url).to.equal('/addresses/eq/uprn/11000000?addresstype=nisra');
      });
    });
  });

  describe('When the component initialises with options - wales, workplace', function() {
    const paramsOptions = {
      id: 'address',
      autosuggest: {
        externalInitialiser: true,
        options: {
          regionCode: 'gb-wls',
          addressType: 'workplace',
        },
      },
    };

    beforeEach(function(done) {
      lang = 'cy';
      const component = renderComponent(paramsOptions);

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

    describe('and a query is sent', function() {
      beforeEach(function(done) {
        this.autosuggestAddress.suggestAddresses('195 colle', [], false);
        setTimeout(done);
      });

      it('then the fetch url should contain the correct parameters', function() {
        this.limit = 10;
        expect(this.autosuggestAddress.fetch.url).to.equal(
          '/addresses/eq?input=195 colle&limit=10&classificationfilter=workplace&fromsource=ewboost&favourwelsh=true',
        );
      });
    });

    describe('and an address is selected', function() {
      beforeEach(function(done) {
        this.autosuggestAddress.retrieveAddress('11000000');
        setTimeout(done);
      });

      it('then the retrieve url should contain the correct parameters', function() {
        expect(this.autosuggestAddress.fetch.url).to.equal('/addresses/eq/uprn/11000000?addresstype=welshpaf');
      });
    });
  });
});

function renderComponent(params) {
  const html = template.render({ params });
  const wrapper = document.createElement('form');
  wrapper.classList.add('question');

  document.documentElement.setAttribute('lang', lang);

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
