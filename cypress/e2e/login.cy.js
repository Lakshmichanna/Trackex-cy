
import Loginpage from './Pages/Loginpage';
import Receiptpage from './Pages/Receiptpage';

describe('login', () => {

  const lp = new Loginpage();
  const rp = new Receiptpage();
  
  beforeEach('passes', () => {
    // Getting the fixture file data into function 
    cy.fixture('Login').then((logindata)=>{ 

    lp.launch()
    lp.login(logindata.email, logindata.password)
    lp.popupoverride()
  
    })
  })

it('receipt',()=>{
 
// Clicking add receipt 

// Getting the fixture file into function 
cy.fixture('Receipt').then((rpt)=> {
// below is used for multiple records in array
rpt.forEach(rec =>{
  rp.addreceipt()
  // Entering the basic details of receipt
  rp.basicreceipt(rec.expensetype,rec.description,rec.country,rec.cost,rec.paymenttype,rec.vendor)
  
                })

                                  })
                })




})

