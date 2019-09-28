const MasterView = $('.wrapper')
let currentView,
    nextView

$(document).ready(function () {
  
    // 화면 전환하는 특정 이벤트가 들어오면 스크립트 갈기 wrapper 의 클래스가 바뀔때 마다 해야함. 클래스만 따로 측정못하니까
    // wrappaer 가 바뀔때 실행해야함 -> 없음 특정 이벤트를 에서 라우터를 부를때 invoke 사용해서 만들기 이벤트 발생 ->
    // travel console.log(Components)
    addScript('loginVC')
});

// Protocol : 화면전환하는 이벤트 발생시 반드시 실행해야함. 이벤트 발생
function travel(currentViewName, nextViewName) {
    //travel currentView to NextView remove CurrentView
    removeScript(currentViewName)
    // add NextView
    addScript(nextViewName)
}

function removeScript(currentViewName) {

    if (Views.indexOf(currentView) !== -1) {
        $(`.${currentViewName}-script`).remove()
        // currentView에 해당하는 Components 들 다 지워줘야댐.
        removeComponents(currentView)
        $('body').removeClass(currentViewName)
        $('.wrapper > *').remove()
    } else {
        error(currentViewName)
    }

}

function addScript(nextViewName) {
    if (Views.indexOf(nextViewName) !== -1) {
        currentView = nextViewName
        $('body').addClass(nextViewName)
        addComponents(nextViewName)
        $(`<script src="./views/${nextViewName}/index.js">`)
            .addClass(`${nextViewName}-script`)
            .appendTo('body')
        
    } else {
        error(nextViewName)
    }

}

function addComponents(TargetViewName) {
    if (Views.indexOf(TargetViewName) !== -1) {
        for (let idx = 0; idx < Components[TargetViewName].length; idx++) {
            const element = Components[TargetViewName][idx];
            $(`<script src="./views/${TargetViewName}/components/${element}.js">`)
                .addClass(`${element}-script`)
                .appendTo('body')
        }
    } else {
        error(TargetViewName)
    }
}

function removeComponents(TargetViewName) {
    if (Views.indexOf(TargetViewName) !== -1) {
        for (let idx = 0; idx < Components[TargetViewName].length; idx++) {
            const element = Components[TargetViewName][idx];
            $(`.${element}-script`).remove()
        }
        
    } else {
        error(TargetViewName)
    }
}


function error(view){
  console.table(`약속에없는 뷰 이름입니다!\n현재 뷰 이름 : ${view}\n프로토콜내 뷰이름`)
  console.table(Views)
}