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
});
