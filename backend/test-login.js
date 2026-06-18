async function main() {
  const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@example.com', password: 'admin123' }),
  });
  const data = await response.json();
  console.log('status', response.status);
  console.log(JSON.stringify(data, null, 2));
}

main().catch((err) => {
  console.error('ERROR', err.message);
  process.exit(1);
});
