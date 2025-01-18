describe('Database Test', () => {
    it('should read data from the database', () => {
      const query = 'SELECT * FROM login'; // replace with your SQL query
  
      cy.queryDatabase(query).then((results) => {
        cy.log(JSON.stringify(results));
  
        // Perform assertions on the results
        expect(results).to.have.length.greaterThan(0);
        //expect(results[0]).to.have.property('your_column_name', 'expected_value'); // replace with your column name and expected value
      });
    });
  });
  