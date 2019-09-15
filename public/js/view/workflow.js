// 일의 갯수
let workingPeople = 4

let scheme = {
    0: {
        startYear: 2019,
        startMonth: 9,
        startDate: 16,
        FinishYear: 2019,
        FinishMonth: 10,
        FinishDate: 2,
        color: '#ff4800',
        comment: "ad!",
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
        comment: "hedld!",
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
        comment: "helsld!",
        workerID: "qq115f5w3q515f151we",
        workerName: "유동률",
        overhead: false,
        timestamp: Date.now()
    },
    3: {
        startYear: 2019,
        startMonth: 8,
        startDate: 24,
        FinishYear: 2019,
        FinishMonth: 8,
        FinishDate: 30,
        color: '#52c2ff',
        comment: "hello world!",
        workerID: "qq115f5w3q515f151we",
        workerName: "유동",
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
    // TODO : 워크 플로우 상단 만들기, 워크플로우 좌측 만들기. 워크플로우 입력칸 만들기
    let sortedworklist = sortWorkList(scheme)
    let wrapper = makeDiv('workflow', target).css({
        'width' : 48 * 365 + 'px'
    })
    // 상단 .
    let flowWrapper = makeDiv(`workflow-line flow-top`, wrapper)
    let dateWrapper = makeDiv('dateline', flowWrapper)
    let date = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    for (let index = 0; index < date.length; index++) {
        for (let a = 0; a < date[index]; a++) {
            // if (a === 0) {
            //     makeDiv('cell', dateWrapper).text(`${index +1 }/${a + 1}`)
            // } else {

            //     makeDiv('cell', dateWrapper).text(a+1)
            // }
            makeDiv('cell', dateWrapper).text(`${index +1 }/${a + 1}`)
        }
        
    }
    // 메인플로우
    for (let index = 0; index < workingPeople; index++) {
        let flowWrapper = makeDiv(`workflow-line flow-${index}`, wrapper)
        let dateWrapper = makeDiv('dateline',flowWrapper)
        for (let index = 0; index < 365; index++) {
            makeDiv('cell',dateWrapper)
            
        }
        let result = calculateCalendar(scheme[index].startYear, scheme[index].startMonth, scheme[index].startDate, scheme[index].FinishYear, scheme[index].FinishMonth, scheme[index].FinishDate)
        console.log((Date.parse(`${scheme[sortedworklist[index][1]].startYear} ${scheme[sortedworklist[index][1]].startMonth} ${scheme[sortedworklist[index][1]].startDate}`)))
        makeDiv('flow', flowWrapper).css({
            'width': result * 48 + 'px',
            'background-color': scheme[sortedworklist[index][1]].color,
            'left': calculateCalendar(2019, 1, 1, scheme[sortedworklist[index][1]].startYear, scheme[sortedworklist[index][1]].startMonth, scheme[sortedworklist[index][1]].startDate) * 48 +
            'px' // TODO : 기준날짜 잡아서 거기서부터 left넣기.
        }).text(scheme[sortedworklist[index][1]].comment)
    }
    
    
}

function calculateCalendar(SY, SM, SD, FY, FM, FD) {
    let f = Date.parse(`${SY} ${SM} ${SD}`)
    let g = Date.parse(`${FY} ${FM} ${FD}`)
    return (g - f) / 1000 / 86400

}

function sortWorkList(worklist){
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



function simpleDateParse(FullDate){
    return Date.parse(`${FullDate.startYear} ${FullDate.startMonth} ${FullDate.startDate}`)
}

// function partition(array, left, right, pivotIndex) { // 정렬하는 부분
//     var temp;
//     var pivot = array[pivotIndex];
//     while (left <= right) { // 왼쪽, 오른쪽 수를 규칙과 비교해 다음 수로 넘어갑니다.
//         while (array[left] < pivot)
//             left++;
//         while (array[right] > pivot)
//             right--;
//         if (left <= right) { // 왼쪽이 기준보다 크고, 오른쪽이 기준보다 작으면
//             temp = array[left];
//             array[left] = array[right];
//             array[right] = temp; // 서로 바꿔줍니다.
//             left++;
//             right--;
//         }
//     }
//     temp = array[left];
//     array[left] = array[pivotIndex];
//     array[pivotIndex] = temp; // 마지막으로 기준과 만난 수를 바꿔줍니다. 기준의 위치는 이제 i입니다.
//     return left;
// };

// function quickSort(array, left, right) { // 재귀하는 부분
//     if (!left) left = 0;
//     if (!right) right = array.length - 1;
//     var pivotIndex = right; // 배열 가장 오른쪽의 수를 기준으로 뽑습니다.
//     pivotIndex = partition(array, left, right - 1, pivotIndex); // right - 1을 하는 이유는 기준(현재 right)을 제외하고 정렬하기 위함입니다.
//     if (left < pivotIndex - 1)
//         quickSort(array, left, pivotIndex - 1); // 기준 왼쪽 부분 재귀
//     if (pivotIndex + 1 < right)
//         quickSort(array, pivotIndex + 1, right); // 기준 오른쪽 부분 재귀
//     return array;
// };