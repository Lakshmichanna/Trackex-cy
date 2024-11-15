import Loginpage from '../Pages/Loginpage'
import Receiptpage from '../Pages/Receiptpage'
import Expensepage from '../Pages/Expensepage'
import Approvalspage from '../Pages/Approvalspage'



describe('Expense Submit', () => {

  const lp = new Loginpage()
  const rp = new Receiptpage()
  const ep = new Expensepage()
  const ap = new Approvalspage()




  
  it('Expense Submit with receipt list & manually add',()=>{

    cy.fixture('Login').then((approval) => {

        lp.launch()
        lp.login(approval.email, approval.password)
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
