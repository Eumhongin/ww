
function loginForm(target) {
  const wrapper = $('<form>').addClass('loginForm').attr('action', 'javascript:tryLogin()').appendTo(target)
  const idinput = $('<input required>').addClass('loginFormId').attr({
    'type' : 'text',
    'name':'id',
    'placeholder' : '아이디를 입력하세요',
    'autocomplete' : 'off'
  }).appendTo(wrapper)
  const passinput = $('<input required>').addClass('loginFormPass').attr({
    'type' : 'password',
    'name': 'pass',
    'placeholder' : '비밀번호를 입력하세요',
    'autocomplete': 'off'
  }).appendTo(wrapper)
  const submitBtn = $('<button type="submit">').text('로그인').appendTo(wrapper)
}


function tryLogin(){
  const id = safetrim($('.loginFormId').val().trim())
  const password = safetrim($('.loginFormPass').val().trim())
  const email = id + '@workflow.com'
  auth.signInWithEmailAndPassword(email,password).then((user) => {
    let currentUser = auth.currentUser
    let name
    writelog(currentUser.email, currentUser.uid)
    
    database.ref(`/users/${currentUser.uid}/company/ceo`).once('value').then((snapshot) => {
      name = snapshot.val()
      $('head title').text('HeyFlow! - ' + name + '대표님')
      alert(`환영합니다 ${name}님!`)
    }).then(() => {
      travel('loginVC', 'workflowVC')
    })
    
    
    
  }).catch((error) => {
    console.log(error.code)
  })
  
  
}


function safetrim(str){
  return str.replace(/\s/g, "")
}

function writelog(email,uid){
  database.ref('user_log').once('value').then((snapshot) => {
    if (snapshot.exists()) {
      let count = snapshot.numChildren()
      let logObject = {
        [count]: {
          email : email,
          uid: uid,
          mode: '로그인',
          timestamp: Date.now()
        }
      }
      snapshot.ref.update(logObject)
    } else {
      let logObject = [{
        email: email,
        uid: uid,
        mode: '로그인',
        timestamp: Date.now()
      }]
      snapshot.ref.update(logObject)
    }
    
  })
  
  
}