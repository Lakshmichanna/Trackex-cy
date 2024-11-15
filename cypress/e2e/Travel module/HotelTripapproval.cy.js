
import Loginpage from '../Pages/Loginpage'
import Hotelpage from '../Pages/Hotelpage'
import { beforeEach } from 'mocha'
import Approvalspage from '../Pages/Approvalspage'

describe('Hotel Booking', () => {

  const lp = new Loginpage()
  const hp = new Hotelpage()
  const ap = new Approvalspage()

  beforeEach('Hotel', () => {
    cy.fixture('Tripapproval').then((logindata) => {
      lp.userlogin(logindata.empmail, logindata.password)

    })

  })

  it('Hotel Reservation', () => {
    cy.fixture('Hotel').then((hoteldata) => {
      // Room value must be 1 or 2

      hp.hotelapproval(hoteldata.place, hoteldata.checkindate, hoteldata.checkoutdate, hoteldata.room)
      lp.logout()

  })
  })

  afterEach('logout',()=>{
    cy.fixture('Tripapproval').then((logindata) => {

        lp.launch()
        lp.login(logindata.mngmail, logindata.password)
        lp.popupoverride()
        ap.approvetrips(logindata.tripstatus)
       
        lp.logout()
    
      })
   
  })

})

