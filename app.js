const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
  toggle.textContent = open ? 'Close' : 'Menu';
});
navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  toggle.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
  toggle.textContent = 'Menu';
}));
document.querySelector('#year').textContent = new Date().getFullYear();

const form = document.querySelector('#yard-form');
if (form) {
  const draft = document.querySelector('#enquiry-draft');
  form.addEventListener('input', event => {
    if (event.target.setCustomValidity) event.target.setCustomValidity('');
    draft.hidden = true;
    document.querySelector('#copy-status').textContent = '';
  });
  form.addEventListener('change', () => { draft.hidden = true; });
  form.addEventListener('submit', event => {
    event.preventDefault();
    for (const field of form.querySelectorAll('[required]')) {
      field.setCustomValidity(field.value.trim() ? '' : 'Please complete this field.');
      if (!field.reportValidity()) return;
    }
    const values = new FormData(form);
    const message = [
      'Hello Royal Green,', '', 'I would like to discuss care for my yard.', '',
      `Service: ${values.get('service')}`,
      `Neighborhood / city: ${values.get('area').trim()}`,
      `Frequency: ${values.get('frequency')}`, '',
      `About the yard: ${values.get('notes').trim() || 'Please contact me to discuss the details.'}`, '',
      `Name: ${values.get('customer').trim()}`,
      `Email: ${values.get('email').trim()}`,
      `Phone: ${values.get('phone').trim() || 'Not provided'}`, '',
      'Please let me know about availability and next steps.'
    ].join('\n');
    document.querySelector('#draft-message').value = message;
    document.querySelector('#email-draft-link').href = `mailto:oluwafemiemmanuel@gmail.com?subject=${encodeURIComponent('Yard care enquiry')}&body=${encodeURIComponent(message)}`;
    draft.hidden = false;
    draft.focus();
    draft.scrollIntoView({behavior: 'auto', block: 'start'});
  });
  document.querySelector('#copy-enquiry').addEventListener('click', async () => {
    const message = document.querySelector('#draft-message');
    const status = document.querySelector('#copy-status');
    try {
      await navigator.clipboard.writeText(message.value);
      status.textContent = 'Message copied. Paste it into your email to send.';
    } catch {
      message.focus(); message.select();
      status.textContent = 'Copy the highlighted message using your device’s copy command.';
    }
  });
}
