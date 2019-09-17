let colorList = [
    '#051A3B',
    '#0A4CC1',
    '#379DEF',
    '#9AD1F7',
    '#6E7D75',
    '#826A5F',
    '#CE7870',
    '#ECBCB0',
    '#EBA966',
    '#ed872d'
]
var saveColorId
let scheme = {}


// let testscheme = {
//     "work": [{
//         "FinishDate": 30,
//         "FinishMonth": 9,
//         "FinishYear": 2019,
//         "color": "#008cff",
//         // "title" : "코틀린 공부",
//         "comment": "코틀린 공부",
//         "overhead": false,
//         "startDate": 16,
//         "startMonth": 9,
//         "startYear": 2019,
//         "timestamp": 1568612924362,
//         "workerID": 0,
//         "workerName": "남현재"
//     }, {
//         "FinishDate": 18,
//         "FinishMonth": 9,
//         "FinishYear": 2019,
//         "color": "#9747ff",
//         // "title": "스위프트 공부",
//         "comment": "못다한 시스템뷰들 스위프트 공부",
//         "overhead": false,
//         "startDate": 16,
//         "startMonth": 9,
//         "startYear": 2019,
//         "timestamp": 1568612924362,
//         "workerID": 1,
//         "workerName": "박준우"
//     }, {
//         "FinishDate": 23,
//         "FinishMonth": 9,
//         "FinishYear": 2019,
//         "color": "#9747ff",
//         "comment": "API 랑 네트워크 통신관련해서 스위프트 공부",
//         "overhead": false,
//         "startDate": 19,
//         "startMonth": 9,
//         "startYear": 2019,
//         "timestamp": 1568612924362,
//         "workerID": 1,
//         "workerName": "박준우"
//     }, {
//         "FinishDate": 26,
//         "FinishMonth": 9,
//         "FinishYear": 2019,
//         "color": "#9747ff",
//         "comment": "관리자 페이지 일부 레이아웃(헤더, 컨텐츠 타이틀 및 버튼)",
//         "overhead": false,
//         "startDate": 25,
//         "startMonth": 9,
//         "startYear": 2019,
//         "timestamp": 1568612924362,
//         "workerID": 1,
//         "workerName": "박준우"
//     }, {
//         "FinishDate": 28,
//         "FinishMonth": 9,
//         "FinishYear": 2019,
//         "color": "#9747ff",
//         "comment": "관리자 페이지 헤더 css 및 animation",
//         "overhead": false,
//         "startDate": 26,
//         "startMonth": 9,
//         "startYear": 2019,
//         "timestamp": 1568612924362,
//         "workerID": 1,
//         "workerName": "박준우"
//     }, {
//         "FinishDate": 30,
//         "FinishMonth": 9,
//         "FinishYear": 2019,
//         "color": "#9747ff",
//         "comment": "관리자 페이지 타이틀 및 버튼부분 css 및 animation",
//         "overhead": false,
//         "startDate": 28,
//         "startMonth": 9,
//         "startYear": 2019,
//         "timestamp": 1568612924362,
//         "workerID": 1,
//         "workerName": "박준우"
//     }, {
//         "FinishDate": 21,
//         "FinishMonth": 9,
//         "FinishYear": 2019,
//         "color": "#04a339",
//         "comment": "로그인 세션부터 전반적인 백엔드",
//         "overhead": false,
//         "startDate": 16,
//         "startMonth": 9,
//         "startYear": 2019,
//         "timestamp": 1568612924362,
//         "workerID": 2,
//         "workerName": "유동률"
//     }, {
//         "FinishDate": 23,
//         "FinishMonth": 9,
//         "FinishYear": 2019,
//         "color": "#04a339",
//         "comment": "firebase function, firestore Documentation 연습",
//         "overhead": false,
//         "startDate": 21,
//         "startMonth": 9,
//         "startYear": 2019,
//         "timestamp": 1568612924362,
//         "workerID": 2,
//         "workerName": "유동률"
//     }, {
//         "FinishDate": 30,
//         "FinishMonth": 9,
//         "FinishYear": 2019,
//         "color": "#04a339",
//         "comment": "로그구현 timestamp, UTCDate, 이메일, 이름, 업체이름, 모드",
//         "overhead": false,
//         "startDate": 23,
//         "startMonth": 9,
//         "startYear": 2019,
//         "timestamp": 1568612924362,
//         "workerID": 2,
//         "workerName": "유동률"
//     }, {
//         "FinishDate": 25,
//         "FinishMonth": 9,
//         "FinishYear": 2019,
//         "color": "#9747ff",
//         "comment": "파이어베이스 디비 연동",
//         "overhead": false,
//         "startDate": 24,
//         "startMonth": 9,
//         "startYear": 2019,
//         "timestamp": 1568612924362,
//         "workerID": 1,
//         "workerName": "박준우"
//     }]
// }


