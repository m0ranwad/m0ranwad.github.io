/**
 * Form Configuration
 * 
 * Web3Forms is used for form submissions on this static site.
 * The access key is safe to expose in client-side code.
 * 
 * To get your access key:
 * 1. Go to https://web3forms.com/
 * 2. Enter your email and click "Create Access Key"
 * 3. Check your email for the access key
 * 4. Replace the placeholder below
 */

export const formConfig = {
  // Replace with your actual Web3Forms access key
  // Get one free at: https://web3forms.com/
  web3formsAccessKey: 'c9daba7a-ded8-467c-98cb-3d52f8d65545',
  
  // Redirect URL after successful submission
  thankYouPage: '/thank-you/',
  
  // Form settings
  settings: {
    // Email subject prefix
    subjectPrefix: 'Thymeless Treats Inquiry',
    
    // From name in email
    fromName: 'Thymeless Treats Website',
    
    // Enable honeypot spam protection
    honeypot: true,
    
    // Enable hCaptcha (recommended for spam protection)
    // Set to false if you want to use your own captcha
    hcaptcha: false,
  }
};

/**
 * Check if Web3Forms is configured
 */
export function isFormConfigured(): boolean {
  return formConfig.web3formsAccessKey !== 'YOUR_ACCESS_KEY_HERE' 
    && formConfig.web3formsAccessKey.length > 0;
}
