

const basicProtocol = ["loginView", "workflowView"] //뷰 들의 이름을 체크하는데 사용합니다.

let currentView, nextView

$(document).ready(function(){
  // 화면 전환하는 특정 이벤트가 들어오면 스크립트 갈기
  // wrapper 의 클래스가 바뀔때 마다 해야함.
  // 클래스만 따로 측정못하니까 wrppaer 가 바뀔때 실행해야함 -> 없음
  // 특정 이벤트를 에서 라우터를 부를때 invoke 사용해서 만들기
  // 이벤트 발생 -> travel
  addScript('workflowView', 'workflow')
  // setInterval(function () {
  //   travel(currentView,'loginView')
  //   $(documfent).attr('classㅈ')
  // }, 3000);
});





// Protocol : 화면전환하는 이벤트 발생시 반드시 실행해야함.
// 이벤트 발생
function travel(currentViewName,nextViewName){
  //travel currentView to NextView
  // remove CurrentView
  removeScript(currentViewName)
  // add NextView
  addScript(nextViewName)
}

function addScript(nextViewName) {
  if (basicProtocol.indexOf(nextViewName) !== -1) {
    currentView = nextViewName
    $(document).addClass(nextViewName)
    $(`<script src="./js/view/${nextViewName}.js">`).addClass(`${nextViewName}-script`).appendTo('body')
  } else {
    console.log(`약속에없는 뷰 이름입니다!\n현재 뷰 이름 : ${nextViewName}\n프로토콜내 뷰이름 : ${basicProtocol}`)
  }
  
}

function removeScript(currentViewName) {

  if (basicProtocol.indexOf(currentView) !== -1) {
    $(`.${currentViewName}-script`).remove()
    $(document).removeClass(currentViewName)
    $('.wrapper > *').remove()
    
  } else {
    console.log(`약속에없는 뷰 이름입니다!\n현재 뷰 이름 : ${nextViewName}\n프로토콜내 뷰이름 : ${basicProtocol}`)
  }
  
}
