import Loginpage from '../Pages/Loginpage'
import Flightpage from '../Pages/Flightpage'
import Approvalspage from '../Pages/Approvalspage'


describe('Trip Approval', () => {

  const lp = new Loginpage()
  const fp = new Flightpage()
  const ap = new Approvalspage()


  beforeEach('Login', () => {
    // Getting the fixture file data into function 
    cy.fixture('Tripapproval').then((logindata) => {

      lp.launch()
      lp.login(logindata.empmail, logindata.password)
      lp.popupoverride()

    })
  })

  it('Employee Send Trip for Approval',() =>{

    cy.fixture('Flightone').then((fl)=>{

    fp.sendapproval(fl.originairport,fl.destinationairport,fl.journeydate,'1')

    lp.logout()

  })
})

afterEach('Manager Approval',()=>{
  cy.fixture('Tripapproval').then((logindata) => {

    lp.launch()
    lp.login(logindata.mngmail, logindata.password)
    lp.popupoverride()
    ap.approvetrips(logindata.tripstatus)
   
    lp.logout()

  })
   
  })


})