let workingPeople

$(document).ready(function () {
    let date = new Date()
    let result = calculateCalendar(2019, 1, 1, date.getFullYear(), date.getMonth() + 1, date.getDate())
    let target = $('.wrapper')
    workflowWriteZone(target)
    database
        .ref('work')
        .on('value', (snapshot) => {
            console.log($('.workflow').length)
            if ($('.workflow').length !== 0) {
                console.log('remove!')
                $('.workflow').remove()
            }
            scheme = snapshot.val()
            workingPeople = Object
                .keys(scheme)
                .length
            // console.log(scheme)
            workflowNameSpace(target)
            workflowlayout(target)
            $(window).scroll(function () {
                $('.flow-top').css({
                    'transform': `translateX(-${$(window).scrollLeft()}px)`
                })
                $('.workflowNameSpace').css({
                    'top': 54 - $(window).scrollTop() + 'px'
                })
            })
            $('.flow-top').css({
                'transform': `translateX(-${ 48 * (result - 5)}px)`
            })
            $(window).scrollLeft(48 * (result - 5))

        })
});

function workflowWriteZone(target) {
    let wrapper = makeDiv('workflow-write-zone', target)
    let content = makeDiv('write-wrapper', wrapper)
    makeInputCell('시작하는 날짜', content, '2019-09-14','Start')
    makeInputCell('끝나는 날짜', content, '2019-09-14','Finish')
    makeInputCell('사용자 이름', content, '사용자의 이름을 입력해주세요', 'WorkerName')
    // makeInputCell('제목', content, '제목을 입력해주세요','Title')
    makeColorChip('색상', content)
    makeTextareaCell('내용', content, '내용을 입력해주세요','Content')
    makeSubmitButton('확인', content)

}

function makeInputCell(title, target, placeholder,name) {
    let wrapper = makeDiv('write-cell input-cell', target)
    let left = makeDiv('title', wrapper)
    makeSpan('', left).text(title)
    let right = makeDiv('content', wrapper)
    $('<input placeholder="' + placeholder + '">').attr('name',name).appendTo(right)
}
function makeColorChip(title, target) {
    let wrapper = makeDiv('write-cell color-cell', target)
    let left = makeDiv('title', wrapper)
    makeSpan('', left).text(title)
    let right = makeDiv('content', wrapper)
    let chipwrapper = makeDiv('chips', right)
    for (let index = 0; index < colorList.length; index++) {
        makeDiv('chip chip-'+index, chipwrapper).css({'background-color': colorList[index]}).attr('onclick','colorClick(this)')

    }

}

