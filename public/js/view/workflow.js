// 일의 갯수
let workingPeople = 3

let scheme = {
    0: {
        startYear: 2019,
        startMonth: 9,
        startDate: 16,
        FinishYear: 2019,
        FinishMonth: 10,
        FinishDate: 2,
        color: '#ff4800',
        comment: "hello world!",
        workerID: "fa48ss55d165f6w41d",
        workerName: "엄홍인",
        overhead: true,
        timestamp: Date.now()
    },
    1: {
        startYear: 2019,
        startMonth: 9,
        startDate: 9,
        FinishYear: 2019,
        FinishMonth: 9,
        FinishDate: 22,
        color: '#e2e2e2',
        comment: "hello world!",
        workerID: "654sfd65f16qe1vqwe",
        workerName: "박준우",
        overhead: false,
        timestamp: Date.now()
    },
    2: {
        startYear: 2019,
        startMonth: 9,
        startDate: 24,
        FinishYear: 2019,
        FinishMonth: 9,
        FinishDate: 30,
        color: '#fc51f2',
        comment: "hello world!",
        workerID: "qq115f5w3q515f151we",
        workerName: "유동률",
        overhead: false,
        timestamp: Date.now()
    }
}
// let f = Date.parse('2009 02 13')
// let g = Date.parse('2009 02 14')
// console.log(g-f);

// console.log(Date.parse('2009 02 13 00:00:00'))
// console.log(Date.parse('2009 02 14 00:00:00'))

$(document).ready(function () {
    console.log(scheme)
    let target = $('.wrapper')
    workflowlayout(target)
});


function workflowlayout(target) {
    // TODO : 워크 플로우 상단 만들기, 워크플로우 좌측 만들기. 워크플로우 입력칸 만들기, 날짜별로 정렬해서 파싱할것.
    let wrapper = makeDiv('workflow', target).css({
        'width' : 48 * 365 + 'px'
    })
    for (let index = 0; index < workingPeople; index++) {
        let flowWrapper = makeDiv(`workflow-line flow-${index}`, wrapper)
        let dateWrapper = makeDiv('dateline',flowWrapper)
        for (let index = 0; index < 365; index++) {
            makeDiv('cell',dateWrapper)
            
        }
        let result = calculateCalendar(scheme[index].startYear, scheme[index].startMonth, scheme[index].startDate, scheme[index].FinishYear, scheme[index].FinishMonth, scheme[index].FinishDate)
        makeDiv('flow', flowWrapper).css({
            'width': result * 48 + 'px',
            'background-color': scheme[index].color,
            'left': '48px' // TODO : 기준날짜 잡아서 거기서부터 left넣기.
        })




    }
}

function calculateCalendar(SY, SM, SD, FY, FM, FD) {
    let f = Date.parse(`${SY} ${SM} ${SD}`)
    let g = Date.parse(`${FY} ${FM} ${FD}`)
    return (g - f) / 1000 / 86400

}