

class Flightpage {

    bookyourtrip = '#BOOK_TRIP > .kt-menu__link-icon > .icon'
    roundtype = "//a[normalize-space()='Round Trip']"
    destination = '#DestinationField'
    origin = '#OriginField'
    orgselect = '#ngb-typeahead-0-0'
    desselect = '#ngb-typeahead-1-0'
    onewaydate = "input[placeholder='Departing']"
    roundtripdate = "input[placeholder='Departing – Returning']"
    nextmonth = "button[title='Next month']"
    journeydate = 'ngb-datepicker .ngb-dp-day' 
    returndate = '.ngb-dp-day'
    travelerfield = "a[role='button']" 
    traveler2 = "div[class='adults pb-3'] button:nth-child(2)"
    searchbtn = 'Search'
    tripselect = ':nth-child(2) > .kt-portlet > .kt-portlet__body > :nth-child(1) > .col-sm-8 > .float-left > :nth-child(1) > .col-md-10 > .row'
    sendforapproval = '.btn.btn-warning.text-white.px-4.bk_select.btn-tall.d-md-inline-block.ng-star-inserted'
    loading = '.flt-img'
    failmsg = 'div.ng-star-inserted > .ng-star-inserted'
    results = '#Flightlists > :nth-child(1) > .kt-portlet > .kt-portlet__body'
    select = ':nth-child(1) > .kt-portlet > .kt-portlet__body > :nth-child(1) > .col-sm-4 > .listing-price > .price-btn > .btn'
    grade2 = '.col-sm-12 > .d-block'
    reason = '#reason'
    reviewnxtbtn = '.d-flex > .btn'
    tittle = "input[type='radio'][value='MR']"
    firstname = '#AFirstNameTrackExB2E1'
    lastname = '#ALastNameTrackExB2E1'
    dob = '#ADOBTrackExB2E1'
    savetraveler = 'input[type="checkbox"]'
    travelernxtbtn = '.kt-form__actions > .btn-primary'
    detailspopup = '.btn.btn-primary.font-weight-bold'
    wallettab = '#wallets-tab'
    balancecheck = '.text-success.mr-3'
    walletbtn = "div[class='ng-star-inserted'] button[class='btn btn-warning text-white px-4 btn-tall payment-btn']"
    cardtab = '#cards-tab'
    cardnum = '#paymentCardNumberTrackExB2E'
    cardname = '#paymentCardNameTrackExB2E'
    cardmonth = '#paymentExpMonthTrackExB2E'
    expiryyear = '#paymentExpyearTrackExB2E'
    cvv = '#paymentCVVTrackExB2E'
    paybtn = '.cardSection > :nth-child(1) > .col-lg-10 > :nth-child(1) > .mt-5 > .row > .col-5 > .btn'
    tripid = '.kt-portlet__body > .alert'
    popup = '.swal2-popup'
    popupok = '.swal2-confirm'
    gettripid = "h4[class='kt-portlet__head-title'] span span[class='kt-font-primary d-sm-inline-block d-block']"
    approvaltripid = "(//p[contains(text(),'ID No.')])[1]//preceding-sibling::span"

    bookpages(traveler, firstname, lastname, dob) {
        //reveiw page
        cy.get(this.reason).type('Booking')
        cy.get(this.reviewnxtbtn).click()
        //traveler page
        cy.get(this.travelernxtbtn, { timeout: 50000 }).should('be.visible')
        if (traveler > 1) {
            this.travelersdetails(firstname, lastname, dob)
        }
        cy.get(this.travelernxtbtn).click()
        // Review details pop up 
        cy.wait(2000)
        cy.get(this.detailspopup).click({ force: true })
        // payment page 
        cy.get(this.wallettab).click()
        // payment throught wallet
        if (cy.get(this.balancecheck).should('have.text', 'Balance is available')) {
            cy.get(this.walletbtn).click()
        }
        else {
            // payment throught wallet credit card
            cy.get(this.cardtab).click()
            cy.get(this.cardnum).type('370000000000002')
            cy.get(this.cardname).type('NDN Nidhi')
            cy.get(this.cardmonth).type('05')
            cy.get(this.expiryyear).type('2027')
            cy.get(this.cvv).type('852')
            cy.get(this.paybtn).click()
        }

        // Checking the trip is booked or not    
        cy.wait(30000)
        cy.log('Loading .......');

        cy.get('body').then(($body) => {
            if ($body.find('.alert-icon > .la').length>0) { // If trip ID is found
                cy.log('Trip ID found:');
                cy.get(this.gettripid, { timeout:10000 }).should('be.visible').then((trip) => {
                    cy.log('Trip id is - ' + trip.text());
                })
            
            } else {
                // If no trip ID is found, check for the popup
                cy.get('body').then(($popup) => {
                         // Click the "OK" button if it's present
                        if ($popup.find(this.popup).length > 0) {
                            cy.log('Clicking OK button.');
                            cy.get(this.popupok).click();
                    
                        // Optionally log the popup message
                        cy.get('#swal2-content').invoke('text').then((popupMessage) => {
                            cy.log(`Popup Message: ${popupMessage}`);
                        });
                    }
                });
            }
        })

        /*
        // Perform actions when the button exists in failed pop up
        cy.get(this.popup, { timeout: 60000 }).then(($popup) => {
            if ($popup.length > 0) { // Check if the popup exists
                cy.log('Booking failed... ');
                cy.screenshot('failure-screenshot');
                cy.get(this.popupok).click();
            } else {
                // Log the trip id if the trip is booked 
                cy.get(this.gettripid, { timeout: 60000 }).should('be.visible').then((trip) => {
                    cy.log('Trip id is - ' + trip.text());
                });
            }
        });


        /*       
       //cy.elementIsPresent(this.popup).then((isPresent) => {
       if(cy.get(this.popup, { timeout: 60000 }).length > 0) 
         { // Perform actions when the button exists in failed pop up
           cy.log('Booking failed... ');
           cy.screenshot('failure-screenshot');
           cy.get('.swal2-confirm').click();
        }
        else{
           cy.log('Something wrong in booking');
        }
   //})*/

    }