function colorClick(e){
    let chipcolor = $(e).css("background-color")
    saveColorId = parseInt($(e).attr('class').split(" ")[1].split("-")[1])
    console.log(saveColorId)
    $(e).siblings().removeClass('active')
    $('.submitbutton').css({
        'border' : 'none',
        'background-color' : chipcolor,
        'color' : 'white'

    })
    $(e).addClass('active')
}
function makeTextareaCell(title, target, placeholder,name) {
    let wrapper = makeDiv('write-cell textarea-cell', target)
    let left = makeDiv('title', wrapper)
    makeSpan('', left).text(title)
    let right = makeDiv('content', wrapper)
    $('<textarea placeholder="' + placeholder + '">').attr("name",name).appendTo(right)
}
function makeSubmitButton(title, target) {
    $('<button>')
        .addClass('submitbutton')
        .attr('onclick', 'saveInformation(this)')
        .appendTo(target)
        .text(title)

}
function saveInformation(e) {
    let parent = $(e).parent();
    // TODO : XSS, variable split
    let StartDate = parent.find('input[name~="Start"]').val().trim().split("-")
    let FinishDate = parent.find('input[name~="Finish"]').val().trim().split("-")
    let WorkerName = parent.find('input[name~="WorkerName"]').val()
    let title = parent.find('input[name~="Title"]').val()
    let content = parent.find('textarea[name~="Content"]').val()
    
    // if (WorkerName === '남현재') {
    //     saveColorId = 0
    // } else if (WorkerName === '박준우') {
    //     saveColorId = 1
    // } else {
    //     saveColorId = 2
    // }

    console.log(StartDate)
    console.log(FinishDate)
    console.log(title)
    console.log(content)
    console.log(saveColorId)
    
    database
        .ref('work')
        .once('value')
        .then((snapshot) => {
            // snapshot.numChildren()
            snapshot
                .ref
                .update({
                    [snapshot.numChildren()]: {
                        FinishDate: parseInt(FinishDate[2]),
                        FinishMonth: parseInt(FinishDate[1]),
                        FinishYear: parseInt(FinishDate[0]),
                        color: "#008cff",
                        comment: content,
                        overhead: false,
                        startDate: parseInt(StartDate[2]),
                        startMonth: parseInt(StartDate[1]),
                        startYear: parseInt(StartDate[0]),
                        timestamp: Date.now(),
                        workerID: saveColorId,
                        workerName: WorkerName
                    }
                })
        })
}

function workflowNameSpace(target) {
    let sortedworklist = sortWorkList(scheme)
    console.log(sortedworklist)
    let wrapper = makeDiv('workflowNameSpace', target).css({
        'height': (workingPeople) * 54 + 'px'
    })
    for (let index = 0; index < workingPeople; index++) {

        let flowWrapper = makeDiv(`workflow-line flow-${index}`, wrapper).css({
            'border-right': `6px solid ${colorList[scheme[sortedworklist[index][1]].workerID]}`
        })
        makeSpan('', flowWrapper).text(scheme[sortedworklist[index][1]].workerName)
        $('<hr>').appendTo(wrapper)
    }
}

function workflowlayout(target) {
    // TODO : 워크 플로우 상단 만들기, 워크플로우 좌측 만들기. 워크플로우 입력칸 만들기

    let wrapper = makeDiv('workflow', target).css({
        'width': 48 * 365 + 'px'
    })

    // 상단 .
    let flowWrapper = makeDiv(`flow-top`, target)
    let dateWrapper = makeDiv('dateline', flowWrapper)
    let date = [
        31,
        28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
    ]
    for (let index = 0; index < date.length; index++) {
        for (let a = 0; a < date[index]; a++) {
            if (a === 0) {
                makeDiv('cell', dateWrapper).text(`${index + 1}/${a + 1}`)
            } else {

                makeDiv('cell', dateWrapper).text(a + 1)
            }
            // makeDiv('cell', dateWrapper).text(`${index +1 }/${a + 1}`)
        }

    }
    // 메인플로우
    let sortedworklist = sortWorkList(scheme)
    for (let index = 0; index < workingPeople; index++) {
        let targetidx = scheme[sortedworklist[index][1]]
        let flowWrapper = makeDiv(`workflow-line flow-${index}`, wrapper)
        let dateWrapper = makeDiv('dateline', flowWrapper)
        for (let index = 0; index < 365; index++) {
            makeDiv('cell', dateWrapper)

        }

        let result = calculateCalendar(targetidx.startYear, targetidx.startMonth, targetidx.startDate, targetidx.FinishYear, targetidx.FinishMonth, targetidx.FinishDate)
        console.log(colorList[targetidx.workerID]);

        let flow = makeDiv('flow', flowWrapper).css({
            'width': result * 48 + 48 + 'px',
            'background-color': colorList[targetidx.workerID],
            'left': calculateCalendar(2019, 1, 1, targetidx.startYear, targetidx.startMonth, targetidx.startDate) * 48 + 'px' // TODO : 기준날짜 잡아서 거기서부터 left넣기.
        })
        makeDiv('flowTitle', flow).css({
            'width': flow.outerWidth() + 'px'
        }).text(targetidx.comment)
    }

}

