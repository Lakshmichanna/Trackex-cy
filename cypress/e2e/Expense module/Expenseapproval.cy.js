import Loginpage from '../Pages/Loginpage'
import Receiptpage from '../Pages/Receiptpage'
import Expensepage from '../Pages/Expensepage'
import Approvalspage from '../Pages/Approvalspage'



describe('Expense Submit', () => {

    const lp = new Loginpage()
    const rp = new Receiptpage()
    const ep = new Expensepage()
    const ap = new Approvalspage()
    var isExpenseSubmitted, isexpensesttled ;


    it('Expense Submit with receipt list & manuall add', () => {
        cy.fixture('Expenseapproval').then((logindata) => {
            lp.userlogin(logindata.empmail, logindata.password)
        })
        ep.addexpense()
        cy.fixture('Expense').then((rec) => {

            ep.basicreceipt(rec.expensetype, rec.description, rec.country, rec.cost, rec.paymenttype, rec.vendor)
            cy.fixture('Templatefields').then((fields) => {
                ep.templatefields(fields.vendor, fields.location, fields.items)
            })
            ep.recepitlist()
            //checking the expense is submitted or not
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


    it('Manager Approval', () => {
        if (isExpenseSubmitted === true) {
            cy.fixture('Expenseapproval').then((logindata) => {

                lp.launch()
                lp.login(logindata.mngmail, logindata.password)
                lp.popupoverride()
                ap.approveexpense(logindata.expstatus)
                //checking the expense is submitted or not 
            cy.elementIsPresent(ep.toastmsg).then((isPresent) => {
                if (isPresent && logindata.expstatus.toLowerCase() == 'approve') {
                    cy.log('Accountant settlement is required')
                    isexpensesttled = true
                } else {
                    cy.log('Skipped Accountant settlement')

                }
            })

                lp.logout()

            })
        }
        else {
            cy.log('Skipping Manager approval as expense is not submitted ')
        }
    })

    it('Accountant Approval', () => {
        if (isexpensesttled === true) {
            cy.fixture('Expenseapproval').then((logindata) => {

                lp.launch()
                lp.login(logindata.accmail, logindata.password)
                lp.popupoverride()
                ap.settlement(logindata.settlestatus)
            
                lp.logout()
            
        })
    }else{
        cy.log(' Skipping Accountant settlement as expenses is rejected by manager')
    }

})
})