database.ref(`users/${auth.currentUser.uid}`).once('value').then((snapshot) => {
  if (snapshot.exists()) {
    const token = snapshot.val().accesslvl
      workflowWriteZone(MasterView,token)
      
      // flowModalStart(MasterView, token)
  } else {
    alert('등록되지 않은 사용자입니다.')
    return
    // TODO : write error
    // database.ref(`error_log/users/${auth.currentUser.uid}`).update()
  }
})

flowStart(MasterView)
flowModalStart(MasterView)


// if (auth.currentUser.email === 'zizon0wpxm@workflow.com') {
//   workflowWriteZone(MasterView)
//   // admintap(MasterView)
// }