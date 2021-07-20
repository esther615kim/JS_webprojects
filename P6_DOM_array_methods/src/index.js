//변수지정, main & buttns

const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')

let userData =[];


//Functions

//1.fetch userdata & promise, get random user API
async function getUser(){
  const res = await  fetch('https://randomuser.me/api');
  const data = await res.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    phone: `${user.cell}`,
    email: `${user.email}`,
    money: Math.floor(Math.random() * 1000000),
  }
  console.log(newUser)
  addData(newUser); //func. add-user
}


//2.add user  to [] & DOM update
function addData(obj){
  userData.push(obj); //여기서 유저는 Line 6의 빈 객체
  console.log(userData);
  updateDom(); //()붙으면 바로 실행이쟈나
}

//3.updateDOM
function updateDom(provided = userData){
//main의 div 다 지우고
//forEach로  userData의 정보를 돌리는데,HTML 형식으로 넣고
//main에 끼우기 append, 아래 복붙

main.innerHTML = '<h2><strong>Person  </strong> email/phone/wealth</h2>';

provided.forEach(item => {
  const element = document.createElement('div');
  element.className ='person';
  element.innerHTML = `<strong>${item.name}</strong> ${item.phone} ${item.email} ${formatNum(item.money)}`;
  main.appendChild(element);
});
}


//4.formatMoney
function formatNum(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//EventListner
addUserBtn.addEventListener('click',getUser);