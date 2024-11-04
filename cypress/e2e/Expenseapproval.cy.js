import Loginpage from './Pages/Loginpage'
import Receiptpage from './Pages/Receiptpage'
import Expensepage from './Pages/Expensepage'
import Approvalspage from './Pages/Approvalspage'



describe('Expense Submit', () => {

    const lp = new Loginpage()
    const rp = new Receiptpage()
    const ep = new Expensepage()
    const ap = new Approvalspage()
    var isExpenseSubmitted;


    beforeEach('Employee login', () => {
        // Getting the fixture file data into function 
        cy.fixture('Tripapproval').then((logindata) => {

            lp.launch()
            lp.login(logindata.empmail, logindata.password)
            lp.popupoverride()

        })
    })


    it('Expense Submit with receipt list & manuall add', () => {
      
        ep.addexpense()
        cy.fixture('Expense').then((rec) => {

            ep.basicreceipt(rec.expensetype, rec.description, rec.country, rec.cost, rec.paymenttype, rec.vendor)
            cy.fixture('Templatefields').then((fields) => {
                ep.templatefields(fields.vendor, fields.location, fields.items)
            })
            ep.recepitlist()
            cy.elementIsPresent(ep.toastmsg).then((isPresent) => {
                if (isPresent) {
                  cy.log('Manager appoval is required')
                  isExpenseSubmitted = true
                } else {
                  cy.log('Skipped manager approval')
                  
                 }
                })
        })
        lp.logout()

    })


    afterEach('Manager Approval', () => {
        if (isExpenseSubmitted===true) {
            cy.fixture('Tripapproval').then((logindata) => {

                lp.launch()
                lp.login(logindata.mngmail, logindata.password)
                lp.popupoverride()
                ap.approveexpense('Approve')

                lp.logout()

           
                 })
                }
                else{
                    cy.log('Skipping Manager approval as expense is not submitted ')
                }
        })



})