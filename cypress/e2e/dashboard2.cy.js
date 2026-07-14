describe('QA Dashboard', () => {

 beforeEach(() => {

  cy.visit('http://127.0.0.1:5500/frontend/index.html')


  cy.window().then((win) => {

    cy.stub(win, 'alert')
      .as('alert')

    cy.stub(win, 'confirm')
      .returns(true)

  })

})


  it('should load the dashboard page', () => {

    cy.contains('QA Dashboard')
      .should('be.visible')

  })


  it('should display bug table', () => {

    cy.get('[data-cy="bug-table"]')
      .should('be.visible')

  })


  it('should open create bug modal', () => {

    cy.get('[data-cy="create-bug-button"]')
      .click()

    cy.get('[data-cy="bug-title-input"]')
      .should('be.visible')

  })


  it('should create a new bug', () => {


  cy.get('[data-cy="create-bug-button"]')
    .click()


  cy.get('[data-cy="bug-title-input"]')
    .type('API login failure')


  cy.get('#priority')
    .select('LOW')


  cy.get('[data-cy="save-bug-button"]')
    .click()


  cy.get('[data-cy="bug-table"]')
    .should('contain', 'API login failure')
    .and('contain', 'LOW')

})


  it('should not create bug without title', () => {

    cy.request('GET', 'http://localhost:3000/api/bugs')
      .then((beforeResponse) => {

        const bugCountBefore = beforeResponse.body.length

        cy.get('[data-cy="create-bug-button"]')
          .click()


        cy.get('[data-cy="save-bug-button"]')
          .click()


        cy.get('@alert')
          .should('have.been.calledWith', 'Bug title is required')


        cy.request('GET', 'http://localhost:3000/api/bugs')
          .then((afterResponse) => {

            expect(afterResponse.body.length)
              .to.equal(bugCountBefore)

          })

      })

  })


 it('should create bug with selected priority', () => {


  cy.get('[data-cy="create-bug-button"]')
    .click()


  cy.get('[data-cy="bug-title-input"]')
    .type('Payment error')


  cy.get('#priority')
    .select('HIGH')


  cy.get('[data-cy="save-bug-button"]')
    .click()


  cy.get('[data-cy="bug-table"]')
    .should('contain', 'Payment error')
    .and('contain', 'HIGH')

})


  it('should get bugs from API', () => {

    cy.request('GET', 'http://localhost:3000/api/bugs')
      .then((response) => {

        expect(response.status)
          .to.eq(200)

        expect(response.body)
          .to.be.an('array')

      })

  })


  it('should return bugs with required fields', () => {

    cy.request('GET', 'http://localhost:3000/api/bugs')
      .then((response) => {

        expect(response.status)
          .to.eq(200)


        response.body.forEach((bug) => {

          expect(bug)
            .to.have.property('id')

          expect(bug)
            .to.have.property('title')

          expect(bug)
            .to.have.property('priority')

          expect(bug)
            .to.have.property('status')

        })

      })

  })


  it('should not have duplicate bug IDs', () => {

    cy.request('GET', 'http://localhost:3000/api/bugs')
      .then((response) => {

        const ids = response.body.map(bug => bug.id)

        const uniqueIds = [...new Set(ids)]


        expect(ids.length)
          .to.equal(uniqueIds.length)

      })

  })


  it('should not allow duplicate bug title', () => {

    cy.request('GET', 'http://localhost:3000/api/bugs')
      .then((response) => {

        const existingTitle = response.body[0].title


        cy.request({
          method: 'POST',
          url: 'http://localhost:3000/api/bugs',
          failOnStatusCode: false,
          body: {
            title: existingTitle,
            priority: "HIGH"
          }
        })
        .then((postResponse) => {

          expect(postResponse.status)
            .to.eq(400)

        })

      })

  })


  it('should update bug status', () => {

    cy.request('GET', 'http://localhost:3000/api/bugs')
      .then((response) => {

        const bugId = response.body[0].id


        cy.request({
          method: 'PUT',
          url: `http://localhost:3000/api/bugs/${bugId}`,
          body: {
            status: 'CLOSED'
          }
        })
        .then((putResponse) => {

          expect(putResponse.status)
            .to.eq(200)


          expect(putResponse.body.status)
            .to.eq('CLOSED')

        })

      })

  })


  it('should delete a bug', () => {

    cy.request('GET', 'http://localhost:3000/api/bugs')
      .then((response) => {

        const bugId = response.body[0].id


        cy.request({
          method: 'DELETE',
          url: `http://localhost:3000/api/bugs/${bugId}`
        })
        .then((deleteResponse) => {

          expect(deleteResponse.status)
            .to.eq(200)


          cy.request('GET', 'http://localhost:3000/api/bugs')
            .then((getResponse) => {

              const deletedBug = getResponse.body.find(
                bug => bug.id === bugId
              )


              expect(deletedBug)
                .to.be.undefined

            })

        })

      })

  })


  it('should change bug status from UI', () => {


    cy.get('[data-cy="bug-status"]')
      .first()
      .click()


    cy.get('[data-cy="status-closed"]')
      .click()


    cy.get('[data-cy="bug-table"]')
      .should('contain', 'CLOSED')

  })


})