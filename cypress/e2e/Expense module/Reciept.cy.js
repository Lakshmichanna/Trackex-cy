

import Loginpage from '../Pages/Loginpage';
import Receiptpage from '../Pages/Receiptpage';
import Flightpage from '../Pages/Flightpage'

describe('Receipts', () => {

  const lp = new Loginpage()
  const rp = new Receiptpage()
  const fp = new Flightpage()

  beforeEach('passes', () => {
    // Getting the fixture file data into function 
    cy.fixture('Login').then((logindata) => {

      lp.launch()
      lp.login(logindata.email, logindata.password)
      lp.popupoverride()

    })
  })

  it('Multiple Receipt Creation', () => {

    // Getting the fixture file into function 
    cy.fixture('Receipt').then((rpt) => {
      // below is used for multiple records in array
      rpt.forEach((rec) => {
        // Clicking add receipt button
        rp.addreceipt()
        // Entering the basic details of receipt
        rp.basicreceipt(rec.expensetype, rec.description, rec.country, rec.cost, rec.paymenttype, rec.vendor)

        cy.fixture('Templatefields').then((fields)=>{
          rp.templatefields(fields.vendor,fields.location,fields.items)
        })
        

      })

    })
  })

  
afterEach('logout',()=>{

  lp.logout()
})

})

