import Loginpage from './Pages/Loginpage';
import Flightpage from './Pages/Flightpage'
import Approvalspage from './Pages/Approvalspage'


describe('Trip Approval', () => {

  const lp = new Loginpage()
  const fp = new Flightpage()
  const ap = new Approvalspage()

  it('managerapproval',()=>{

    cy.fixture('Tripapproval').then((approval) => {

        lp.launch()
        lp.login(approval.mngmail, approval.password)
        lp.popupoverride()
        ap.approvetrips(approval.tripstatus)
        
      })

     


  })

})