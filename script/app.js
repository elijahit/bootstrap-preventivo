const formElement = document.querySelector('#form-preventivo');

formElement.addEventListener('submit', resolveForm);

function validationForm (name, lastname, email, job, privacypolicy) {
  const descriptionDiv = document.querySelector('#descriptionNoValid');
  descriptionDiv.innerHTML = '';
  let checker = 0;

  function classNoValid (element, text) {
    element.classList.add('is-invalid');
    descriptionDiv.innerHTML += `<p class="m-0 is-invalid text-danger"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-backspace-reverse-fill" viewBox="0 0 16 16">
    <path d="M0 3a2 2 0 0 1 2-2h7.08a2 2 0 0 1 1.519.698l4.843 5.651a1 1 0 0 1 0 1.302L10.6 14.3a2 2 0 0 1-1.52.7H2a2 2 0 0 1-2-2zm9.854 2.854a.5.5 0 0 0-.708-.708L7 7.293 4.854 5.146a.5.5 0 1 0-.708.708L6.293 8l-2.147 2.146a.5.5 0 0 0 .708.708L7 8.707l2.146 2.147a.5.5 0 0 0 .708-.708L7.707 8z"/>
  </svg> ${text}</p>`;
  } 

  // VALIDAZIONE DEL NOME
  if(name.value.length < 2) {
    checker++;
    classNoValid(name, "Il nome è obbligatorio e di almeno 2 caratteri.");
  } else {
    name.classList.remove('is-invalid');
    name.classList.add('is-valid');
  }
  // VALIDAZIONE DEL COGNOME
  if(lastname.value.length < 2) {
    checker++;
    classNoValid(lastname, "Il cognome è obbligatorio e di almeno 2 caratteri.");
  } else {
    lastname.classList.remove('is-invalid');
    lastname.classList.add('is-valid');
  }
  // VALIDAZIONE EMAIL
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email.value)) {
    checker++;
    classNoValid(email, "L'email è obbligatorio nel formato example@example.com");
  } else {
    email.classList.remove('is-invalid');
    email.classList.add('is-valid');
  }
  // VALIDAZIONE JOBS
  let jobsChecker = 
  job.value == 1 ? true : 
  job.value == 2 ? true : 
  job.value == 3 ? true : false;
  if(!jobsChecker) {
    checker++;
    classNoValid(job, "Il tipo di lavoro non è valido, selezionane uno valido.");
  } else {
    job.classList.remove('is-invalid');
    job.classList.add('is-valid');
  }
  // VALIDAZIONE PRIVACY POLICY
  if(!privacypolicy.checked) {
    checker++;
    classNoValid(privacypolicy, "E' obbligatorio accettare la Privacy Policy.");
  } else {
    privacypolicy.classList.remove('is-invalid');
    privacypolicy.classList.add('is-valid');
  }

  return checker > 0 ? false : true;
}

function validationPromo (promoCode) {
  const descriptionDiv = document.querySelector('#info-promocode');
  descriptionDiv.innerHTML = '';
  promoCode.classList.remove('is-invalid');
  promoCode.classList.remove('is-valid');

  // L'oggetto promoObject racchiude tutti i codici promozionali e le rispettive percentuali di sconto da assegnare - non ho assegnato solo il 25 percento ma ho assegnato lo sconto in base al suo finale nel promocode.
  const promoObject = {
    "YHDNU32": 32,
    "JANJC63": 63,
    "PWKCN25": 25,
    "SJDPO96": 96,
    "POCIE24": 24
  }
  
  if(promoObject[promoCode.value]) {
    //SE IL PROMOCODE è VALIDO
    promoCode.classList.remove('is-invalid');
    promoCode.classList.add('is-valid');
    descriptionDiv.innerHTML = `<b>Sconto del ${promoObject[promoCode.value]}% applicato</b>`;
  } else {
    if(promoCode.value.length > 0) {
      promoCode.classList.add('is-invalid');
      descriptionDiv.innerHTML = `<b>Nessuno sconto applicato</b>`;
    }
  }
  return promoObject[promoCode.value] ? promoObject[promoCode.value] : 0;
}

function jobSalaryResolve(jobValue) {
  //Le ore di lavoro assegnate sono senza alcun criterio e sono tutte 10 ore.
  const jobObject = {
    1: {
      name: "Sviluppo Backend",
      priceHour: 20.50,
      hourJob: 10
    },
    2: {
      name: "Sviluppo frontend",
      priceHour: 15.30,
      hourJob: 10
    },
    3: {
      name: "Analisi progettuale",
      priceHour: 33.60,
      hourJob: 10
    }
  }
  return jobObject[jobValue];
}

function resolveForm (e) {
  e.preventDefault();
  const name = document.querySelector('#form-preventivo #name');
  const lastname = document.querySelector('#form-preventivo #lastname');
  const email = document.querySelector('#form-preventivo #email');
  const job = document.querySelector('#form-preventivo #job-select');
  const promoCode = document.querySelector('#form-preventivo #promocode');
  const privacypolicy = document.querySelector('#form-preventivo #privacypolicy');

  let validationCheck = validationForm(name, lastname, email, job, privacypolicy);
  if(validationCheck) {
    let promoCodePercent = validationPromo(promoCode);
    let jobSalaryObject = jobSalaryResolve(job.value);

  }
}

