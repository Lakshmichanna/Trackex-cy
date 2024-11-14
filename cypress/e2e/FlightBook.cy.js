import Loginpage from './Pages/Loginpage';
import Flightpage from './Pages/Flightpage'


describe('Flight 003 or 004 Bookings', () => {

  const lp = new Loginpage();
  const fp = new Flightpage();


  beforeEach('passes', () => {
    // Getting the fixture file data into function 
    cy.fixture('Flightone').then((fl) => {

      lp.launch()
      lp.login(fl.email, fl.password)
      lp.popupoverride()

    })
  })

  it.skip('Oneway',() =>{

    cy.fixture('Flightone').then((fl)=>{

    fp.flightsearch(fl.originairport,fl.destinationairport,fl.journeydate,'1') 
    fp.resultpage(fl.service)
    fp.bookpages('1','octo name','user test','01/01/1990')

  })
})

  it('RoundTrip',() =>{

    cy.fixture('RoundTrip').then((rd)=>{

    fp.roundtripsearch(rd.originairport,rd.destinationairport,rd.journeydate,rd.journeydate1,'1') 
    fp.resultpage(rd.service)
    fp.bookpages('1','octo name','user test','01/01/1990')

  })

})

afterEach('logout',()=>{

  lp.logout()
})
 
})