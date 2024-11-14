import Loginpage from './Pages/Loginpage'
import Flightpage from './Pages/Flightpage'
describe('Flight 003 or 004 Bookings', () => {

    const lp = new Loginpage();
    const fp = new Flightpage();
  
  
 it ('passes', () => {
      // Getting the fixture file data into function 
      cy.fixture('Flightone').then((fl) => {
        lp.launch()
        lp.login(fl.email, fl.password)
        lp.popupoverride()
        
  
       fp.flightsearch(fl.originairport,fl.destinationairport,fl.journeydate,'1') 
        fp.resultpage(fl.service)
        fp.bookpages('1','octo name','user test','01/01/1990')
    
      })
    })
})