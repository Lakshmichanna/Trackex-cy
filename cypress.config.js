const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
  },

  e2e: {
    defaultCommandTimeout: 10000,  // Sets default command timeout to 10 seconds
    pageLoadTimeout: 60000,        // Sets default page load timeout to 60 seconds
  },

//Cypress has an automatic feature to capture screenshots on test failures when you run tests in cypress run mode. 
  e2e: {
    // Enable automatic screenshots on test failure

    screenshotOnRunFailure: true,
    //to store screenshots in a folder outside the cypress folder:
    screenshotsFolder: '/Users/thinuser/Automation/TrackexV4-cy/cypress/Shots',

    video: true,  // Optionally enable video recording as well
  },
})
module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});