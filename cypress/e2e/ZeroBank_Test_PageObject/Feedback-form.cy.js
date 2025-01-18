import { HomePage } from '../../page-objects/HomePage'
import { FeedbackPage } from  '../../page-objects/FeedbackPage'

describe('Feedback Form', () => {
  let homePage
  let feedbackPage

  beforeEach(() => {
    homePage = new HomePage()
    feedbackPage = new FeedbackPage()

    homePage.visit()
    homePage.clickOnFeedbackLink()
  })

  // Reset feedback form
  it('Reset feedback form', () => {
    feedbackPage.fillForm(
      'Abhi',
      'email@mail.com',
      'Welcome to Zero Bank',
      'Transfer Amount'
    )
    feedbackPage.resetForm()
    feedbackPage.assertReset()
  })

  // Submit feedback form
  it('Submit feedback form', () => {
    feedbackPage.fillForm(
      'name',
      'email@mail.com',
      'subject',
      'my awesome message'
    )
    feedbackPage.submitForm()
    feedbackPage.feedbackFormSent()
  })
})
