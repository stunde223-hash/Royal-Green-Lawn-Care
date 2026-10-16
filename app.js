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
  form.querySelector('[type=submit]').disabled = false;
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
    const gmailURL = new URL('https://mail.google.com/mail/');
    gmailURL.search = new URLSearchParams({
      view: 'cm', fs: '1', to: 'oluwafemiemmanuel@gmail.com',
      su: 'Yard care enquiry', body: message
    }).toString();
    document.querySelector('#email-draft-link').href = gmailURL.href;
    window.open(gmailURL.href, '_blank', 'noopener,noreferrer');
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

const imageViewer = document.querySelector('#image-viewer');
if (imageViewer) {
  const links = [...document.querySelectorAll('[data-photo]')];
  const image = document.querySelector('#viewer-image');
  const originalToggle = document.querySelector('#toggle-original');
  let active = 0;
  let original = false;
  let opener;
  const renderImage = () => {
    const link = links[active];
    const source = link.querySelector('img');
    image.src = original ? `assets/${link.dataset.photo}.jpg` : link.getAttribute('href');
    const caption = source?.alt || 'Lawn mowing in progress';
    image.alt = `${original ? 'Original supplied photo' : 'AI-enhanced reconstruction'}: ${caption}`;
    document.querySelector('#viewer-caption').textContent = caption;
    document.querySelector('#viewer-count').textContent = `${active + 1} / ${links.length}`;
    document.querySelector('#viewer-note').textContent = original
      ? 'Original supplied photo, 206 × 206 pixels. Enlarging it will appear soft.'
      : '';
    originalToggle.textContent = original ? 'View enhanced image' : 'View original photo';
  };
  const move = offset => { active = (active + offset + links.length) % links.length; original = false; renderImage(); };
  links.forEach((link, index) => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || typeof imageViewer.showModal !== 'function') return;
    event.preventDefault(); opener = link; active = index; original = false;
    renderImage(); imageViewer.showModal(); document.body.classList.add('viewer-open');
  }));
  document.querySelector('#close-viewer').addEventListener('click', () => imageViewer.close());
  document.querySelector('#previous-image').addEventListener('click', () => move(-1));
  document.querySelector('#next-image').addEventListener('click', () => move(1));
  originalToggle.addEventListener('click', () => { original = !original; renderImage(); });
  imageViewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
  });
  imageViewer.addEventListener('click', event => {
    const bounds = imageViewer.getBoundingClientRect();
    if (event.target === imageViewer && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) imageViewer.close();
  });
  imageViewer.addEventListener('close', () => { document.body.classList.remove('viewer-open'); opener?.focus(); });
}
