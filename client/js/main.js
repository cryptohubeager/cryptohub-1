$("#search").submit(()=>{
    event.preventDefault()
    const coinName = $('#coinName').val()
    console.log(coinName)
    $('#coinName').val('')
    $('#search-result').show()
    $.ajax({
        url:'http://localhost:3000/api/cryptometa',
        method:'POST',
        data:{
            slug:coinName
        },
        beforeSend:function(xhr){
            xhr.setRequestHeader('token', localStorage.getItem('token'))
        }
    })
    .done((response) => {
        let object = Object.keys(response)
        let keys = object[0]
        $('#crypto-search').html(`<li class="collection-item avatar">
        <img src="${response[keys].logo}" alt="" class="circle">
        <span class="title">${response[keys].name} [${response[keys].symbol}]</span>
        <br>
        <br>
        <p>
        ${response[keys].description}
        </p>
        <a href="#!" class="secondary-content waves-effect waves-light btn" onclick="generateApi('${response[keys].name}')">Insight<i class="material-icons">chevron_right</i></a>
        </li>`)   
    })
    .fail((jqXHR,textStatus) => {
        const errMsg = jqXHR.responseJSON.message
        Swal.fire({
            type:'error',
            text:errMsg,
        })
    })
    // $.ajax({
    //     url:`http://localhost:3000/api/search?coin=${coinName}`,
    //     method:'GET',
    //     beforeSend:function(xhr){
    //         xhr.setRequestHeader('access-token', localStorage.getItem('token'));
    //     },
    // })
    // .done((response) => {
    //     $('#crypto-search').html(`<li class="collection-item avatar">
    //     <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/3602.png" alt="" class="circle">
    //     <span class="title">koinku [kk]</span>
    //     <p>Price in USD 40000.000<br>
    //     </p>
    //     <a href="#!" class="secondary-content waves-effect waves-light btn" onclick="generateApi('${crypto.name}')">Insight<i class="material-icons">chevron_right</i></a>
    //     </li>`)
    // })
})

function generateApi(query){
    console.log(query)
    $.ajax({
        url : (`http://localhost:3000/news/show/${query}&pageSize=5`),
        type : 'get',
        dataTypes : 'json'
    })
    .done(data => {
        // console.log(data)
        $.each(data.articles, (i, eachData) => {
            $('#list').append(`
            <div class="row">
                <div class="col s12 m7">
                <div class="card">
                    <div class="card-image">
                    <img src="${eachData.urlToImage}">
                    <span class="card-title">${eachData.title}</span>
                    </div>
                    <div class="card-content">
                    <h4> ${eachData.title} </h4>
                    <small>${eachData.author}</small>
                    <p> ${eachData.content} </p>
                    </div>
                    <div class="card-action">
                    <a href="${eachData.url}">Click here to read full News</a>
                    </div>
                </div>
                </div>
            </div>
            `)
        })
    })
    .fail()
    // console.log(query)
    listVideo(query)
}

function getCoinData(){
    console.log('masuk brooo');
    $.ajax({
        url:'http://localhost:3000/api/crypto',
        method:'GET',
        beforeSend:function(xhr){
            xhr.setRequestHeader('token', localStorage.getItem('token'))
        }
    })
    .done(function(response){
        $('#list').empty()
        console.log(response)
        $('#crypto-content').html('')
        for(let crypto of response){
            let object = crypto.quote
            let keys = Object.keys(object)
            let slug = crypto.slug
            $.ajax({
                url:'http://localhost:3000/api/cryptometa',
                method:'POST',
                data:{
                    slug:slug
                },
                beforeSend:function(xhr){
                    xhr.setRequestHeader('token', localStorage.getItem('token'))
                }
            })
            .done((response) => {
                console.log(crypto.id)
                // console.log(response[crypto.id].logo)
                $('#crypto-content').append(` <li class="collection-item avatar">
                <img src="${response[crypto.id].logo}" alt="" class="circle">
                <span class="title">${crypto.name} [${crypto.symbol}]</span>
                <p>Price in ${keys[0]} ${crypto.quote[keys[0]].price} <br>
                </p>
                <a href="#!" class="secondary-content waves-effect waves-light btn" onclick="generateApi('${crypto.name}')">Insight<i class="material-icons">chevron_right</i></a>
                </li>`)
            })
            .fail((jqXHR,textStatus) => {
                const errMsg = jqXHR.responseJSON.message
                Swal.fire({
                    type:'error',
                    text:errMsg,
                })
            })
            // console.log(`${crypto.quote[keys[0]].price}`)
        } 
    })
    .fail(function(jqXHR,textStatus){
        const errMsg = jqXHR.responseJSON.message
        Swal.fire({
            type:'error',
            text:errMsg,
        })
    })

}

$('#register-form').click(function(event){
    event.preventDefault()
    const email = $('#email-register').val()
    const password = $('#password-register').val()
    $('#email-register').val('')
    $('#password-register').val('')
    $.ajax({
        url:'http://localhost:3000/register',
        method:'POST',
        data: {
            email:email,
            password:password
        }
    })
    .done(function(response){
        Swal.fire({
            type:'success',
            title: "Success",
            text:response.msg
        })
    })
    .fail(function(jqXHR,textStatus){
        const errMsg = jqXHR.responseJSON.message.split(':')
        Swal.fire({
            type:'error',
            title:'Failed to register',
            text:errMsg[2],
        })
    })
})

