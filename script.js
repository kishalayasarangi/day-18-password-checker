function checkPassword() {
  const pwd = document.getElementById('passwordInput').value;

  const checks = {
    length: pwd.length >= 8,
    upper: /[A-Z]/.test(pwd),
    lower: /[a-z]/.test(pwd),
    number: /[0-9]/.test(pwd),
    symbol: /[^A-Za-z0-9]/.test(pwd),
    long: pwd.length >= 12
  };

  updateCriteria(checks);

  const score = Object.values(checks).filter(Boolean).length;
  updateStrengthBar(score, pwd.length);
}

function updateCriteria(checks) {
  const map = {
    'c-length': checks.length,
    'c-upper': checks.upper,
    'c-lower': checks.lower,
    'c-number': checks.number,
    'c-symbol': checks.symbol,
    'c-long': checks.long
  };

  const labels = {
    'c-length': 'At least 8 characters',
    'c-upper': 'Uppercase letter (A-Z)',
    'c-lower': 'Lowercase letter (a-z)',
    'c-number': 'Number (0-9)',
    'c-symbol': 'Symbol (!@#$...)',
    'c-long': 'At least 12 characters (strong)'
  };

  Object.entries(map).forEach(([id, passed]) => {
    const el = document.getElementById(id);
    el.textContent = `${passed ? '✓' : '✕'} ${labels[id]}`;
    el.className = `criteria-item ${passed ? 'pass' : ''}`;
  });
}

function updateStrengthBar(score, length) {
  const bar = document.getElementById('strengthBar');
  const label = document.getElementById('strengthLabel');

  if (length === 0) {
    bar.style.width = '0%';
    label.textContent = 'Enter a password to check';
    label.style.color = '#606070';
    return;
  }

  const levels = [
    { pct: '16%', color: '#ef4444', text: '💀 Very Weak' },
    { pct: '32%', color: '#f97316', text: '😟 Weak' },
    { pct: '48%', color: '#f59e0b', text: '😐 Fair' },
    { pct: '64%', color: '#84cc16', text: '🙂 Good' },
    { pct: '80%', color: '#10b981', text: '😎 Strong' },
    { pct: '100%', color: '#7c3aed', text: '🔒 Very Strong' }
  ];

  const level = levels[Math.min(score - 1, 5)] || levels[0];
  bar.style.width = level.pct;
  bar.style.background = level.color;
  label.textContent = level.text;
  label.style.color = level.color;
}

function toggleVisibility() {
  const input = document.getElementById('passwordInput');
  const btn = document.getElementById('visBtn');
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '🙈';
  } else {
    input.type = 'password';
    btn.textContent = '👁';
  }
}

function updateLen() {
  document.getElementById('lenVal').textContent = document.getElementById('genLength').value;
}

function generatePassword() {
  const len = parseInt(document.getElementById('genLength').value);
  const upper = document.getElementById('incUpper').checked;
  const lower = document.getElementById('incLower').checked;
  const numbers = document.getElementById('incNumbers').checked;
  const symbols = document.getElementById('incSymbols').checked;

  let chars = '';
  if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (lower) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (numbers) chars += '0123456789';
  if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

  if (!chars) { alert('Select at least one character type!'); return; }

  let password = '';
  for (let i = 0; i < len; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  document.getElementById('generatedPassword').textContent = password;
}

function copyGenerated() {
  const pwd = document.getElementById('generatedPassword').textContent;
  if (pwd === 'Click generate to create a password') return;
  navigator.clipboard.writeText(pwd).then(() => {
    const btn = document.getElementById('copyBtn');
    btn.textContent = '✅';
    setTimeout(() => btn.textContent = '📋', 1500);
  });
}