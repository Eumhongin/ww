var saveColorId, SelectedCompany
var CompanyUidkey = new Object()

database.ref(`companylist`).once('value').then((snapshot) => {
  CompanyUidkey = snapshot.val()

})

// TODO : 기업 리스트 뽑아와서 파싱해줘야함 Initialization
function workflowWriteZone(target,token) {
  if (token === 1) {
    let wrapper = makeDiv('workflow-write-zone', target)
    let content = makeDiv('write-wrapper', wrapper)
    makeInputCell('시작하는 날짜', content, '2019-09-14', 'Start')
    makeInputCell('끝나는 날짜', content, '2019-09-14', 'Finish')
    makeInputCell('사용자 이름', content, '사용자의 이름을 입력해주세요', 'WorkerName')
    makeInputCell('제목', content, '제목을 입력해주세요', 'Title')
    makeTextareaCell('내용', content, '내용을 입력해주세요', 'Content')
    makeColorChip('색상', content)
    // makeCompanyList(content)
    makeSubmitButton('확인', content)
    
  }


}

function makeInputCell(title, target, placeholder, name) {
  let wrapper = makeDiv('write-cell input-cell', target)
  let left = makeDiv('title', wrapper)
  makeSpan('', left).text(title)
  let right = makeDiv('content', wrapper)
  $('<input placeholder="' + placeholder + '">')
    .attr('name', name)
    .appendTo(right)
}

function makeColorChip(title, target) {
  let wrapper = makeDiv('write-cell color-cell', target)
  let left = makeDiv('title', wrapper)
  makeSpan('', left).text(title)
  let right = makeDiv('content', wrapper)
  let chipwrapper = makeDiv('chips', right)
  for (let index = 0; index < colorList.length; index++) {
    makeDiv('chip chip-' + index, chipwrapper)
      .css({
        'background-color': colorList[index]
      })
      .attr('onclick', 'colorClick(this)')

  }

}

function colorClick(e) {
  let chipcolor = $(e).css("background-color")
  saveColorId = parseInt($(e).attr('class').split(" ")[1].split("-")[1])
  // console.log(saveColorId)
  $(e)
    .siblings()
    .removeClass('active')
  $('.submitbutton').css({
    'border': 'none',
    'background-color': chipcolor,
    'color': 'white'
  })
  $(e).addClass('active')
}

function makeTextareaCell(title, target, placeholder, name) {
  let wrapper = makeDiv('write-cell textarea-cell', target)
  let left = makeDiv('title', wrapper)
  makeSpan('', left).text(title)
  let right = makeDiv('content', wrapper)
  $('<textarea placeholder="' + placeholder + '">').attr("name", name).appendTo(right)
}

function makeSubmitButton(title, target) {
  $('<button>').addClass('submitbutton').attr('onclick', 'saveInformation(this)').appendTo(target).text(title)

}

function saveInformation(e) {
  let parent = $(e).parent();
  // TODO : XSS, variable split
  let StartDate = parent
    .find('input[name~="Start"]')
    .val()
    .trim()
    .split("-")
  let FinishDate = parent
    .find('input[name~="Finish"]')
    .val()
    .trim()
    .split("-")
  let WorkerName = parent
    .find('input[name~="WorkerName"]')
    .val()
  let title = parent
    .find('input[name~="Title"]')
    .val()
  let content = parent
    .find('textarea[name~="Content"]')
    .val()
  database.ref(`workflow/${CompanyUidkey[SelectedCompany]}`).once('value').then((snapshot) => {
      snapshot.ref.update({
          [snapshot.numChildren()]: {
            FinishDate: parseInt(FinishDate[2]),
            FinishMonth: parseInt(FinishDate[1]),
            FinishYear: parseInt(FinishDate[0]),
            title : title,
            comment: content,
            overhead: false,
            startDate: parseInt(StartDate[2]),
            startMonth: parseInt(StartDate[1]),
            startYear: parseInt(StartDate[0]),
            timestamp: Date.now(),
            color: saveColorId,
            workerName: WorkerName
          }
        })
    })
    // end update
    parent.find('input').val("")
    parent.find('textarea').val("")
    parent.find('.active').removeClass('active')
    $(e).removeAttr('style')
}