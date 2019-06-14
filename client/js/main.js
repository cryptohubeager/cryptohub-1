function generateApi(query){
    console.log(query)
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
        getCoinData()
    }
})