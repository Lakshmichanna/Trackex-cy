import Loginpage from './Pages/Loginpage';
import Flightpage from './Pages/Flightpage'


describe('login', () => {

  const lp = new Loginpage();
  const fp = new Flightpage();


  beforeEach('passes', () => {
    // Getting the fixture file data into function 
    cy.fixture('Login').then((logindata) => {

      lp.launch()
      lp.login(logindata.email, logindata.password)
      lp.popupoverride()

    })
  })

  it('Oneway',() =>{

    cy.fixture('Flightone').then((fl)=>{

    fp.flightsearch(fl.originairport,fl.destinationairport,fl.journeydate,'1') 
    fp.resultpage()
    fp.bookpages('1','octo name','user test','01/01/1990')

  })
})

  it.skip('RoundTripBooking',() =>{

    cy.fixture('RoundTrip').then((rd)=>{

    fp.roundtripsearch(rd.originairport,rd.destinationairport,rd.journeydate,rd.journeydate1,'1') 
    fp.resultpage()
    fp.bookpages('1','octo name','user test','01/01/1990')

  })

})

afterEach('logout',()=>{

  lp.logout()
})
 
})