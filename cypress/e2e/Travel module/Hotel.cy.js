
import Loginpage from '../Pages/Loginpage'
import Hotelpage from '../Pages/Hotelpage'
import { beforeEach } from 'mocha'

describe('Hotel Booking', () => {

  const lp = new Loginpage()
  const hp = new Hotelpage()

  beforeEach('Hotel', () => {
    cy.fixture('Login').then((logindata) => {

      lp.userlogin(logindata.email, logindata.password)

    })

  })

  it('Hotel Reservation', () => {
    cy.fixture('Hotel').then((hoteldata) => {
      // Room value must be 1 or 2
     
      hp.hotelsearch(hoteldata.place, hoteldata.checkindate, hoteldata.checkoutdate, hoteldata.room)
      hp.hotelselect()
      hp.hotelbook(hoteldata.room)

    
  })
  })

  afterEach('logout',()=>{

    lp.logout()
  })

})

