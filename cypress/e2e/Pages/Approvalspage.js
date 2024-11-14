

class Approvalspage {

 
  // <------- Trips -------->


  tripsmenu = '#TRIPS'
  search = "//span[contains(@class,'kt-header__topbar-icon bg-transparent')]//*[name()='svg']"
  searchinput = '.input-group > .form-control'
  tripselect = '.tripIndividualView'
  id = '.kt-subheader__title'
  remarks = "textarea[placeholder='Approval Remarks *']"
  approvebtn = '.btn.btn-brand.btn-md.kt-font-bold.btn-sm.ml-1'
  rejectbtn = '.btn.btn-md.kt-font-bold.btn-sm.btn-outline-danger.mx-1'


  // <------- Expense  -------->

  requestwidget = '#REQUESTS'
  approveexp = 'Approve Expenses'
  searchicon = '.kt-header__topbar-wrapper .kt-header__topbar-icon svg'
  inputsearch = "input[placeholder='Search...']"
  noexprecords = '.row.align-items-center.py-2.toggle-bg'
  expremarks = '#labelForApprovalMarks'
  expapprove = '.btn-brand'
  expreject = '.btn-outline-danger'
  expnotificationclose = '.alert > .close'
  settlementremarks ='#idForSettlement'
  settlementapprove= "button[data-ktwizard-type='action-next']"
  settlementreject = "button[class='btn btn-md kt-font-bold btn-outline-danger mx-1']"




  approvetrips(tripstatus) {

    cy.wait(5000)
    cy.get(this.tripsmenu).click().wait(500).get('div.kt-menu__submenu').contains('Approve Trips')
      .should('be.visible')
      .click()
    //Getting the value from one class which is stored in env variable
    const sharedtripid = Cypress.env('Tripapprovalid')
    cy.xpath(this.search).click()
    cy.get(this.searchinput).type(sharedtripid)
    cy.get(this.tripselect).click()
    cy.get(this.remarks).type(tripstatus)
    const status = tripstatus.toLowerCase()
    if (status == 'approve') {
      cy.get(this.approvebtn).click()
    }
    else if (status == 'reject') {
      cy.get(this.rejectbtn).click()
    }
    else {
      cy.log('Invalid trip status')
    }

    cy.wait(5000)

  }
  approveexpense(expensestatus) {
   
      cy.get(this.requestwidget).click().wait(500).get('div.kt-menu__submenu').contains('Approve Expenses').should('be.visible').click()
      cy.get(this.searchicon).eq(0).click()
      //Getting the value from one class which is stored in env variable
      const storeexpid = Cypress.env('Expense-ID')

      cy.get(this.searchinput).type(storeexpid)

      cy.get(this.noexprecords).then($list => {

        if ($list.length == 0) {
          cy.log('Entered the Invalid Expense ID')
        }
        else if ($list.length > 0) {
          cy.get(this.noexprecords).eq(0).click()
        }

      })
      cy.get(this.expremarks).type(expensestatus)
      const status = expensestatus.toLowerCase()
      if (status == 'approve') {
        cy.get(this.expapprove).click()
      }
      else if (status == 'reject') {
        cy.get(this.expreject).click()
      }
      else {
        cy.log('Invalid expense status')
      }
      cy.get(this.expnotificationclose, { timeout: 5000 }).click()
    }


    settlement(settlestatus){
      cy.get(this.requestwidget).click().wait(500).get('div.kt-menu__submenu').contains('Process Expenses').should('be.visible').click()
      cy.xpath(this.search).click()
      const storeexpid = Cypress.env('Expense-ID')
      cy.get(this.searchinput).type(storeexpid)
      cy.get(this.noexprecords).then($list => {

        if ($list.length == 0) {
          cy.log('Entered the Invalid Expense ID')
        }
        else if ($list.length > 0) {
          cy.get(this.noexprecords).eq(0).click()
        }

      })
    
    cy.get(this.settlementremarks).type(settlestatus)
      const status = settlestatus.toLowerCase()
      if (status == 'approve') {
        cy.get(this.settlementapprove).click()
      }
      else if (status == 'reject') {
        cy.get(this.settlementreject).click()
        
      }
      else {
        cy.log('Invalid Expense status')
      }
      cy.textofelement('[data-notify="title"]')
      cy.get(this.expnotificationclose, { timeout: 5000 }).click()
    }
  }

export default Approvalspage;