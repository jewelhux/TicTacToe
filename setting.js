let openSetting = document.querySelector('.openSetting');
let closeSetting = document.querySelector('.closeSetting');
let settingList = document.querySelector('.setting-list');
let body = document.querySelector('.body');
let whiteBtn = document.querySelector('.whiteButton');
let blackBtn = document.querySelector('.blackButton');

let themeList = document.querySelector('.theme-list');
let themeItems = document.querySelectorAll('[data-theme]');

openSetting.addEventListener('click', openMenu);
closeSetting.addEventListener('click', closeMenu);

//Функция открытия меню настроек
function openMenu() {
  settingList.classList.add('displayshow')
}

//Функция закрытия меню настроек
function closeMenu() {
  settingList.classList.remove('displayshow')
}

//Функция смены темы
themeList.addEventListener('click', function(event) {
  themeItems.forEach(element => {
    element.classList.remove('active');
    event.target.classList.add('active');
  });

  if (event.target.dataset.theme === 'white') {
    body.classList.add('ligth');
  }

  if (event.target.dataset.theme === 'black') {
    body.classList.remove('ligth');
  };

  localStorage.setItem('theme', event.target.dataset.theme);
});

//Функция получения из хранилища
function getLocalStorage() {
  themeItems.forEach(element => {
    element.classList.remove('active');
  });

  let checkTheme = localStorage.getItem('theme');
  
  if (checkTheme === 'white') {
    whiteBtn.classList.add('active');
    body.classList.add('ligth');
  }

  if (checkTheme === 'black' || checkTheme === null) {
    blackBtn.classList.add('active');
    body.classList.remove('ligth');
  }
}
window.addEventListener('load', getLocalStorage);