class Expensepage {
  

    requestwidget = '#REQUESTS'
    myreceipt = 'My Receipts'
    myexpense = 'My Expenses'
    approvemenu ='Approve Expenses'
    btnmanuallyadd = '.mr-2'
    //' Manually Add '
    btnaddexpense = '.btn.btn-brand.btn-md.kt-font-bold'
    tripname ='#labelForTripName > .ng-select-container > .ng-value-container > .ng-input > input'
    tripnameselection = ' No Trip Involved '
    manualybtn = '.btn.btn-outline-brand.btn-elevate.btn-pill.btn-sm.mr-2.font-weight-medium'
    typeofexpense = "//ng-select[@id='labelForExpenseType']//input[@role='combobox']"
    desc = '#labelForDescription'
    expensedate = '#kt_datepicker_ed1'
    selectdate = '.ngb-dp-today > .btn-light'
    selectcountry = "#labelForCOuntrCurecy"
    cost = '#labelForCost'
    payment = '#labelForPaumentMode'
    vendor = '#kt_typeahead_vendor'
    submit = '#addExpense_notify_btn'
    location = '#kt_typeahead_vl'
    loc ="//input[@id='kt_typeahead_location']"
    items = '#kt_typeahead_nofpersons'
    persons = '#kt_typeahead_nofpersons'
    addreceiptbtn = '#addExpense_notify_btn'
    file = '#multiFiles'
    reclist =' Receipts List '
    listrecp = '.toggleListData'
    loadexp = '#expenseList_notify_btn'
    cancelrecpbtn ="div[class='claimExpenseList'] div[class='btn btn-md kt-font-bold btn-outline-danger mx-1']"
    savebtn = '.btn-success'
    closealert ='.alert > .close'
    draftexpclick = '.active > .kt-portlet > .kt-portlet__body > :nth-child(1)'
    expsubmitbtn = '.col-12.mb-3 > .btn-brand'
    mandatorymissing = "div[class='col-4'] div"
    getexpenseid = '.row.m-0.align-items-center.py-2.toggle-bg .col-claimID .kt-label-font-color-3.font-weight-bold'
   toastmsg = '[data-notify="message"]'




    recepitlist(){

        cy.contains(this.reclist).click()
        //Loading the first 2 receipts from receipt list
        cy.get('body').then($toggleList => {
            if ($toggleList.find('.toggleListData .row.align-content-center').length>1) {
              cy.log("receipt count :" +$toggleList.length)
                // If present, click on the checkboxes of the first two records
                cy.get('.toggleListData .row.align-content-center') // Select rows within toggleListData
                    .eq(0) // First record
                    .find('input[type="checkbox"]') // Find the checkbox
                    .check()// Check the checkbox
                // Second record
                cy.get('.toggleListData .row.align-content-center').eq(1).find('input[type="checkbox"]').check()  
                cy.get(this.loadexp).click()
            } else {
                cy.log('ReceiptListData not present')
                cy.get(this.cancelrecpbtn).click()
      
            }
        })
        // Drafting the expense
        cy.get(this.savebtn).click()
        cy.get(this.closealert).click()
       // wait until the expense page is loaded 
        cy.get('.kt-portlet--tabs > :nth-child(1)', { timeout: 5000 }).should('be.visible')
        //Open the drafted expense and submit the expense
        cy.get(this.draftexpclick).click()
        cy.wait(1000)
        cy.get(this.expsubmitbtn).click()
        cy.wait(1000)
        cy.get('body').then($msg => {
          //cy.get('[data-notify="message"]',{ timeout: 4000 }).then($msg =>{
             if($msg.find('[data-notify="message"]',{ timeout: 4000 }).length>0){
               cy.wait(1000)
               cy.storevalue(this.getexpenseid,'Expense-ID' )
             //cy.wrap(true).as(expsavestatus)
              
             }
             else{
               cy.log('Something went wrong in storing the expense id')
              
             }
           })
          
        // Checking expense is submitted or not
        cy.elementexists(this.toastmsg,this.mandatorymissing,'Expense Submitted Successfully','Some mandatory fields are missing in receipts')
        
    }
  
    addexpense(){
  
      cy.get(this.requestwidget).click().wait(500).get('div.kt-menu__submenu').contains(this.myexpense).click()
      cy.wait(1000)
      cy.get(this.btnaddexpense).click()
      cy.get(this.tripname).click()
      cy.wait(500)
      cy.contains(this.tripnameselection).click()
     // cy.contains(this.btnmanuallyadd).click({ force: true })
      
  
    }
  

    basicreceipt(expensetype, description, country, cost, paymenttype) {
        
        cy.get(this.btnmanuallyadd).should('be.visible').click({ force: true })
       // cy.intercept('GET', '/trackexb2e-api/claims/expenses/corporate/1478').as('getData');
        cy.xpath(this.typeofexpense).click({ force: true }).type(expensetype).type("{enter}")
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
      cy.log(exptype)
      switch (type) {
        // General & vendor template receipts
        case 'car': // Enter the vendor and default selecting Fromdate & Todate field with expense date
        case 'flight':
        case 'outing':
        case 'breakfast':
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
        case 'visa fee':
        case 'dinner':
        case 'entertainment':

          // Enter the Vendor, location & No.of persons field 
          cy.get(this.vendor).type(vendor)
          cy.wait(1000)
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
  }


}export default Expensepage