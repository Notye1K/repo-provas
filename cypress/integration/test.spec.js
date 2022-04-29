/// <reference types="cypress" />

import { faker } from '@faker-js/faker'

const body = {
    password: faker.internet.password(),
    email: faker.internet.email(),
}

beforeEach(() => {
    cy.visit('http://localhost:3000')
})

describe('repoProvas app', () => {
    it('full test', () => {
        cy.contains('Não possuo cadastro').click()

        cy.url().should('equal', 'http://localhost:3000/register')

        cy.get('input[name="email"]').type(body.email)
        cy.get('input[name="password"]').type(body.password)
        cy.get('input[name="confirmPassword"]').type(body.password)

        cy.contains('CADASTRAR').click()

        cy.url().should('equal', 'http://localhost:3000/')

        // LOGIN

        cy.get('input[name="email"]').type(body.email)
        cy.get('input[name="password"]').type(body.password)

        cy.contains('ENTRAR').click()

        cy.url().should('equal', 'http://localhost:3000/tests')

        // TESTS

        cy.contains('PESSOA INSTRUTORA').click()
        cy.contains('DISCIPLINA').click()
        cy.contains('Periodo').click()
        cy.contains('PESSOA INSTRUTORA').click()
        cy.contains('Dina').click()

        //LOGOUT

        cy.get('.logout').click()
        cy.contains('Sim').click()
    })

    it('wrong login', () => {
        cy.get('input[name="email"]').type('email@email.com')
        cy.get('input[name="password"]').type('1234')

        cy.contains('ENTRAR').click()

        cy.contains('email do not exist')

        cy.url().should('equal', 'http://localhost:3000/')
    })

    it('wrong register', () => {
        cy.visit('http://localhost:3000/register')

        cy.get('input[name="email"]').type(body.email)
        cy.get('input[name="password"]').type(body.password)
        cy.get('input[name="confirmPassword"]').type('1234')

        cy.contains('CADASTRAR').click()

        cy.contains('Suas senhas precisam ser iguais')

        cy.url().should('equal', 'http://localhost:3000/register')

        cy.get('input[name="email"]').clear().type('body.email')
        cy.get('input[name="password"]').clear().type(body.password)
        cy.get('input[name="confirmPassword"]').clear().type(body.password)

        cy.contains('CADASTRAR').click()

        cy.contains('"email" must be a valid email')

        cy.url().should('equal', 'http://localhost:3000/register')
    })
})
