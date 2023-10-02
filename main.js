const timeConverter = UNIX_timestamp => {
    const date = new Date(UNIX_timestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}
const svgEdit = `<svg class="btn-editSvg" style="width: 14px; height: 14px;" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="m4.5,1h5.515c.334,0,.663.03.985.088v5.412c0,1.378,1.122,2.5,2.5,2.5h5.411c.033.178.057.359.071.541.022.275.274.479.539.458.275-.022.48-.264.458-.539-.125-1.536-.793-2.981-1.883-4.07l-3.485-3.485c-1.228-1.228-2.86-1.904-4.596-1.904h-5.515C2.019,0,0,2.019,0,4.5v15c0,2.481,2.019,4.5,4.5,4.5h4c.276,0,.5-.224.5-.5s-.224-.5-.5-.5h-4c-1.93,0-3.5-1.57-3.5-3.5V4.5c0-1.93,1.57-3.5,3.5-3.5Zm12.889,5.096c.545.545.965,1.195,1.24,1.904h-5.129c-.827,0-1.5-.673-1.5-1.5V1.368c.706.273,1.353.692,1.904,1.243l3.485,3.485Zm5.878,5.636c-.943-.944-2.592-.944-3.535,0l-7.707,7.707c-.661.661-1.025,1.54-1.025,2.475v1.586c0,.276.224.5.5.5h1.586c.935,0,1.814-.364,2.475-1.025l7.707-7.707c.472-.472.732-1.1.732-1.768s-.26-1.296-.732-1.768Zm-.707,2.828l-7.707,7.707c-.472.472-1.1.732-1.768.732h-1.086v-1.086c0-.668.26-1.295.732-1.768l7.707-7.707c.566-.566,1.555-.566,2.121,0,.283.283.439.66.439,1.061s-.156.777-.439,1.061Z"/></svg>
 `;

const svgRemove = `<svg class="btn-removeSvg" style="width: 14px; height: 14px;" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M23.85,16.85l-3.15,3.16,3.15,3.13c.2,.19,.2,.51,0,.71-.1,.1-.23,.15-.35,.15s-.25-.05-.35-.15l-3.15-3.13-3.11,3.13c-.1,.1-.23,.15-.35,.15s-.25-.05-.35-.15c-.2-.19-.2-.51,0-.71l3.11-3.13-3.15-3.13c-.2-.19-.2-.51,0-.71,.2-.2,.51-.2,.71,0l3.15,3.13,3.15-3.16c.2-.2,.51-.2,.71,0,.2,.19,.2,.51,0,.71Zm.15-9.35v6c0,.28-.22,.5-.5,.5s-.5-.22-.5-.5v-5.5H1v10.5c0,1.93,1.57,3.5,3.5,3.5H13.5c.28,0,.5,.22,.5,.5s-.22,.5-.5,.5H4.5c-2.48,0-4.5-2.02-4.5-4.5V5.5C0,3.02,2.02,1,4.5,1h3.03c.39,0,.77,.09,1.12,.26l3.16,1.58c.21,.1,.44,.16,.67,.16h7.03c2.48,0,4.5,2.02,4.5,4.5ZM1,7H22.96c-.24-1.69-1.7-3-3.46-3h-7.03c-.39,0-.77-.09-1.12-.26l-3.16-1.58c-.21-.1-.44-.16-.67-.16h-3.03c-1.93,0-3.5,1.57-3.5,3.5v1.5Z"/></svg>
 `;

 const getCookie = (name) => {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split('=');
        if (cookie[0] === name) {
            return cookie[1];
        }
    }
    return null;
}

let savedLang = getCookie('saveLng');

async function forRandomImageDog() {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        return data.message;

    }
    catch (error) {
        console.log(error);
    }
}

async function forRandomComment() {
    try {
        const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru');
        const data = await response.json();
        return data;

    }
    catch (error) {
        console.log(error);
    }
}

//---------------------------------------
let comments = [];
const allLang = ['en', 'ua'];

