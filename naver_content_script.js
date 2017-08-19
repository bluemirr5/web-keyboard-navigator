// document.body.style.backgroundColor="red";
var resultIndex = 0;
var resultPage = 0;
var kbdMode = false;

var pureTargets = []
var sections = $('.section')
for(var i = 0; i < sections.length; i++) {
  var section = $(sections[i])
  var sectionClass = section.attr('class')
  if(sectionClass.includes('sp_keyword') ||
    sectionClass.includes('realtime2')
  ) {
    continue
  }
    var sectionLi = section.find('li')
    for(var j = 0; j < sectionLi.length; j++) {
      pureTargets.push(sectionLi[j])
    }
}

var targets = []
for(var i = 0; i < pureTargets.length; i++) {
  if($(pureTargets[i])[0].parentNode.parentNode.classList.contains('lst_cont') &&
    $(pureTargets[i])[0].parentNode.parentNode.style.display === 'none'
  ) {
    continue
  }
  targets.push($(pureTargets[i]))
}

document.body.addEventListener('keydown', function(e) {
  if(e.key === 'Escape'){
    kbdMode = !kbdMode
    if(kbdMode) {
      resultPage = 0
      resultIndex = 0
      activeAction()
    } else {
      clearResultBorder()
    }
    return;
  }

  if(!kbdMode) {
    return;
  }

  if(e.key === 'ArrowDown') {
    if(resultIndex != targets.length) {
      resultIndex++;
    }
    activeAction()
    e.preventDefault();
    e.stopPropagation();
  } else if(e.key === 'ArrowUp') {
    if(resultIndex !== 0) {
      resultIndex--;
    }
    activeAction()
    e.stopPropagation();
    e.preventDefault();
  } else if(e.key === 'Enter') {
    $($(targets[resultIndex]).find('a')[0])[0].click()
    e.stopPropagation();
    e.preventDefault();
  } else if(e.key === 'ArrowLeft') {
    var preBtn = $('#pnprev')[0]
    if(preBtn) preBtn.click()
  } else if(e.key === 'ArrowRight') {
    var nextBtn = $('#pnnext')[0]
    if(nextBtn) nextBtn.click()
  }
});

function clearResultBorder() {
  for(var i=0; i < targets.length; i++) {
    targets[i].css('border', '0px');
  }
}

function activeAction() {
  if(resultIndex === targets.length) return;
  clearResultBorder()
  var target = targets[resultIndex]
  target.css({"border-color": "#00ab33",
             "border-width":"1.5px",
             "border-style":"solid"});
   $('html body').stop().animate({scrollTop:target.offset().top-100})
}
