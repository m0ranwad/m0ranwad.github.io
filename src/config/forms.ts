/**
 * Order form configuration (Web3Forms, https://web3forms.com/).
 *
 * The access key is public by design: Web3Forms keys only allow sending to
 * the inbox they were created for. The form's subject line and sender name
 * are set in src/pages/order.astro.
 */

export const formConfig = {
  // Preview builds (astro.config.mjs) use a test inbox instead
  web3formsAccessKey: __PREVIEW_FORM_KEY__ ?? 'c9daba7a-ded8-467c-98cb-3d52f8d65545',

  // Where Web3Forms sends the customer after a successful submission
  thankYouPage: '/thank-you/',
};
