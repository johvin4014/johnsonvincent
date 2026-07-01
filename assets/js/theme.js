const navToggle=document.getElementById('navToggle');const mainNav=document.getElementById('mainNav');const themeToggle=document.getElementById('themeToggle');const themeIcon=document.getElementById('themeIcon');
if(navToggle&&mainNav){navToggle.addEventListener('click',()=>mainNav.classList.toggle('open'))}
const savedTheme=localStorage.getItem('jv-theme');if(savedTheme==='light'){document.body.classList.add('light');if(themeIcon)themeIcon.textContent='☀️'}
if(themeToggle){themeToggle.addEventListener('click',()=>{document.body.classList.toggle('light');const isLight=document.body.classList.contains('light');localStorage.setItem('jv-theme',isLight?'light':'dark');if(themeIcon)themeIcon.textContent=isLight?'☀️':'🌙'})}
