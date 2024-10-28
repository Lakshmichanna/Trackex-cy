class  Approvalspage{


tripsmenu = '#TRIPS'
search = "//span[contains(@class,'kt-header__topbar-icon bg-transparent')]//*[name()='svg']"
searchinput = '.input-group > .form-control'
tripselect ='.tripIndividualView'
id ='.kt-subheader__title'
remarks = "textarea[placeholder='Approval Remarks *']"
approvebtn = '.btn.btn-brand.btn-md.kt-font-bold.btn-sm.ml-1'
rejectbtn ='.btn.btn-md.kt-font-bold.btn-sm.btn-outline-danger.mx-1'


approvetrips(tripstatus){

    cy.wait(5000)
    cy.get(this.tripsmenu).click().wait(500).get('div.kt-menu__submenu').contains('Approve Trips')
    .should('be.visible')
    .click()
    const sharedtripid = Cypress.env('Tripapprovalid');
    cy.xpath(this.search).click()
    cy.get(this.searchinput).type(sharedtripid)
    cy.get(this.tripselect).click()
    cy.get(this.remarks).type(tripstatus)
    const status = tripstatus 
    if(status=='Approve'){
        cy.get(this.approvebtn).click()
    }
   else if(status=='Reject'){
        cy.get(this.rejectbtn).click()
   }    
  else{
    cy.log('Invalid trip status')
  }

  cy.wait(5000)

}

} 
export default Approvalspage;