$('#logout-button').click(function(event){
    localStorage.clear()
    $("#loading").hide()
    $('.content-web').hide()
    $('.login').hide()
    $('#register-button').hide()
    $('#logout-button').hide()
    $('.register').show()
    $('#login-button').show()
    signOut()
})

$('#login-form').click(function(event){
    event.preventDefault()
    const email = $('#email-login').val()
    const password = $('#password-login').val()
    $('#email-login').val('')
    $('#password-login').val('')
    $.ajax({
        url:' http://localhost:3000/login',
        method:'POST',
        data: {
            email:email,
            password:password
        }
    })
    .done(function(response){
        console.log(response.token)
        Swal.fire({
            type:'success',
            title: "Welcome back to cryptohub",
        })
        localStorage.setItem('token',response.token)
        $('.login').hide()
        $('#register-button').hide()
        $('#logout-button').show()
        $('.content-web').show()
    })
    .fail(function(jqXHR,textStatus){
        const errMsg = jqXHR.responseJSON.message.split(':')
        console.log(errMsg);
        Swal.fire({
            type:'error',
            title:'Failed to Login',
            text:errMsg[0],
        })
    })
})

$('#login-button').click(function(){
    $('.register').hide()
    $('.login').show()
    $('#login-button').hide()
    $('#register-button').show()
})

$('#register-button').click(function(){
    $('.register').show()
    $('.login').hide()
    $('#login-button').show()
    $('#register-button').hide()
})

function onSignIn(googleUser) {
    console.log('masuk');
    const idToken= googleUser.getAuthResponse().id_token
    $.ajax({
        url: `http://localhost:3000/glogin`,
        type: 'post',
        data: {
           idToken
        }
    })
    .done(function(data){
        if (!localStorage.getItem('token')) {
            Swal.fire({
                type:'success',
                title: "Welcome back to cryptohub",
            })
        }
        localStorage.setItem('token', data.token)
        localStorage.setItem('name', data.name)
        $('.register').hide()
        $('.login').hide()
        $('#login-button').hide()
        $('#register-button').hide()
        $('#logout-button').show()
        $('.content-web').show()
    })
    .fail(function(err){
        console.log(err)
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
/* show all news */

function showAll(){
    $.ajax({
        url : ('http://localhost:3000/news/show/crypto'),
        type : 'get',
        dataTypes : 'json'
    })
    .done(data => {
        // console.log(data)
        $.each(data.articles, (i, eachData) => {
            $('#list').append(`
            <div class="row">
                <div class="col s12 m7">
                <div class="card">
                    <div class="card-image">
                    <img src="${eachData.urlToImage}">
                    <span class="card-title">${eachData.title}</span>
                    </div>
                    <div class="card-content">
                    <h4> ${eachData.title} </h4>
                    <small>${eachData.author}</small>
                    <p> ${eachData.content} </p>
                    </div>
                    <div class="card-action">
                    <a href="${eachData.url}">This is a link</a>
                    </div>
                </div>
                </div>
            </div>
            `)
        })
    })
    .fail()
}

$(document).ready(function(){
    console.log('Ready')
    if(!localStorage.getItem('token')){
        $('.content-web').hide()
        $('.login').hide()
        $('#register-button').hide()
        $('#logout-button').hide()
    }
    else{
        $('.login').hide()
        $('.register').hide()
        $('#register-button').hide()
        $('#login-button').hide()
        $('#logout-button').show()
        $('.content-web').show()
        $('#search-result').hide()
        getCoinData()
        // showAll()
        // showNews()
    }
})


/* SHOW YOUTUBE VIDEOS */
function listVideo(coin) {
        $.ajax({
            method: "GET",
            url: `http://localhost:3000/youtube/${coin}`
        })
            .done(function(data) {
                console.log(data)
                let listVideos = ''
                let arr = data.items
                for(let i = 0; i <= arr.length-1; i++) {
                    let link = arr[i].id.videoId
                    let title = arr[i].snippet.title
                    let description = arr[i].snippet.description
                    let channel = arr[i].snippet.channelTitle
                    listVideos += `<div class="col-sm-3 card" style="width: 18rem;">
                    <iframe src="https://www.youtube.com/embed/${link}"></iframe>
                    <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${description}</p>
                    </div>
                    <input type ="submit" class="btn btn-primary saveVideo" style="width:50%;margin:auto;margin-bottom:10px;" value="Save Video">
                    </div>`
                }
    
                // <a href="https://www.youtube.com/watch?v=${link}" class="btn btn-primary">Watch on YouTube</a>
                $('.col-sm-3').remove()
                $('#videos').append(listVideos)
                saveVideo()
            })
            .fail(function(err) {
                console.log('test')
                // console.log(err)
            })
  
}

function saveVideo () {
    $('.saveVideo').click(function() {
        console.log('test')
    })
}