function get_default_single_stim(word) {
  return {
    type: 'single-stim',
    stimulus: word,
    is_html: true,
    correct: [],
    timing_response: 1500,
    response_ends_trial: false
  };         
}

function get_with_critical(word) {
  dict = get_default_single_stim(word);
  dict.correct = ['i'];
  dict.timing_response = 3000;
  dict.response_ends_trial = true;
  dict.stimulus = '<i>' + word + '</i>';
  return dict;
}

function getTimeline(words, itprob) {
  timeline = [];
  for (i=0; i<words.length; i++) {
    if (Math.random() < itprob)
      trial = get_with_critical(word);
    else
      trial = get_default_single_stim(word);
    timeline.push(trial);
  }
  return timeline;
}

function fixCentre(target) {
  $(target).css({
    'position' : 'absolute',
    'left' : '50%',
    'top' : '30%',
    'margin-left' : function() {return -$(target).outerWidth()/2;},
    'margin-top' : function() {return -$(target).outerHeight()/2;},
    'text-align': 'center'
  });
}
