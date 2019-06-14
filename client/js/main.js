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
    }
})