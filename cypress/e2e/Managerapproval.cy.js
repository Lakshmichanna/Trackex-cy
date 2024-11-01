import Loginpage from './Pages/Loginpage'
import Receiptpage from './Pages/Receiptpage';
import Expensepage from './Pages/Expensepage'



describe('Trip Approval', () => {

  const lp = new Loginpage()
  const rp = new Receiptpage();
  const ep = new Expensepage()

  it('managerapproval',()=>{

    cy.fixture('Tripapproval').then((approval) => {

        lp.launch()
        lp.login(approval.mngmail, approval.password)
        lp.popupoverride()
        ep.addexpense()
        cy.fixture('Expense').then((rec) => {
          
        ep.basicreceipt(rec.expensetype,rec.description,rec.country,rec.cost,rec.paymenttype,rec.vendor)
        cy.fixture('Templatefields').then((fields)=>{
          ep.templatefields(fields.vendor,fields.location,fields.items)
        })
        ep.recepitlist()
    })
  
  })

  })

})