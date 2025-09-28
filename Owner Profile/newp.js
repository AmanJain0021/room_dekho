// about section ---------------
function enableEdit() {
  let aboutText = document.getElementById("aboutText");
  let aboutInput = document.getElementById("aboutInput");
  let saveBtn = document.getElementById("saveBtn");
  let charCount = document.getElementById("charCount");

  aboutInput.style.display = "block";
  saveBtn.style.display = "inline-block";
  charCount.style.display = "block";

  aboutInput.value = aboutText.innerText.trim();
  charCount.innerText = "Character limit: " + aboutInput.value.length + " / 1000";

  aboutText.style.display = "none";

  // live character counter
  aboutInput.addEventListener("input", function () {
    charCount.innerText = "Character limit: " + aboutInput.value.length + " / 1000";
  });
}

function saveAbout() {
  let aboutText = document.getElementById("aboutText");
  let aboutInput = document.getElementById("aboutInput");
  let saveBtn = document.getElementById("saveBtn");
  let charCount = document.getElementById("charCount");

  aboutText.innerText = aboutInput.value;

  aboutText.style.display = "block";
  aboutInput.style.display = "none";
  saveBtn.style.display = "none";
  charCount.style.display = "none";
}

// profile photo and cover photo section --------------
// Change profile picture preview
function changeProfilePic(event) {
  const reader = new FileReader();
  reader.onload = function(){
    const output = document.getElementById('profilePic');
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}

// Change owner name
function enableNameEdit() {
  let nameDisplay = document.getElementById("ownerName");
  let nameInput = document.getElementById("editName");

  if (nameInput.style.display === "none") {
    nameInput.value = nameDisplay.innerText.trim();
    nameDisplay.style.display = "none";
    nameInput.style.display = "block";

    // Save on Enter key
    nameInput.addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        saveName();
      }
    });
  } else {
    saveName();
  }
}

function saveName() {
  let nameDisplay = document.getElementById("ownerName");
  let nameInput = document.getElementById("editName");

  if (nameInput.value.trim() !== "") {
    nameDisplay.innerText = nameInput.value.trim();
  }

  nameInput.style.display = "none";
  nameDisplay.style.display = "block";
}

