/*
 Generic stimuli

*/

var consent1 = {
  type: 'single-stim',
  stimulus: "<div><p>Welcome to this language experiment conducted by the Department of Theoretical and Applied Linguistics, University of Cambridge</p><p>Principal Investigator: Dimitrios Alikaniotis</p><p style='text-align: center;'><strong>Note that this experiment can only be done on a laptop or desktop computer</strong></p><h3>INFORMATION:</h3><p>Before you choose to participate in this study it is important that you read the following information to be sure that you understand what your participation will involve.</p><h3>PROCEDURES:</h3><p>If you wish and agree to participate in this study, you will be asked to respond to a series of stimuli in a reaction time task. The total time required to complete the study is estimated to be 30 minutes.</p><br /><br /><p>Press spacebar to advance ...</p></div>",
  is_html: true,
  choices: [' '],
  response_ends_trial: true
};

var consent2 = {
  type: 'single-stim',
  stimulus: "<h3>POTENTIAL BENEFITS:</h3><p>By participating in this study the fields of psychology and linguistics will benefit from your participation by addressing some important questions pertaining to the topic.</p><h3>COMPENSATION:</h3><p>You will be paid £3 upon completion of the study</p><h3>VOLUNTARY PARTICIPATION:</h3><p>Participation in this study is voluntary. You may discontinue at any time for any reason, but payment can only be made on completion of the whole study.</p><h3>CONFIDENTIALITY:</h3><p>Each participant’s documented consent to participate and corresponding data will remain confidential.</p><br/><p>Press spacebar to advance ...</p>",
  is_html: true,
  choices: [' '],
  response_ends_trial: true
};

var concentration_warning = {
  type: 'single-stim',
  stimulus: "<p>Concentration is essential for successful completion of this experiment. Therefore you have to make sure that you have shut down all distracting windows.</p><p style='font-weight: bold;'>Only continue if you are sure you will not be interrupted for the next 30 minutes.</p><h4>Press spacebar to proceed to detailed instructions</h4>",
  is_html: true,
  choices: [' '],
  response_ends_trial: true,
  on_finish: function() {
    
    fixCentre($('#target'));
  }
};


/*
 Task 1 Specification
 ====================

 we get a stream of words from the server and push them in the
 timeline.  In order to test that participants are focused to the task
 we intersperse trials where the participants have to judge whether a
 string is in italics.  After every addition to the timeline we flip a
 biased coin (`itprob`) to determine whether the present trial is
 going to be testing attention.

 Since the participant would still be able to do the experiment we add
 an extra condition by which if participants have failed to indicate
 the orientation a `missing_to_stop` amount of times the experiment
 ends and the participant is not going to be paid as per
 'http://support.prolific.ac/article/22-reviewing-submissions-how-do-i-decide-who-to-accept-reject'

*/

function get_default_single_stim(word) {
  return {
    type: 'single-stim',
    stimulus: word,
    is_html: true,
    choices: [],
    timing_response: 1500,
    response_ends_trial: false
  };         
}

function get_with_critical(word) {
  dict = get_default_single_stim(word);
  dict.choices = ['i'];
  dict.timing_response = 3000;
  dict.response_ends_trial = true;
  dict.stimulus = '<i>' + word + '</i>';
  return dict;
}

var too_late_message = {
  type: 'single-stim',
  is_html: true,
  choices: [' '],
  timing_response: -1,
  response_ends_trial: true,
  stimulus: '<p>Oops... it seems that you missed to indicate whether the text was in italics.</p>' +
    '<p>Remember that if you have 8 (eight) misses then the experiment will automatically close</p>' +
    '<p>and you won\'t be able to get paid</p><p>You can indicate whether the word was in italics</p>' +
    '<p>by pressing the \'i\' key</p>' + 
    '<p>Press space to continue</p>'
};

