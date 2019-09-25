function makeDiv(classname, target) {
  return $('<div>').addClass(classname).appendTo(target)
}

function makeSpan(className, target) {
  return $('<span>').addClass(className).appendTo(target)
}


function makeImgsvg(target, src, alt) {
  return $(`<img src=${src}.svg alt=${alt}>`).appendTo(target)
}

function makeImgsrc(target, src, alt) {
  return $(`<img src=${src}.png alt=${alt}>`).attr('srcset', `${src}@2x.png 2x,${src}@3x.png 3x`).appendTo(target)
}