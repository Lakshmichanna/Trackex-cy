class Hotelpage {


    bookyourtrip = '#BOOK_TRIP > .kt-menu__link-icon > .icon'
    hoteltab = '.nav-link.ng-star-inserted.active'
    whereto = 'input[name="pickup"]'
    selectwhereto = '#ngb-typeahead-2-0'
    checkin = "input[placeholder='check-in']"
    checkout = "input[placeholder='check-out']"
    nextmonth = "button[title='Next month']"
    journeydate = 'ngb-datepicker .ngb-dp-day'
    destination = '#DestinationField'
    searchbtn = '.theme-search-area-submit'
    failmsg = '[style="border: 1px solid transparent;border-color: #bce8f1;background-color: #d9edf7;padding: 15px;"]'
    resultloading = '.flt-img'
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






    hotelsearch(place, checkindate, checkoutdate, room) {

        // Navigate to Book Your Page
        cy.get(this.bookyourtrip).click()
        cy.wait(1000)
        cy.get(this.destination).click()
        cy.wait(1000)
        // Selecting the Hotel tab
        cy.contains('HOTEL').click()
        cy.wait(500)
        // Hotel search 
        cy.get(this.whereto).type(place)
        cy.get(this.selectwhereto).click()
        cy.get(this.checkin).dblclick()
        // cy.get(this.checkin).click()
        cy.get(this.nextmonth, { timeout: 10000 }).click()
        cy.get(this.journeydate).contains(checkindate).click()
        cy.wait(1000)
        cy.get(this.checkout).dblclick()
        cy.get(this.journeydate).contains(checkoutdate).click()
        if (room == 1) {

            cy.log('Single room search')
        }
        else if (room == 2) {
            // Select guests
            cy.get('.roomBooking').click();
            cy.get('.roomsGuestsBottom > .btn-secondary').click()
            cy.get('.btn-group').contains('2').click()
            cy.get('.roomsGuestsBottom > .btn-primary').click()
            // cy.get('.txt-ellipses').should('contain', '2 Person in 1 Room');
        }
        else {
            cy.log('Invalid room selection')
        }
        cy.get(this.searchbtn).click()

    }

hotelselect(){

        cy.url().should('include', '/hotelSearch');
        cy.elementIsPresent(this.resultloading).then((isPresent) => {
            if (isPresent) {
                cy.log('Loading the search results....')
                // Perform further actions
            } else {
                cy.log('Something wrong in search')
            }
        })
        cy.get('body').then(($body) => {
            if ($body.find(this.failmsg, { timeout: 70000 }).length > 0) {

                cy.log('Results are failed with error')
                cy.screenshot()
                // Perform further actions
            } else {
                cy.log('Search results are loading.....')
            }
        })

        // Waiting for Finding best hotel taking more than expected time pop up
        cy.get('#swal2-title', { timeout: 90000 }).should('be.visible')
        cy.elementIsPresent("button[class='swal2-confirm swal2-styled']", { timeout: 5000 }).then((isPresent) => {
            if (isPresent) {
                cy.get("button[class='swal2-confirm swal2-styled']").click()
                cy.log('Finding best hotel taking more than expected time ')
                // Perform further actions
            } else {
                cy.log('Expected time pop up not displayed')
            }
        })

        // Select the hotel first record in reslt page
        cy.get('.showlistClass', { timeout: 65000 }).then((res) => {

            if (res.length > 0) {
                cy.get('.price-btn>a').eq(0).click()
            }
            else {
                cy.log('No results in result page')
            }
        })
        // Selecting the room in hotel
        cy.get('.price-btn>a').eq(1).scrollIntoView().click()

      
    }
hotelbook(room){

    cy.get('#reason').type('Hotel reservation')
    cy.get("input[value='Next Step']").click()
        // Traveler details - Room 2 details 
        if (room == 2) {
            cy.get('input[type="radio"][value="MR"]').eq(1).click({ force: true })
            cy.get('#firstName20').type('second test', { force: true })
            cy.get('#lastName20').type('sec last name', { force: true })
            cy.get('input[formcontrolname="saveTraveller"]').check({ force: true })
        }
        cy.wait(1000)
        // Next button in traveler details
        cy.get('.btn-brand').click()

        cy.contains('TrackEx Corporate Wallet').click()
        cy.storevalue('div.pay_amountinfo span:nth-of-type(2)', 'amount')

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


        cy.wait(30000)
        cy.log('Loading .......');

        cy.get('body').then(($body) => {
            if ($body.find('.alert-icon > .la').length > 0) { // If trip ID is found
                cy.log('Trip ID found:');
                cy.get(this.gettripid, { timeout: 10000 }).should('be.visible').then((trip) => {
                    cy.log('Trip id is - ' + trip.text());
                    cy.get("app-flight-confirmation[class='ng-star-inserted'] span:nth-child(3)").invoke('text').then((ticketamount) => {
                        cy.log('Amount in ticket' + ticketamount)
                        const paymentamount = Cypress.env('amount')
                        expect(ticketamount).to.equal(paymentamount)
                        cy.screenshot(trip.text())
                    });
                })

            } else {
                // If no trip ID is found, check for the popup
                cy.get('body').then(($popup) => {
                    // Click the "OK" button if it's present
                    if ($popup.find(this.popup).length > 0) {
                        cy.log('Clicking OK button.')
                        cy.get(this.popupok).click()

                        // Optionally log the popup message
                        cy.get('#swal2-content').invoke('text').then((popupMessage) => {
                            cy.log(`Popup Message: ${popupMessage}`)
                        })
                    }
                })
            }
        })

    }

    hotelapproval(place, checkindate, checkoutdate, room){

        this.hotelsearch(place, checkindate, checkoutdate, room)
        this.hotelselect()
        cy.wait(500)
        cy.get('.alert').should('be.visible')
        cy.wait(5000)
        cy.get('.close').click()
        cy.get('#Home').click()
        // get the trip id from the activities table
        cy.xpath(this.approvaltripid).then($field => {
            const id = $field.text(); // Get the value of the input field

            cy.log('Tripapprovalid:' + id)
            Cypress.env('Tripapprovalid', id); // Set the value in Cypress.env

        })
        cy.wait(2000)
    }

} export default Hotelpage;