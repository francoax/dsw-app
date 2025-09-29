function login(){ 
  cy.intercept('http://localhost:4000/api/users/login').as('postLogin')

  cy.visit('http://localhost:4200/home')

  cy.get('.navbar-end > :nth-child(2)').click()

  cy.get('[ng-reflect-label="Email"] > .form-control > .input').type('testingautomation@gmail.com')
  cy.get('[ng-reflect-label="Contraseña"] > .form-control > .input').type('testingisw')

  cy.get('.block > .transition-transform').click()

  cy.wait('@postLogin')
}

describe('Usuario con cuenta', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
  });

  it('Should not reserve a property when it has reserved dates', () => {
    login();

    cy.get(':nth-child(1) > .card > .card-body > .card-actions > app-button > .transition-transform').scrollIntoView();
    cy.wait(1000)
    cy.get(':nth-child(1) > .card > .card-body > .card-actions > app-button > .transition-transform').click();

    cy.get('.mat-mdc-button-touch-target').click();

    cy.get('.mat-calendar-next-button').click();
    cy.get(':nth-child(3) > [data-mat-col="0"] > .mat-calendar-body-cell > .mat-calendar-body-cell-content').click();
    cy.get(':nth-child(3) > [data-mat-col="6"] > .mat-calendar-body-cell > .mat-calendar-body-cell-content').click();
    cy.get('.btn-submit > .transition-transform').scrollIntoView();
    cy.get('.btn-submit > .transition-transform').click();

    cy.get('.buttons > [ng-reflect-class-type="primary"] > .transition-transform').click();
  });

  // it('Should not be able to reserve a property when an active reservation already exists', () => {
  //   cy.visit('http://localhost:4200/home')
  // })

  // it('Should be able to reserve a property on selected dates with no overlaping', () => {
  //   cy.visit('http://localhost:4200/home')
  // });

  // it ('Should be able to reserve a package with its properly discount applied', () => {
  //   cy.visit('http://localhost:4200/home')
  // });

  // it('Should not be able to cancel an active reservation', () => {
  //   cy.visit('http://localhost:4200/home')
  // });

  // it('Should be able to cancel a reservation before its become active', () => {
  //   cy.visit('http://localhost:4200/home')
  // });
});

describe('Usuario sin cuenta', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
  })
})