function calculateCalendar(SY, SM, SD, FY, FM, FD) {
    if (String(SM).length === 1) {
        SM = '0' + String(SM)
    }
    if (String(FM).length === 1) {
        FM = '0' + String(FM)
    }
    if (String(SD).length === 1) {
        SD = '0' + String(SD)
    }
    if (String(FD).length === 1) {
        FD = '0' + String(FD)
    }
    // console.log(SM)

    let f = Date.parse(`${SY}-${SM}-${SD}`)
    let g = Date.parse(`${FY}-${FM}-${FD}`)
    // console.log(f - g)

    return (g - f) / 1000 / 86400

}

function sortWorkList(worklist) {
    // 순서대로 정렬
    var temp = [];
    var tempcell = []

    for (let index = 0; index < Object.keys(worklist).length; index++) {
        const element = worklist[index];

        tempcell.push(simpleDateParse(element))
        tempcell.push(index)
        temp.push(tempcell)
        tempcell = []

        // console.log(temp)

    }

    for (let index = 0; index < temp.length; index++) {
        for (let index2 = index; index2 < temp.length; index2++) {
            if (temp[index][0] > temp[index2][0]) {

                var t = temp[index]
                temp[index] = temp[index2]
                temp[index2] = t

            }

        }

    }

    return temp
    // 긴게 뒤로

}

function simpleDateParse(FullDate) {
    let year = FullDate.startYear
    let month = FullDate.startMonth
    let date = FullDate.startDate
    if (String(month).length === 1) {
        month = '0' + String(month)
    }
    if (String(date).length === 1) {
        date = '0' + String(date)
    }

    return Date.parse(`${year}-${month}-${date}`)
}

// function partition(array, left, right, pivotIndex) { // 정렬하는 부분     var temp;
//     var pivot = array[pivotIndex];     while (left <= right) { // 왼쪽, 오른쪽 수를
// 규칙과 비교해 다음 수로 넘어갑니다.         while (array[left] < pivot)             left++;
//        while (array[right] > pivot)             right--;         if (left <=
// right) { // 왼쪽이 기준보다 크고, 오른쪽이 기준보다 작으면             temp = array[left];
//      array[left] = array[right];             array[right] = temp; // 서로
// 바꿔줍니다.             left++;             right--;         }     }     temp =
// array[left];     array[left] = array[pivotIndex];     array[pivotIndex] =
// temp; // 마지막으로 기준과 만난 수를 바꿔줍니다. 기준의 위치는 이제 i입니다.     return left; }; function
// quickSort(array, left, right) { // 재귀하는 부분     if (!left) left = 0;     if
// (!right) right = array.length - 1;     var pivotIndex = right; // 배열 가장 오른쪽의
// 수를 기준으로 뽑습니다.     pivotIndex = partition(array, left, right - 1, pivotIndex);
// // right - 1을 하는 이유는 기준(현재 right)을 제외하고 정렬하기 위함입니다.     if (left < pivotIndex
// - 1)         quickSort(array, left, pivotIndex - 1); // 기준 왼쪽 부분 재귀     if
// (pivotIndex + 1 < right)         quickSort(array, pivotIndex + 1, right); //
// 기준 오른쪽 부분 재귀     return array; };