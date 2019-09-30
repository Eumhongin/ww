function flowModalStart(target){
  const wrapper = makeDiv('modalWrapper',target)

  const label = makeDiv('modalLabel',wrapper)
  const content = makeDiv('modalContent',wrapper)

  const title = makeDiv('title',content)
  const subtitle = makeDiv('subtitle',content)
  const hr = makeDiv('hr',content)
  const text = makeDiv('content',content)
}

function modal(e){
  const data = $(e).data()
  const flowContent = $(e).find('.flowTitle').text()
  if ($(e).hasClass('active')) { //같은 플로우 클릭시
    if ($('.modalWrapper').hasClass('modalactive')) { // 모달이 열려있으면

      $('.modalWrapper').removeClass('modalactive')

      $('.modalContent .title').text("")
      $('.modalContent .subtitle').text("")
      $('.modalContent .content').text("")

      $('.modalLabel').removeAttr('style')
    } else { // 모달이 닫혀있으면

      $('.modalWrapper').addClass('modalactive')

      $('.modalContent .title').text(data.title)
      $('.modalContent .subtitle').text(data.subtitle)
      $('.modalContent .content').text(data.comment)

      $('.modalLabel').css({
        'background-color': $(e).css('background-color')
      })
    }
  } else { // 다른 플로우 클릭시
    $('.flow').removeClass('active')
    $(e).addClass('active')
    $('.modalWrapper').addClass('modalactive')

    $('.modalContent .title').text(data.title)
    $('.modalContent .subtitle').text(data.subtitle)
    $('.modalContent .content').text(data.comment)


    $('.modalLabel').css({
      'background-color': $(e).css('background-color')
    })
  }
  
  
  
}

// 모달 프로세싱

/**
 플로우 클릭

 모달이 열려있는가 ?
  내용만 바꿈
 모달이 딛혀있는가 ?
  같은 플로우 클릭시
  바깥 클릭시
 
 */

