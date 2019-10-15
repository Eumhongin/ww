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
var workingPeople
let scheme = {}

const date = new Date()
const TodayTimeStamp = calculateCalendar(2019, 1, 1, date.getFullYear(), date.getMonth() + 1, date.getDate())


function flowStart(target) {
  let uid = auth.currentUser.uid

  database.ref(`workflow/${uid}`).on('value', (snapshot) => {
    if (snapshot.exists()) {
      // 원래 기존에 있던거 지우고
      if ($('.workflow').length !== 0) {
        //  console.log('remove!')
        $('.flow-top').remove()
        $('.workflow').remove()
        $('.workflowNameSpace').remove()
      }
      // 스키마 에다가 데이터를 저장하고
      scheme = snapshot.val()

      // 일하는 사람들 다 저장하고
      workingPeople = Object.keys(scheme).length
      // console.log(scheme)
      // 일하는 사람들 이름 부분 시작
      // workflowcompany(target)
      workflowNameSpace(target)
      workflowlayout(target)
      // 스크롤시에 행동하는 액션
      $(window).scroll(function () {
        $('.flow-top').css({
          'transform': `translateX(-${$(window).scrollLeft()}px)`
        })
        $('.workflowNameSpace').css({
          'top': 179 - $(window).scrollTop() + 'px'
        })
      })
      // 기간에 맞게 날짜를 옮겨줌
      $('.flow-top').css({
        'transform': `translateX(-${ 48 * (TodayTimeStamp - 5)}px)`
      })
      // 기간에 맞게 스크롤을 옮겨줌
      $(window).scrollLeft(48 * (TodayTimeStamp - 5))
    } else {
      console.log('정보가 없습니다.')
    }


  })
  workflowcompany(target)
}

function workflowcompany(target){
  // let companylist = []
 
  const wrapper = makeDiv('companyWrapper',target)
  const background = makeDiv('companyMenuBackground',wrapper)
  const menu = makeDiv('companyMenu',wrapper)
  
  const selectedCompany = makeDiv('selectedCompany', wrapper)
  if (auth.currentUser.displayName === '김윤경,김다영') {
    selectedCompany.attr('onclick', 'showCompany(this)')
  } else {
    selectedCompany.addClass('client')
  }
  

   database.ref('displayCompanyList').once('value').then((snapshot) => {
     
     if (snapshot.exists()) {
      //  let count = 1
       snapshot.forEach((item) => {
         
        //  companylist.push(item.val().CompanyName)
         if (item.val().uid === auth.currentUser.uid) {
           selectedCompany.addClass(item.val().CompanyName).text(item.val().CompanyName)
           SelectedCompany = item.val().CompanyName
         }else{
           makeDiv(`companylist ${item.val().CompanyName}`, menu).text(item.val().CompanyName).attr('onclick','changeCompany(this)')
           
          //  count += 1
          //  console.log(count)
         }
         
       })
     } else {
       console.log("회사들의 이름을 가져오는데 실패했습니다.")
       return
     }
   })

   

}

function showCompany(e) {
  let companylist = []
  if ($('.companyWrapper').hasClass('companyactive')) {
    $('.companyWrapper').removeClass('companyactive')
    $('.workflowNameSpace').removeClass('killzidx')
    $('.flow-top').removeClass('killzidx')
    // $('.companylist').remove()
    setTimeout(function () {
      $('.companyWrapper').removeAttr('style')
    }, 300);
  } else {
    database.ref('displayCompanyList').once('value').then((snapshot) => {

      if (snapshot.exists()) {

        snapshot.forEach((item) => {

          //  companylist.push(item.val().CompanyName)
          if (item.val().CompanyName !== $('.selectedCompany').text()) {
           companylist.push(item.val().CompanyName)
          }

        })
        

      } else {
        console.log("회사들의 이름을 가져오는데 실패했습니다.")
        return
      }
    }).then(() => {
      console.log(companylist)
      $('.companylist').each((index, el) => { 
         $(el).text(companylist[index])
      });
      $('.companyWrapper').addClass('companyactive')

      $('.workflowNameSpace').addClass('killzidx')
      $('.flow-top').addClass('killzidx')
      setTimeout(function () {
        $('.companyWrapper').css({
          'transition': 'all ease-in-out 0.3s',
          'transition-delay': '0.3s'
        })
      }, 300);
    })
    
  }
}