var checkMissing = {
  timeline: [too_late_message],
  conditional_function: function() {
    var data = jsPsych.data.getLastTrialData();
    if (data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode('i')) {
      return false;
    } else {
      missed += 1;
      if (missed >= missing_to_stop)
        jsPsych.endExperiment('<p>We are sorry but it seems that you have missed a lot of trials</p>' +
                              '<p>and the experiment can\'t go on and you will not be paid.</p>' +
                              '<p>you can now close this window</p>');
      return true;
    }
  }
};

function getTimeline(words, itprob) {
  timeline = [];
  timeline.push(consent1);
  timeline.push(consent2);
  timeline.push(concentration_warning);
  for (i=0; i<words.length; i++) {
    if (Math.random() > itprob)
      timeline.push(get_default_single_stim(words[i]));
    else {
      timeline.push(get_with_critical(words[i]));
      timeline.push(checkMissing);
    }
  }
  return timeline;
}


/* 
 Task 2 Specification
 ====================

 In this task participants have to decide whether a word forms a
 natural boundary in the sense that the meaning of the previous stream
 is complete.

*/


var newTask = {
  type: 'single-stim',
  is_html: true,
  choices: [' '],
  timing_response: -1,
  response_ends_trial: true,
  stimulus: '<p>Now the task will change a bit...<p>' +
    '<p>World\'s languages use boundaries such as pauses in speech, fullstops in writing etc. to mark</p>' +
    '<p>to mark that the end of a topic. Your task in this phase is to press the spacebar at any time</p>' +
    '<p>it feels that there is a <i>natural</i> pause in the stream.</p>'
};

function get_default_single_stim_task2(word) {
  return {
    type: 'single-stim',
    stimulus: word,
    is_html: true,
    choices: [' '],
    timing_response: 1500,
    response_ends_trial: false
  };         
}

function getTask2Timeline(words) {
  timeline = [];
  for (i=0; i<words.length; i++)
    timeline.push(get_default_single_stim_task2(words[i]));
  return timeline;
}


/*
 Task 3 Specification

 This defines a semantic priming task. Primes-targets come in tuples
 from the server. All the primes are in uppercase and the targets
 lowercase. There are two-SOAs -200ms and 1200ms. The order is as follows
 '+' <- 500ms -- PRIME <- 150ms -- BLANK <- 50ms/1050ms -- target <-
 3000ms (or response).

 The number of potential prime-target pairs is (n^2 - n) / 2 where n
 is neighbourhoods * neighbourhood size (assuming no same).
*/

function get_default_prime(word) {
    return {
	type: 'single-stim',
	stimulus: word.toUpperCase(),
	is_html: true,
	timing_response: 150,
	response_ends_trial: false
    };
}

function get_default_target(word) {
    return {
	type: 'single-stim',
	stimulus: word.toLowerCase(),
	is_html: true,
	timing_reponse: 3000,
	response_ends_trial: true,
	correct_response: ['m']  // FIXME: to this to be fixed
    };
}

var cross = {
    type: 'single-stim',
    stimulus: '+',
    is_html: true,
    timing_response: 500,
    response_ends_trial: false
};


var blank = {
    type: 'single-stim',
    stimulus: ' ',
    is_html: true,
    timing_response: 50,
    response_ends_trial: false
};


function makeTrial(prime, target) {
    trial = [];
    trial.push(cross);
    trial.push(get_default_prime(prime));
    trial.push(blank);
    trial.push(get_default_target(target));
    return trial;
}


function getSPtimeline(prime_target_list) {
    timeline = [];
    for (i=0; i<prime_target_list.length; i++)
	timeline.push(makeTrial.apply(this, prime_target_list[i]));
    return timeline;
}


/* 
 Helper functions
 ================

 these should be moved to their own file at some point. For now under
 this we write the functions that do not have anything to do with the
 actual experiment.

*/

function fixCentre(target_object) {
  target_object.css({
    'position' : 'absolute',
    'left' : '50%',
    'top' : '30%',
    'margin-left' : -target_object.outerWidth()/2,
    'margin-top' : -target_object.outerHeight()/2,
    'text-align': 'center'
  });
}


