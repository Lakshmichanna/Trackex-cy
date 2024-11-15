class Receiptpage {

  requestwidget = '#REQUESTS'
  myreceipt = 'My Receipts'
  myexpense = 'My Expenses'
  approvemenu ='Approve Expenses'
  btnmanuallyadd = ' Manually Add '
  btnaddexpense = '.btn.btn-brand.btn-md.kt-font-bold'
  tripname ='#labelForTripName > .ng-select-container > .ng-value-container > .ng-input > input'
  tripnameselection = ' No Trip Involved '
  manualybtn = '.btn.btn-outline-brand.btn-elevate.btn-pill.btn-sm.mr-2.font-weight-medium'
  typeofexpense = "//ng-select[@id='labelForExpenseType']//input[@role='combobox']"
  desc = '#labelForDescription'
  expensedate = '#kt_datepicker_1'
  selectdate = '.ngb-dp-today > .btn-light'
  selectcountry = '#labelForCountryCurrency > .ng-select-container > .ng-value-container > .ng-input > input'
  cost = '#labelForCost'
  payment = '#labelForPaymentMode'
  vendor = '#kt_typeahead_vendor'
  submit = '#addExpense_notify_btn'
  location = '#kt_typeahead_location'
  loc ="//input[@id='kt_typeahead_location']"
  items = '#kt_typeahead_nofpersons'
  persons = '#kt_typeahead_nofpersons'
  addreceiptbtn = '#addExpense_notify_btn'
  file = '#multiFiles'


  



  addreceipt() {
    // cy.wait(5000)
    cy.get(this.requestwidget,{timeout:40000}).should('be.visible')
    cy.get(this.requestwidget).click({ force: true })
    // My request - Force click of hidden element 
    cy.contains(this.myreceipt).click({ force: true })
   

  }

  basicreceipt(expensetype, description, country, cost, paymenttype) {
    cy.contains(this.btnmanuallyadd).click({ force: true })

    cy.xpath(this.typeofexpense).type(expensetype).type("{enter}")

    cy.get(this.desc).type(description)
    //click date picker
    cy.get(this.expensedate).click({ force: true })

    //select the date
    cy.get(this.selectdate).click()
    // Click the country & select the country 

    cy.get(this.selectcountry).type(country).type("{enter}")
    // Enter the cost 
    cy.get(this.cost).type(cost)
    cy.get(this.payment).type(paymenttype).type("{enter}")

    //Cypress aliases (cy.wrap().as()) are useful for passing values between different functions (or it blocks).
    //'First  - Store a value as an alias'
    /*const receipttype = this.expensetype
    cy.wrap(receipttype).as('templatetype')*/
    cy.wrap(expensetype).as('recptype')


  }

  templatefields(vendor, location, items) {
    // Second function - Access value from alias
    cy.get('@recptype').then((exptype) => {
      let type = exptype.toLocaleLowerCase();
      cy.log(type)
      switch (type) {
        // General & vendor template receipts
        case 'car': // Enter the vendor and default selecting Fromdate & Todate field with expense date
        case 'flight':
        case 'outing':
        case 'hotel':
        
        case 'fuel':
        case 'laundry':
        case 'local_transport':
        case 'misc':
        case 'telephone':
        case 'travel_insurance':
          // Enter the vendor field
          cy.get(this.vendor).type(vendor)
          //multiple file upload
          cy.get(this.file).attachFile(['bill.jpeg','bookgen.txt'])
          break;
      // Meals template receipts
        case 'gifts':
        case 'lunch':
        case 'breakfast':
        case 'visa fee':
        case 'dinner':
        case 'entertainment':

          // Enter the Vendor, location & No.of persons field 
          cy.get(this.vendor).type(vendor)
          cy.wait(2000)
          cy.get(this.location).click({ force: true }).type(location)
         
          cy.get(this.persons).click({ force: true }).type('1')
          cy.get(this.file).attachFile(['Meals2.csv','res.jpg','scone.png'])
          break;
       // No.of items template receipts   
        case 'equipment':
          // Enter the No.of items field
          cy.get(this.items).type(items)
          cy.get(this.file).attachFile('ticket.pdf')
          break;
        default:
          cy.log('Template is incorrect')
      }

    })
    cy.wait(1000)
    cy.get(this.file).attachFile('bill.jpeg')
    //cy.upload_file('bill.jpeg','image/jpeg', this.file)
    cy.get(this.addreceiptbtn).click()
    cy.wait(1000)
    cy.get('.alert > .close').click()

  }

}
export default Receiptpage;
