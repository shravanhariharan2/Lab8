const url = 'http://127.0.0.1:5500/'
describe('Party Horn Tests', () => {
  beforeEach(() => {
    cy.visit(url);
  });

  it('First Test', () => {
    expect(true).to.equal(true);
  });

  it('Slider changes when volume input changes', () => {
    cy.get('#volume-number').clear().type('75');
    cy.get('#volume-slider')
      .then(($el) => expect($el).to.have.value(75))
  });

  it('Volume input changes when slider changes', () => {
    cy.get('#volume-slider')
      .invoke('val', 33)
      .trigger('input');
    cy.get('#volume-number')
      .then(($el) => expect($el).to.have.value(33))
  });

  it('Audio volume changes when slider changes', () => {
    cy.get('#volume-slider')
      .invoke('val', 33)
      .trigger('input');
    cy.get('#horn-sound')
      .then(($el) => expect($el).to.have.prop('volume', 0.33))
  });

  it('Image and sound sources change when selecting party horn radio button', () => {
    cy.get('#radio-party-horn').check();
    cy.get('#horn-sound')
      .then(($el) => expect($el).to.have.prop('src', url + 'assets/media/audio/party-horn.mp3'))
    cy.get('#sound-image')
      .then(($el) => expect($el).to.have.prop('src', url + 'assets/media/images/party-horn.svg'))
  });

  it('Volume image changes when increasing volumes', () => {
    cy.get('#volume-slider').invoke('val', 0).trigger('input');
    cy.get('#volume-image').then(($el) => expect($el).to.have.prop('src', url + 'assets/media/icons/volume-level-0.svg'))
    cy.get('#volume-slider').invoke('val', 25).trigger('input');
    cy.get('#volume-image').then(($el) => expect($el).to.have.prop('src', url + 'assets/media/icons/volume-level-1.svg'))
    cy.get('#volume-slider').invoke('val', 50).trigger('input');
    cy.get('#volume-image').then(($el) => expect($el).to.have.prop('src', url + 'assets/media/icons/volume-level-2.svg'))
    cy.get('#volume-slider').invoke('val', 75).trigger('input');
    cy.get('#volume-image').then(($el) => expect($el).to.have.prop('src', url + 'assets/media/icons/volume-level-3.svg'))
  });

  it('Honk button is disabled when the textbox input is empty or a non-number', () => {
    cy.get('#volume-number').clear().type('abcde');
    cy.get('#honk-btn').should('be.disabled');
    cy.get('#volume-number').clear();
    cy.get('#honk-btn').should('be.disabled');
  });

  it('An error is shown when typing a number outside the given range for the volume textbox input', () => {
    cy.get('#volume-number').clear().type('1337');
    cy.get('input:invalid').then(($el) => expect($el[0].name).to.equal('volume-number'));
  });
});
