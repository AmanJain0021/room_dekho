// Elements
const renterBtn = document.getElementById('renterBtn');
const ownerBtn = document.getElementById('ownerBtn');
const renterQuestions = document.getElementById('renter-questions');
const ownerQuestions = document.getElementById('owner-questions');
const optionsContainer = document.querySelector('.options');
const confirmationScreen = document.getElementById('confirmation-screen');
const container = document.getElementById('container');

// State variables
let currentStepRenter = 1;
const totalStepsRenter = 5;
let currentStepOwner = 1;
const totalStepsOwner = 6;

// Answers storage
const renterAnswers = {
  1: null,
  2: null,
  3: null,
  4: [], // multi-select
  5: null,
};
const ownerAnswers = {
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
};

// Hide all initially
renterQuestions.style.display = 'none';
ownerQuestions.style.display = 'none';
confirmationScreen.style.display = 'none';

// Show step functions
function showStepRenter(step) {
  renterQuestions.querySelectorAll('.question-step').forEach(q => q.classList.remove('active'));
  const stepDiv = renterQuestions.querySelector(`.question-step[data-step="${step}"]`);
  if(stepDiv) stepDiv.classList.add('active');
  container.style.height = 'auto';
  container.style.maxWidth = '550px';
}
function showStepOwner(step) {
  ownerQuestions.querySelectorAll('.question-step').forEach(q => q.classList.remove('active'));
  const stepDiv = ownerQuestions.querySelector(`.question-step[data-step="${step}"]`);
  if(stepDiv) stepDiv.classList.add('active');
  container.style.height = 'auto';
  container.style.maxWidth = '550px';
}

// Role selection handlers
renterBtn.addEventListener('click', () => {
  optionsContainer.style.display = 'none';
  ownerQuestions.style.display = 'none';
  confirmationScreen.style.display = 'none';

  renterQuestions.style.display = 'flex';
  currentStepRenter = 1;
  showStepRenter(currentStepRenter);
});
ownerBtn.addEventListener('click', () => {
  optionsContainer.style.display = 'none';
  renterQuestions.style.display = 'none';
  confirmationScreen.style.display = 'none';

  ownerQuestions.style.display = 'flex';
  currentStepOwner = 1;
  showStepOwner(currentStepOwner);
});

// Handle answer selection for renter questions
renterQuestions.querySelectorAll('.question-step').forEach(stepDiv => {
  const stepNum = parseInt(stepDiv.dataset.step);
  const answerOptions = stepDiv.querySelector('.answer-options');
  if(!answerOptions) return;
  const isMultiSelect = answerOptions.classList.contains('multi-select');

  answerOptions.addEventListener('click', e => {
    if(e.target.tagName !== 'BUTTON') return;
    const clickedBtn = e.target;
    const answer = clickedBtn.dataset.answer;

    if(isMultiSelect) {
      if(clickedBtn.classList.contains('selected')) {
        clickedBtn.classList.remove('selected');
        const idx = renterAnswers[stepNum].indexOf(answer);
        if(idx > -1) renterAnswers[stepNum].splice(idx, 1);
      } else {
        clickedBtn.classList.add('selected');
        renterAnswers[stepNum].push(answer);
      }
    } else {
      answerOptions.querySelectorAll('button').forEach(btn => btn.classList.remove('selected'));
      clickedBtn.classList.add('selected');
      renterAnswers[stepNum] = answer;
    }
  });
});

// Handle answer selection for owner questions
ownerQuestions.querySelectorAll('.question-step').forEach(stepDiv => {
  const stepNum = parseInt(stepDiv.dataset.step);
  const answerOptions = stepDiv.querySelector('.answer-options');
  if(!answerOptions) return;

  answerOptions.addEventListener('click', e => {
    if(e.target.tagName !== 'BUTTON') return;
    const clickedBtn = e.target;
    const answer = clickedBtn.dataset.answer;

    // Owner questions are single select always
    answerOptions.querySelectorAll('button').forEach(btn => btn.classList.remove('selected'));
    clickedBtn.classList.add('selected');
    ownerAnswers[stepNum] = answer;
  });
});

// Navigation buttons renter
renterQuestions.querySelectorAll('.question-step').forEach(stepDiv => {
  const stepNum = parseInt(stepDiv.dataset.step);

  const nextBtn = stepDiv.querySelector('.next-btn');
  const prevBtn = stepDiv.querySelector('.prev-btn');
  const submitBtn = stepDiv.querySelector('.submit-btn');

  if(nextBtn) {
    nextBtn.addEventListener('click', () => {
      // Validate unless multi-select step
      if(stepNum !== 4 && !renterAnswers[stepNum]) {
        alert('Please select an option before proceeding.');
        return;
      }
      if(stepNum < totalStepsRenter) {
        currentStepRenter++;
        showStepRenter(currentStepRenter);
      }
    });
  }
  if(prevBtn) {
    prevBtn.addEventListener('click', () => {
      if(stepNum > 1) {
        currentStepRenter--;
        showStepRenter(currentStepRenter);
      }
    });
  }
  if(submitBtn) {
    submitBtn.addEventListener('click', () => {
      if(!renterAnswers[stepNum]) {
        alert('Please select an option before submitting.');
        return;
      }
      renterQuestions.style.display = 'none';
      confirmationScreen.style.display = 'flex';
      container.style.height = '90vh';
      container.style.maxWidth = '900px';
      console.log('Renter answers:', renterAnswers);
    });
  }
});

// Navigation buttons owner
ownerQuestions.querySelectorAll('.question-step').forEach(stepDiv => {
  const stepNum = parseInt(stepDiv.dataset.step);

  const nextBtn = stepDiv.querySelector('.next-btn');
  const prevBtn = stepDiv.querySelector('.prev-btn');
  const submitBtn = stepDiv.querySelector('.submit-btn');

  if(nextBtn) {
    nextBtn.addEventListener('click', () => {
      if(!ownerAnswers[stepNum]) {
        alert('Please select an option before proceeding.');
        return;
      }
      if(stepNum < totalStepsOwner) {
        currentStepOwner++;
        showStepOwner(currentStepOwner);
      }
    });
  }
  if(prevBtn) {
    prevBtn.addEventListener('click', () => {
      if(stepNum > 1) {
        currentStepOwner--;
        showStepOwner(currentStepOwner);
      }
    });
  }
  if(submitBtn) {
    submitBtn.addEventListener('click', () => {
      if(!ownerAnswers[stepNum]) {
        alert('Please select an option before submitting.');
        return;
      }
      ownerQuestions.style.display = 'none';
      confirmationScreen.style.display = 'flex';
      container.style.height = '90vh';
      container.style.maxWidth = '900px';
      console.log('Owner answers:', ownerAnswers);
    });
  }
});
