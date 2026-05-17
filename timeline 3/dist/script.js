function updateTimeline() {
  var today = new Date();
  today.setHours(0,0,0,0);
  var items = document.querySelectorAll('.tl-item[data-date]');
  var closestItem = null;
  var closestDiff = Infinity;

  items.forEach(function(item) {
    var d = new Date(item.dataset.date + 'T00:00:00');
    var diff = d - today;
    item.classList.remove('past', 'next');
    if (diff < 0) {
      item.classList.add('past');
    } else {
      if (diff < closestDiff) {
        closestDiff = diff;
        closestItem = item;
      }
    }
  });

  if (closestItem) closestItem.classList.add('next');
}

updateTimeline();

var now = new Date();
var msUntilMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1) - now;
setTimeout(function() {
  updateTimeline();
  setInterval(updateTimeline, 86400000);
}, msUntilMidnight);