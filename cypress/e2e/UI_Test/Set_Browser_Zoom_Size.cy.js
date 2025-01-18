//The cy.window() command gets the window object, 
// and then we set the zoom property on the document body to 110%


describe('Set Browser Zoom Level', () => {
    it('should set the browser zoom level to 110%', () => {
      // Visit a page
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  
      // Set the browser zoom level to 150%
      cy.window().then((win) => {
        win.document.body.style.zoom = '110%';
      });
  
      // Verify the zoom level
      cy.window().should((win) => {
        expect(win.document.body.style.zoom).to.equal('110%');
      });
    });
  });
  