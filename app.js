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
  const serviceInputs = [...form.querySelectorAll('[name="service"]')];
  const selectedServices = () => serviceInputs.filter(input => input.checked).map(input => input.value);
  const draft = document.querySelector('#enquiry-draft');
  const serviceError = document.querySelector('#service-error');
  const sync = () => {
    document.querySelector('#summary-service').textContent = selectedServices().join(', ') || 'Start with a service above.';
    document.querySelector('#summary-area').textContent = form.elements.area.value.trim() || 'Your corner of Los Angeles';
    document.querySelector('#summary-frequency').textContent = form.elements.frequency.value;
    if (selectedServices().length) serviceError.textContent = '';
    draft.hidden = true;
    document.querySelector('#copy-status').textContent = '';
  };
  form.addEventListener('input', sync);
  form.addEventListener('change', sync);
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!selectedServices().length) {
      serviceError.textContent = 'Choose at least one service to start your enquiry.';
      serviceInputs[0].focus();
      return;
    }
    const values = new FormData(form);
    const message = [
      'Hello Royal Green,', '', 'I would like to discuss care for my yard.', '',
      `Services: ${selectedServices().join(', ')}`,
      `Neighborhood / city: ${values.get('area').trim()}`,
      `Frequency: ${values.get('frequency')}`, '',
      `About the yard: ${values.get('notes').trim() || 'Let’s discuss the details.'}`, '',
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
      message.focus();
      message.select();
      status.textContent = 'Select and copy the highlighted message using your device’s copy command.';
    }
  });
}
