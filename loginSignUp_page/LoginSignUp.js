const container=document.querySelector(".container");
const register=document.querySelector("#register");
const login=document.querySelector("#login");

register.addEventListener("click",()=>{
    container.classList.add('active');
})

login.addEventListener("click",()=>{
    container.classList.remove('active')
})




