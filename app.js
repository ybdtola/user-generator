const databox = document.querySelector('#databox');
const allUsersBtn = document.querySelectorAll('.userBtn');

let allUsers = [];
let maleUsers = [];
let femaleUsers = [];

const getUsers = async (noOfUsers) => {
    const response = await fetch(`https://randomuser.me/api/?results=${noOfUsers}`);
    const data = response.json();
    return data;
}


const showUsers = (userArray, type='multiple') => {
    if (type === 'multiple') {
    let userCards = userArray.map((item) => {
        return `<div class="user-card" id='${item.login.uuid}'>
                    <div class="image">
                    <img src="${item.picture.large}" alt="Profile Image" />
                    </div>
                    <div class="detail">
                    <h3>${item.name.first} ${item.name.last}</h3>
                    <p>${item.location.street.number} ${item.location.street.name}, ${item.location.city}, ${item.location.state}</p>
                    <a href="mailto:${item.email}"><i class="icofont-ui-message"></i> ${item.email}</a>
                    <a href="tel:${item.phone}"><i class="icofont-ui-call"></i>  ${item.phone}</a>
                    </div>
                    <button id='${item.login.uuid}' class="teal-bg white-text-color user-card-btn"><i class="icofont-arrow-right"></i></button>
                    </div>`;
                }).join('');
                
                databox.innerHTML = userCards;
            } else if (type === 'single'){
                console.log('yes ooh');
                let userDetail = userArray.map(user => {
                    return `<div class="user-card" id='${user.login.uuid}'>
                                    <div class="image">
                                        <img src="${user.picture.large}" alt="Profile Image" />
                                    </div>
                                    <div class="detail">
                                    <h3>${user.name.first} ${user.name.last}</h3>
                                    <p>${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}</p>
                                    <a href="mailto:${user.email}"><i class="icofont-ui-message"></i> ${user.email}</a>
                                    <a href="tel:${user.phone}"><i class="icofont-ui-call"></i>  ${user.phone}</a>
                                    </div>
                                    <button id='${user.login.uuid}' class="teal-bg white-text-color user-card-btn"><i class="icofont-arrow-right"></i></button>
                                </div>`;
                }).join('');

                databox.innerHTML = userDetail;
            }
        }
        
        window.onload = getUsers(10).then(data => {
            data.results.forEach(item => {
                allUsers.push(item);
            });
            
            maleUsers = allUsers.filter(item => {
                return item.gender === 'male';
            });

            femaleUsers = allUsers.filter(item => {
                return item.gender === 'female';
            });
            
            showUsers(allUsers);


            const userCardsHtml = document.querySelectorAll('.user-card-btn');
            userCardsHtml.forEach(card => {
                card.addEventListener('click', () => {
                    let selectedUser = allUsers.filter(user => {
                        return user.login.uuid === card.id;
                    });

                    showUsers(selectedUser, 'single');
                })
            })
        });
        
        
        allUsersBtn.forEach(btn => {
            btn.addEventListener('mouseover', () => {
                if (btn.id === 'all-users') {
                    showUsers(allUsers);
                } else if (btn.id === 'male-users') {
                    showUsers(maleUsers);
                } else if (btn.id === 'female-users') {
                    showUsers(femaleUsers);
                }
            })
        });
        
