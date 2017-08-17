// document.body.style.backgroundColor="red";
var resultIndex = 0;
var resultPage = 0;
var kbdMode = false;

var pureTargets = []
var sections = $('.section')
for(var i = 0; i < sections.length; i++) {
  var section = $(sections[i])
  var sectionClass = section.attr('class')
  // if(
  //   sectionClass.includes('sp_post')
  //   || sectionClass.includes('ndic')
  //   || sectionClass.includes('nsite')
  //   || sectionClass.includes('kinn')
  //   || sectionClass.includes('news')
  //   || sectionClass.includes('magazine')
  //   || sectionClass.includes('book_list')
  //   || sectionClass.includes('greenmap')
  //   || sectionClass.includes('sp_mobile')
  //   || sectionClass.includes('academic')
  //   || sectionClass.includes('sp_video')
  //   || sectionClass.includes('blog')
  //   || sectionClass.includes('webdoc')
  //   || sectionClass.includes('content_search')
  //   || sectionClass.includes('cafe')
  //   || sectionClass.includes('book_body')
  //   || sectionClass.includes('result_more')
  // ) { // post
    var sectionLi = section.find('li')
    for(var j = 0; j < sectionLi.length; j++) {
      pureTargets.push(sectionLi[j])
    }
  // }
  // console.log(section.attr('class'));
}

var targets = []
for(var i = 0; i < pureTargets.length; i++) {
  targets.push($(pureTargets[i]))
}
console.log(targets);

document.body.addEventListener('keydown', function(e) {
  console.log(e.key);
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
  console.log('activeAction');
  console.log(targets);
  if(resultIndex === targets.length) return;
  clearResultBorder()
  var target = targets[resultIndex]
  target.css({"border-color": "#00ab33",
             "border-width":"1.5px",
             "border-style":"solid"});
   $('html body').stop().animate({scrollTop:target.offset().top-100})
}