const image = document.getElementById('img');
const commentName = document.getElementById('comment-name');
const commentBody = document.getElementById('comment-body');
const commentType = document.getElementById('comment-select');
const commentAddBtn = document.getElementById('comment-add');
const commentUpdateBtn = document.getElementById('comment-update');
const commentAddGenerBtn = document.getElementById('comment-generation-add');
const commentSearch = document.getElementById('comment-search');
const commentFilter = document.getElementById('comment-select-sort');
const selectLang = document.getElementById('select-lang');
const commentField = document.getElementById('comment-field');


commentAddGenerBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    let quote = await forRandomComment();
    let imagePat = await forRandomImageDog();
    const comment = {
        name: quote.quoteAuthor.trim(),
        body: quote.quoteText.trim(),
        type: 'quote',
        time: Math.floor(Date.now() / 1000),
        img: imagePat,
    }
    if (comment.name === '' || comment.body === '' || comment.type === 'Choose...') {
        examFieldsError(comment);
        return;
    }
    cleanForm();
    comments.push(comment);
    saveComments();
    showComments(comments);
    showLanguage(savedLang);
})

commentAddBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    let imagePat = await forRandomImageDog();
    const comment = {
        name: commentName.value.trim(),
        body: commentBody.value.trim(),
        type: commentType.value.trim(),
        time: Math.floor(Date.now() / 1000),
        img: imagePat,
    }

    if (comment.name === '' || comment.body === '' || comment.type === 'Choose...') {
        examFieldsError(comment);
        return;
    }
    console.log(comment.name.value);
    cleanForm();
    comments.push(comment);
    saveComments();
    showComments(comments);
    showLanguage(savedLang);
});

const cleanForm = () => {
    commentName.value = '';
    commentBody.value = '';
    commentType.value = 'Choose...';
}

commentField.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-edit') || event.target.classList.contains('btn-editSvg')) {
        const commentElement = event.target.closest('.media');
        const commentIndex = commentElement.dataset.index;
        editComment(commentElement, commentIndex);
    }
    if (event.target.classList.contains('btn-remove') || event.target.classList.contains('btn-removeSvg')) {
        const commentElement = event.target.closest('.media');
        const commentIndex = commentElement.dataset.index;
        commentElement.remove();
        comments.splice(commentIndex, 1);
        saveComments();
        showComments(comments);
        showLanguage(savedLang);
        noComment();
    }
});


const editComment = (element, index) => {
    element.classList.add('disp-none');
    commentAddBtn.classList.add('disp-none');
    commentAddGenerBtn.classList.add('disp-none');
    commentUpdateBtn.classList.remove('disp-none');
    commentName.value = `${element.querySelector('.existing-name-comment').innerText}`;
    commentBody.value = `${element.querySelector('.existing-body-comment').innerText}`;
    commentType.value = comments[index].type;

    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.setAttribute('disabled', '');
        btn.style.backgroundColor = 'gray';
    })
    document.querySelectorAll('.btn-remove').forEach(btn => {
        btn.setAttribute('disabled', '');
        btn.style.backgroundColor = 'gray';
    })

    commentUpdateBtn.onclick = (event) => {
        event.preventDefault();

        comments[index].name = commentName.value.trim();
        comments[index].body = commentBody.value.trim();
        comments[index].type = commentType.value.trim();
        if (comments[index].name === '' || comments[index].body === '' || comments[index].type === 'Choose...') {
            examFieldsError(comments[index]);
            return;
        }

        commentAddBtn.classList.remove('disp-none');
        commentAddGenerBtn.classList.remove('disp-none');
        commentUpdateBtn.classList.add('disp-none');
        cleanForm();
        saveComments();
        showComments(comments);
        showLanguage(savedLang);
    };
}

// .splice(0,6)

const showComments = comments => {
    let out = '';
    comments.forEach((comment, index) => {
        out += `
        <div style="padding-bottom: 16px;" class="media" data-index="${index}">
          <img class="existing-img-comment" style="height: 50px; width: 50px; border-radius: 50%;" src="${comment.img}" alt="user">
          <h2 class="name mb-3 existing-name-comment" style="display: inline-block;">${comment.name}</h2>
          <div style="padding: 16px; background-color: #f9f99f; border: 1px solid #e6e632; border-radius: 6px;">
          <p class="existing-body-comment" style="margin-bottom: 16px;">${comment.body}</p>
            <div class="flex-justify-cont-space-between">
            <p class="small existing-time-comment"><em>${timeConverter(comment.time)}</em></p>
            <p class="small existing-type-comment type-comment-lng"><em>${comment.type}</em></p>
              <button  class="btn-edit">${svgEdit}</button>
              <button class="btn-remove">${svgRemove}</button>
              </div>
          </div>
          </div>
      `;
    });

    commentField.innerHTML = out;
}

