// document.body.style.backgroundColor="red";
var resultIndex = 0;
var resultPage = 0;
var kbdMode = false;

var targets = []
var sections = $('.section')
for(var i = 0; i < sections.length; i++) {
  var section = $(sections[i])
  if(section.attr('class').includes("sp_post")) { // post
      console.log(section.find('li'));
  }

  console.log(section.attr('class'));
}
document.body.addEventListener('keydown', function(e) {
  if(e.key === '/'){
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

  // if(e.key === 'ArrowDown') {
  //   if(resultIndex != resultItems.length) {
  //     resultIndex++;
  //   }
  //   activeAction()
  //   e.preventDefault();
  //   e.stopPropagation();
  // } else if(e.key === 'ArrowUp') {
  //   if(resultIndex !== 0) {
  //     resultIndex--;
  //   }
  //   activeAction()
  //   e.stopPropagation();
  //   e.preventDefault();
  // } else if(e.key === 'Enter') {
  //   $($(resultItems[resultIndex]).find('a')[0])[0].click()
  //   e.stopPropagation();
  //   e.preventDefault();
  // } else if(e.key === 'ArrowLeft') {
  //   var preBtn = $('#pnprev')[0]
  //   if(preBtn) preBtn.click()
  // } else if(e.key === 'ArrowRight') {
  //   var nextBtn = $('#pnnext')[0]
  //   if(nextBtn) nextBtn.click()
  // }
});

function clearResultBorder() {
  var resultItems = $('.g')
  for(var i=0; i < resultItems.length; i++) {
    $(resultItems[i]).css('border', '0px');
  }
}

function activeAction() {
  var resultItems = $('.g')
  if(resultIndex === resultItems.length) return;
  clearResultBorder()
  var target = $(resultItems[resultIndex])
  target.css({"border-color": "#4285f4",
             "border-width":"1.5px",
             "border-style":"solid"});
   $('html body').stop().animate({scrollTop:target.offset().top-100})
}
