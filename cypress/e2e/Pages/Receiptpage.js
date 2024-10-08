class Receiptpage {

requestwidget = '#REQUESTS'
myreceipt ='My Receipts'
btnmanuallyadd = ' Manually Add '
expensetype = "input[role='combobox']"
desc = '#labelForDescription'
expensedate = '#kt_datepicker_1'
selectdate = '.ngb-dp-today > .btn-light'
selectcountry = '#labelForCountryCurrency > .ng-select-container > .ng-value-container > .ng-input > input'
cost = '#labelForCost'
payment = '#labelForPaymentMode'
vendor = '#kt_typeahead_vendor'
submit = '#addExpense_notify_btn'
addreceiptbtn = '#addExpense_notify_btn'


addreceipt(){
   // cy.wait(5000)
    cy.get(this.requestwidget).should('be.visible')
    cy.get(this.requestwidget).click({force:true})
    // My request - Force click of hidden element 
    cy.contains(this.myreceipt).click({force:true})
    cy.contains(this.btnmanuallyadd).click()

}
basicreceipt(expensetype,description,country,cost,paymenttype,vendor ){
cy.get(this.expensetype).type(expensetype).type("{enter}")
 
  cy.get(this.desc).type(description)
  //click date picker
  cy.get(this.expensedate).click({force:true})
  
  //select the date
  cy.get(this.selectdate).click()
  // Click the country & select the country 
  
  cy.get(this.selectcountry).type(country).type("{enter}")
  // Enter the cost 
  cy.get(this.cost).type(cost)
  cy.get(this.payment).type(paymenttype).type("{enter}")
  cy.get(this.vendor).type(vendor)
  cy.get(this.addreceiptbtn).click()
  
}

}
export default Receiptpage;
