document.getElementById('registrationForm').addEventListener('submit', function(e){
  e.preventDefault();
  const msg=document.getElementById('formMessage');
  msg.textContent='Profile captured in this starter UI. Next step: connect the backend and real payment gateway to create the account and verify the fee.';
});
