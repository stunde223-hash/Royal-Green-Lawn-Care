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

// Show the planner one stage at a time; the complete form works as a fallback.
if (form) {
  const steps = [...form.querySelectorAll('.form-step')];
  const progress = [...form.querySelectorAll('.planner-progress > span')];
  const next = document.querySelector('#next-step');
  const back = document.querySelector('#previous-step');
  const submit = document.querySelector('#prepare-enquiry');
  let current = 0;
  form.classList.add('is-guided');
  form.noValidate = true;
  form.querySelector('.planner-progress').hidden = false;
  form.querySelector('.planner-controls').hidden = false;
  const showStep = (index, focus = true) => {
    current = index;
    steps.forEach((step, i) => { step.hidden = i !== index; });
    progress.forEach((item, i) => {
      item.classList.toggle('current', i === index);
      if (i === index) item.setAttribute('aria-current', 'step');
      else item.removeAttribute('aria-current');
    });
    back.disabled = index === 0;
    next.hidden = index === steps.length - 1;
    submit.hidden = index !== steps.length - 1;
    next.innerHTML = `${index === 0 ? 'Next: your yard' : 'Next: your details'} <span class="outbound-arrow" aria-hidden="true"></span>`;
    document.querySelector('#step-count').textContent = `STEP ${index + 1} OF ${steps.length}`;
    if (focus) {
      const legend = steps[index].querySelector('legend');
      legend.tabIndex = -1;
      legend.focus();
    }
  };
  const validateStep = index => {
    if (index === 0 && !form.querySelector('[name="service"]:checked')) {
      document.querySelector('#service-error').textContent = 'Choose at least one service to start your plan.';
      form.querySelector('[name="service"]').focus();
      return false;
    }
    for (const field of steps[index].querySelectorAll('input:not([type="checkbox"]), textarea, select')) {
      if (field.required && !field.value.trim()) field.setCustomValidity('Please fill out this field.');
      else field.setCustomValidity('');
      if (!field.reportValidity()) return false;
    }
    return true;
  };
  form.addEventListener('input', event => { if (event.target.setCustomValidity) event.target.setCustomValidity(''); });
  next.addEventListener('click', () => { if (validateStep(current)) showStep(current + 1); });
  back.addEventListener('click', () => showStep(Math.max(0, current - 1)));
  form.addEventListener('submit', event => {
    const requestedStep = current;
    for (let index = 0; index <= requestedStep; index++) {
      showStep(index, false);
      if (!validateStep(index)) { event.preventDefault(); event.stopImmediatePropagation(); return; }
    }
    if (current < steps.length - 1) {
      event.preventDefault(); event.stopImmediatePropagation(); showStep(current + 1);
    }
  }, true);
  showStep(0, false);
}
