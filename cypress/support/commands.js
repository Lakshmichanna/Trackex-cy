// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Function for element present & then doing action



/*Cypress.Commands.add('shot',()=>{ 
    cy.screenshot('Search is failed', {
        capture: 'viewport',    // Options: 'viewport', 'fullPage', 'runner'
        clip: { x: 0, y: 0, width: 1000, height: 600 },
        blackout: ['.sensitive-info']  // Black out parts of the screen
    });


})*/

Cypress.Commands.add('elementIsPresent', (selector) => {
    return cy.get('body').then(($body) => {
      // Check if the element exists
      return $body.find(selector).length > 0;
    });
  });

  Cypress.Commands.add('elementexists',(locator,locator2,msg) =>{
    cy.get('body').then(($body) => {
      if ($body.find(locator).length > 0) {
        
        cy.get(locator).click()
      } else {
        cy.get(locator2).click()
        cy.log(msg);
      }
    });
  })

  Cypress.Commands.add('singleelement',(locator,msg1,msg2) =>{
    cy.get('body').then(($body) => {
      if ($body.find(locator).length > 0) {
      
        cy.log(msg1).click()
       
      } else {
        cy.log(msg2);
        
      }
    });
  })

  // getting the text from the element
  Cypress.Commands.add('gettext', (locator) =>{
   cy.get(locator).then(function (ele) {
    cy.log( + ele.text())
    return ele.text()
})
  })
// Attach file command with parameters
/* fileName: The name of the file to upload.
*  fileType: The MIME type of the file to upload.
* selector: The selector for the file input element on the page. */

  import 'cypress-file-upload';
Cypress.Commands.add('upload_file', (fileName, fileType = ' ', selector) => {
cy.get(selector).then(subject => {
cy.fixture(fileName, 'base64').then(content => {
const el = subject[0];
const testFile = new File([content], fileName, { type: fileType });
const dataTransfer = new DataTransfer();
dataTransfer.items.add(testFile);
el.files = dataTransfer.files;
});
});
});