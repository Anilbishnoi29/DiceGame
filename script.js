'use strict';
// Selecting Elements
const getName = document.getElementById('getName');

// overlay
getName.addEventListener('click', function () {
  document.getElementById('overlay').classList.add('d-translate');
  setTimeout(function () {
    document.getElementById('overlay').classList.add('d-none');
    document.getElementById('game').classList.add('d-translate-game');
  }, 500);
});
