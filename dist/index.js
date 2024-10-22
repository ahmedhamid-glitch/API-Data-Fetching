"use strict";
const getUserName = document.getElementById("user");
const formSubmit = document.getElementById("form");
const main_container = document.querySelector(".main_container");
async function myCustomFetcher(url, options) {
    const res = await fetch(url, options);
    if (!res.ok) {
        throw new Error(`Network response was not ok - status: ${res.status}`);
    }
    const data = await res.json();
    console.log(data);
    return data;
}
const showResultUI = (singleUser) => {
    const { id, login, avatar_url, url } = singleUser;
    main_container.insertAdjacentHTML("beforeend", `
     <div class="card">
      <img src="${avatar_url}" alt="${login}"/>
         <hr/>
      <div class="card-footer">
         <img src="${avatar_url}" alt="${login}"/>
         <a href="${url}"> Github </a>
      </div>
    </div>`);
};
function fetchUserData(url) {
    myCustomFetcher(url, {}).then((userInfo) => {
        for (const singleUser of userInfo) {
            showResultUI(singleUser);
        }
    });
}
// default function call
fetchUserData("https://api.github.com/users");
// let perform search function
formSubmit.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchTerm = getUserName.value.toLowerCase();
    try {
        const url = "https://api.github.com/users";
        const allUserData = await myCustomFetcher(url, {});
        const matchingUsers = allUserData.filter((user) => {
            return user.login.toLowerCase().includes(searchTerm);
        });
        main_container.innerHTML = "";
        if (matchingUsers.length === 0) {
            main_container.insertAdjacentHTML("beforeend", `
            <p class='empty-msg'>No matching  users found.</p>
            `);
        }
        else {
            for (const singleUser of matchingUsers) {
                showResultUI(singleUser);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
