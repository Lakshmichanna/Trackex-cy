

import Loginpage from './Pages/Loginpage';
import Receiptpage from './Pages/Receiptpage';
import Flightpage from './Pages/Flightpage'

describe('login', () => {

  const lp = new Loginpage();
  const rp = new Receiptpage();
  const fp = new Flightpage();

  beforeEach('passes', () => {
    // Getting the fixture file data into function 
    cy.fixture('Login').then((logindata) => {

      lp.launch()
      lp.login(logindata.email, logindata.password)
      lp.popupoverride()

    })
  })

  it('receipt', () => {

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

  /*it.skip('Oneway',() =>{

    cy.fixture('Flightone').then((fl)=>{

    fp.flightsearch(fl.originairport,fl.destinationairport,fl.journeydate,'1') 
    fp.resultpage()
    fp.bookpages('1','octo name','user test','01/01/1990')

  })
})*/


afterEach('logout',()=>{

  lp.logout()
})

})