    flightsearch(originairport, destinationairport, journeydate, traveler) {

        cy.get(this.bookyourtrip).click()
        // Flight search fields
        cy.get(this.origin).should('be.visible')
        cy.wait(1000)
        cy.get(this.destination).click()
        cy.wait(1000)
        cy.get(this.origin).type(originairport), { parseSpecialCharSequences: false }
        cy.get(this.orgselect).click()
        cy.get(this.destination).type(destinationairport)
        cy.get(this.desselect).click()
        // double click the element bcz calendar is hidding for one click 
        cy.get(this.onewaydate).click()
        cy.get(this.onewaydate).click()
        cy.get(this.nextmonth).click()
        cy.get(this.journeydate).contains(journeydate).click();
        if (traveler == 2) {
            cy.get(this.travelerfield).click()
            cy.wait(2000)
            cy.get(this.traveler2).click()
        }
        cy.wait(1000)
        cy.contains(this.searchbtn).click()



    }

    resultpage() {

        // Checking the flight loading message 
        cy.elementIsPresent(this.loading).then((isPresent) => {
            if (isPresent) {
                cy.log('Loading the search results....');
                // Perform further actions
            } else {
                cy.log('Something wrong in search')
            }
        });

        // Checking the error message if results are failed

        cy.get(this.failmsg, { timeout: 5000 }).then(($fail) => {
            if ($fail > 0) {
                cy.log('Results are failed with error')
                cy.screenshot()
                // Perform further actions
            } else {
                cy.log('Search results are loading.....')
            }
        })
        // Waiting for the element to be visible
        cy.get(this.results, { timeout: 60000 }).should('be.visible')
        cy.wait(2000)
        cy.get(this.select).click({ force: true })
        cy.wait(2000)
        //upgrade option selecting if display
        cy.singleelement(this.grade2, 'selecting the 2nd upgrade option', 'No upgrade options displayed to select')
        // below is the code replaced with above one line code  
        /*  cy.get('body').then(($body) => {
              if ($body.find(this.grade2).length > 0) {
                  // selecting the 2nd upgrade option
                  cy.get(this.grade2).click()
              }
              else {
                  cy.log('No upgrade options displayed to select')
              }
  
          })*/


    }



    travelersdetails(firstname, lastname, dob) {

        //traveler details page 
        cy.get(this.firstname, { timeout: 20000 }).should('be.visible')

        // Check the "Mr." radio button
        cy.get(this.tittle).check({ force: true });

        // Fill in the first and last name
        cy.get(this.firstname).click({ force: true }).type(firstname);
        cy.get(this.lastname).click({ force: true }).type(lastname);

        // Fill in the date of birth
        cy.get(this.dob).type(dob); // Format MM/DD/YYYY '01/01/1990'

        // Check the "Save Traveler" checkbox
        cy.get(this.savetraveler).check({ force: true })
    }


    roundtripsearch(originairport,destinationairport,journeydate,journeydate1,traveler) {
        cy.get(this.bookyourtrip).click()
        // Flight search fields
        //cy.get(this.origin).should('be.visible')
        cy.wait(1000)
        cy.get(this.destination).click()
        cy.xpath(this.roundtype).click({force: true})
        cy.wait(1000)
        cy.get(this.origin).type(originairport), { parseSpecialCharSequences: false }
        cy.get(this.orgselect).click()
        cy.get(this.destination).type(destinationairport)
        cy.get(this.desselect).click()
        cy.get(this.roundtripdate).click()
        cy.get(this.roundtripdate).click()
        cy.get(this.nextmonth).click()
        cy.wait(500);
        cy.get(this.journeydate).contains(journeydate).click();
        // Optionally wait for some time or check the selection
        cy.wait(500);
        // Select Return Date
        cy.get(this.returndate).contains(journeydate1).click();
        cy.wait(1000)
        if (traveler == 2) {
            cy.get(this.travelerfield).click()
            cy.wait(1000)
            cy.get(this.traveler2).click()
        }
        cy.wait(1000)
        cy.contains(this.searchbtn).click()
    }

    sendapproval(originairport, destinationairport, journeydate, traveler){
        this.flightsearch(originairport, destinationairport, journeydate, traveler)
        cy.elementIsPresent(this.loading).then((isPresent) => {
            if (isPresent) {
                cy.log('Loading the search results....');
                // Perform further actions
            } else {
                cy.log('Something wrong in search')
            }
        });

        // Checking the error message if results are failed

        cy.get(this.failmsg, { timeout: 5000 }).then(($fail) => {
            if ($fail > 0) {
                cy.log('Results are failed with error')
                cy.screenshot()
                // Perform further actions
            } else {
                cy.log('Search results are loading.....')
            }
        })
        //Waiting for the results to display
        cy.get(this.results, { timeout: 60000 }).should('be.visible')
        cy.wait(2000)
        //selecting the trip in results & click on send for approval
        cy.get(this.tripselect,{timeout: 5000}).click()
        cy.wait(2000)
        cy.get(this.sendforapproval).click()
        cy.wait(5000)
        cy.get('#Home').click()
        // get the trip id from the activities table
       cy.xpath(this.approvaltripid).then($field => {
        const id = $field.text(); // Get the value of the input field
        
            cy.log('Tripid:'+id)
            Cypress.env('Tripapprovalid', id); // Set the value in Cypress.env
          
    })
    

   
       
    }
}
export default Flightpage;