const saveComments = () => {
    localStorage.setItem('comments', JSON.stringify(comments));
}

const loadComments = () => {
    if (localStorage.getItem('comments')) {
        comments = JSON.parse(localStorage.getItem('comments'));
        showComments(comments);
    }
}

loadComments();

const examFieldsError = comment => {
    if (comment.name === '') {
        fieldsError(commentName);
    }
    if (comment.body === '') {
        fieldsError(commentBody);
    }
    if (comment.type === 'Choose...') {
        fieldsError(commentType);
    }
}


const fieldsError = field => {
    field.classList.add('position-relative', 'border-danger');
    setTimeout(function () {
        field.classList.remove('position-relative', 'border-danger');
    }, 2000);
}

commentFilter.addEventListener('change', function () {
    if (this.value === "") {
        showComments(comments);
        showLanguage(savedLang);
        return 0;
    }
    showComments(comments.filter(comment => comment.type == this.value));
    noComment();
    showLanguage(savedLang);
})

commentSearch.oninput = function () {
    let val = this.value.trim().toLowerCase();
    let searchItems = document.querySelectorAll('.media h2');
    searchItems.forEach(el => {
        if (val !== '') {
            if (el.innerText.toLowerCase().indexOf(val) != -1) {
                el.closest('.media').classList.remove('disp-none');
                noComment();
            }
            else {
                el.closest('.media').classList.add('disp-none');
                noComment();
            }
        }
        else {

            el.closest('.media').classList.remove('disp-none');
            noComment();

        }
    });
    showLanguage(savedLang);
}

const noComment = () => {
    if (document.getElementById('no-comments')) {
        document.getElementById('no-comments').remove();
    }
    if (commentField.offsetHeight === 0) {
        if (savedLang === 'en' ||selectLang.value === 'en') {
            commentField.innerHTML += '<h2 id="no-comments" style="text-align: center;">No comments</h2>';
        }
        else {
            commentField.innerHTML += '<h2 id="no-comments" style="text-align: center;">Коментарів немае</h2>';
        }
    }

}

noComment();

selectLang.addEventListener('change',() => {
    const lang = selectLang.value;
    const expires = new Date();
    expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000);
    document.cookie = `${'saveLng'}=${lang};expires=${expires.toUTCString()};path=/`;
    changeURLLanguage();
});

const changeURLLanguage = () => {
    const lang = selectLang.value;
    location.href = window.location.pathname + '#' + lang;
    location.reload();
}

const showLanguage = (hash) => {
    for (let key in langArr['text']) {
        document.querySelector('.lng-' + key).innerHTML = langArr['text'][key][hash];
    }
    for (let key in langArr['placeholder']) {
        document.querySelector('.lng-' + key).placeholder = langArr['placeholder'][key][hash];
    }
    if (document.querySelector('.media')) {
        comments.forEach(comment => {
            document.querySelectorAll('.type-comment-lng').forEach(el => {
                if (el.innerText == (comment['type'])) {
                    el.innerHTML = langTypyArr[comment['type']][hash];
                }
            })

        })
    }
}

const  changeLanguage = () => {
    if (savedLang) {
        if (!allLang.includes(savedLang)) {
            location.href = window.location.pathname + '#' + savedLang;
        }
        selectLang.value = savedLang;
        showLanguage(savedLang);
    }
    else {
        let hash = location.hash;
        hash = hash.slice(1);
        if (!allLang.includes(hash)) {
            location.href = window.location.pathname + '#en';
            location.reload();
        }
        savedLang = hash
        selectLang.value = hash;
        showLanguage(hash);
    }
}
changeLanguage();
