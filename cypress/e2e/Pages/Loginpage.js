class Loginpage{
    
    username = '#loginEmailTrackExB2E';
    nextbutton = '.col-md-12 > .btn';
    password = '#LoginPasswordTrackExB2E';
    loginbutton  ='.btn.btn-brand.btn-elevate.btn-block';
    override = '#swal2-title'
    popupOk = '.swal2-confirm'
    profilename = '.kt-header__topbar-username'
    logoutmenu = '.btn.btn-label-brand.btn-sm.btn-bold'
    
    // Prevents Cypress from failing on non-2xx status codes
    
    launch(){
        cy.viewport(1280, 720)
        //https://app.trackex.com/login
        //https://qacorporate.trackex.com:8082/trackexb2e-v4/login
        cy.visit('https://qacorporate.trackex.com:8082/trackexb2e-v4/login', { failOnStatusCode: false })
        cy.title().should('contains','Track')
        cy.log('Successfully launched the Application')
    
    }
    
    login(email,password){

      console.log('Email:', email);   // Debugging logs
      console.log('Password:', password); 
        cy.get(this.username).clear().type(email)
        cy.get(this.nextbutton).click()

        cy.get(this.password).clear().type(password)
        cy.get(this.loginbutton).click()
        cy.wait(2000)
    }
    popupoverride(){
    cy.get('body').then(($body) => {
        if ($body.find(this.override).length > 0) {
          cy.get(this.override).should('have.text', 'User Already Logged In');
          cy.log('Override pop up displayed!');
          cy.get(this.popupOk).click();
        } else {
          cy.log('No popup found, proceeding without override.');
        }
      });
    }

    logout(){
      cy.wait(2000)
      cy.get(this.profilename).click()
      cy.wait(1000)
      cy.get(this.logoutmenu).should('be.visible').click()

    }
    }
    export default Loginpage;