function changeCompany(e){
  SelectedCompany = $(e).text()
  $('.selectedCompany').text($(e).text())
  $('.companyWrapper').removeClass('companyactive')
  $('.workflowNameSpace').removeClass('killzidx')
  $('.flow-top').removeClass('killzidx')
  // $('.companylist').remove()
  setTimeout(function () {
    $('.companyWrapper').removeAttr('style')
  }, 300);
  const target = MasterView
  database.ref(`workflow/${CompanyUidkey[SelectedCompany]}`).on('value', (snapshot) => {
    if (snapshot.exists()) {
      // 원래 기존에 있던거 지우고
      if ($('.workflow').length !== 0) {
        //  console.log('remove!')
        $('.flow-top').remove()
        $('.workflow').remove()
        $('.workflowNameSpace').remove()
      }
      // 스키마 에다가 데이터를 저장하고
      scheme = snapshot.val()

      // 일하는 사람들 다 저장하고
      workingPeople = Object.keys(scheme).length
      // console.log(scheme)
      // 일하는 사람들 이름 부분 시작
      // workflowcompany(target)
      workflowNameSpace(target)
      workflowlayout(target)
      // 스크롤시에 행동하는 액션
      $(window).scroll(function () {
        $('.flow-top').css({
          'transform': `translateX(-${$(window).scrollLeft()}px)`
        })
        $('.workflowNameSpace').css({
          'top': 179 - $(window).scrollTop() + 'px'
        })
      })
      // 기간에 맞게 날짜를 옮겨줌
      $('.flow-top').css({
        'transform': `translateX(-${ 48 * (TodayTimeStamp - 5)}px)`
      })
      // 기간에 맞게 스크롤을 옮겨줌
      $(window).scrollLeft(48 * (TodayTimeStamp - 5))
    } else {
      console.log('정보가 없습니다.')
    }


  })

}



function workflowNameSpace(target) {
  let sortedworklist = sortWorkList(scheme)

  let wrapper = makeDiv('workflowNameSpace', target).css({
    'height': (workingPeople) * 54 + 'px'
  })
  for (let index = 0; index < workingPeople; index++) {

    let flowWrapper = makeDiv(`workflow-line flow-${index}`, wrapper).css({
      'border-right': `6px solid ${colorList[scheme[sortedworklist[index][1]].color]}`
    })
    makeSpan('', flowWrapper).text(scheme[sortedworklist[index][1]].workerName)
    $('<hr>').appendTo(wrapper)
  }
}

function workflowlayout(target) {

  let wrapper = makeDiv('workflow', target).css({
    'width': 48 * 365 + 'px'
  })
  flowtop(target)
  flowmain(wrapper)

}


function flowtop(target) {
  // 상단 .
  let flowWrapper = makeDiv(`flow-top`, target)
  let dateWrapper = makeDiv('dateline', flowWrapper)
  let Current = {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate()
  }

  let MonthlyDate = [
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
  for (let index = 0; index < MonthlyDate.length; index++) {
    for (let a = 0; a < MonthlyDate[index]; a++) {
      if (a === 0) {
        if (index === Current.month && a === Current.date - 1) {
          makeDiv('cell today', dateWrapper).text(`${index + 1}/${a + 1}`)
        } else {
          makeDiv('cell', dateWrapper).text(`${index + 1}/${a + 1}`)

        }
      } else {
        if (index === Current.month && a === Current.date - 1) {
          makeDiv('cell today', dateWrapper).text(a + 1)
        } else {
          makeDiv('cell', dateWrapper).text(a + 1)
        }
      }

    }

  }
}

function flowmain(target) {
  // 메인플로우
  let sortedworklist = sortWorkList(scheme)
  for (let index = 0; index < workingPeople; index++) {
    let targetidx = scheme[sortedworklist[index][1]]
    let flowWrapper = makeDiv(`workflow-line flow-${index}`, target)
    let dateWrapper = makeDiv('dateline', flowWrapper)
    for (let index = 0; index < 365; index++) {
      makeDiv('cell', dateWrapper)
    }

    let result = calculateCalendar(targetidx.startYear, targetidx.startMonth, targetidx.startDate, targetidx.FinishYear, targetidx.FinishMonth, targetidx.FinishDate)

    let flow = makeDiv('flow', flowWrapper).css({
      'width': result * 48 + 48 + 'px',
      'background-color': colorList[targetidx.color],
      'left': calculateCalendar(2019, 1, 1, targetidx.startYear, targetidx.startMonth, targetidx.startDate) * 48 + 'px'
    }).attr({
      'onclick':'modal(this)',
    }).data({
      'title': targetidx.title,
      'subtitle': targetidx.workerName,
      'comment': targetidx.comment
    })
    makeDiv('flowTitle', flow).css({
      'width': flow.outerWidth() + 'px'
    }).text(targetidx.title)
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


  let f = Date.parse(`${SY}-${SM}-${SD}`)
  let g = Date.parse(`${FY}-${FM}-${FD}`)


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
