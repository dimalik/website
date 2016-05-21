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

function Task1(stream, parameters) {
  if (stream.constructor === Array && stream.length > 0)
    this.stream = stream;
  else
    throw new Error('Stream was not a list of words');
  var that = this;
  if (parameters === undefined) parameters = {};
  this.italics_probability = (parameters.italics_probability === undefined) ? 1/25: parameters.italics_probability;
  this.missing_top_stop = (parameters.missing_to_stop === undefined) ? 8: parameters.missing_to_stop;
  this.timing_attention = (parameters.timing_attention === undefined) ? 3000: parameters.timing_attention;
  this.timing_default = (parameters.timing_default === undefined) ? 1500: parameters.timing_default;
  this.attention_key = (parameters.attention_key === undefined) ? 'i': parameters.attention_key;

  var missed = 0;

  this.getMissed = function() {
    return missed;
  };

  this.incMissed = function() {
    missed++;
  };

  var consent1 = {
    type: 'single-stim',
    stimulus: "<div><p>Welcome to this language experiment conducted by the Department of Theoretical and Applied Linguistics, University of Cambridge</p><p>Principal Investigator: Dimitrios Alikaniotis</p><p style='text-align: center;'><strong>Note that this experiment can only be done on a laptop or desktop computer</strong></p><h3>INFORMATION:</h3><p>Before you choose to participate in this study it is important that you read the following information to be sure that you understand what your participation will involve.</p><h3>PROCEDURES:</h3><p>If you wish and agree to participate in this study, you will be asked to respond to a series of stimuli in a reaction time task. The total time required to complete the study is estimated to be 30 minutes.</p><br /><br /><p>Press spacebar to advance ...</p></div>",
    is_html: true,
    choices: [' '],
    response_ends_trial: true
  };

  this.getConsent1 = function() {
    return consent1;
  };

  var consent2 = {
    type: 'single-stim',
    stimulus: "<h3>POTENTIAL BENEFITS:</h3><p>By participating in this study the fields of psychology and linguistics will benefit from your participation by addressing some important questions pertaining to the topic.</p><h3>COMPENSATION:</h3><p>You will be paid £3 upon completion of the study</p><h3>VOLUNTARY PARTICIPATION:</h3><p>Participation in this study is voluntary. You may discontinue at any time for any reason, but payment can only be made on completion of the whole study.</p><h3>CONFIDENTIALITY:</h3><p>Each participant’s documented consent to participate and corresponding data will remain confidential.</p><br/><p>Press spacebar to advance ...</p>",
    is_html: true,
    choices: [' '],
    response_ends_trial: true
  };

  this.getConsent2 = function() {
    return consent2;
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

  this.getConcentrationWarning = function() {
    return concentration_warning;
  };
  
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

  this.getTooLateMessage = function() {
    return too_late_message;
  };

  var checkMissing = {
    timeline: [that.getTooLateMessage()],
    conditional_function: function() {
      var data = jsPsych.data.getLastTrialData();
      if (data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(that.attention_key)) {
        return false;
      } else {
        that.incMissed();
        if (that.getMissed() >= that.missing_to_stop)
          jsPsych.endExperiment('<p>We are sorry but it seems that you have missed a lot of trials</p>' +
                                '<p>and the experiment can\'t go on and you will not be paid.</p>' +
                                '<p>you can now close this window</p>');
        return true;
      }
    }
  };

  this.getCheckMissing = function() {
    return checkMissing;
  };
}

Task1.prototype.get_with_critical = function(word) {
  dict = this.get_default_single_stim(word);
  dict.choices = [this.attention_key];
  dict.timing_response = this.timing_attention;
  dict.response_ends_trial = true;
  dict.stimulus = '<i>' + word + '</i>';
  return dict;
};

Task1.prototype.get_default_single_stim = function(word) {
  return {
    type: 'single-stim',
    stimulus: word,
    is_html: true,
    choices: [],
    timing_response: this.timing_default,
    response_ends_trial: false
  };         
};

Task1.prototype.getTimeline = function() {
  timeline = [];
  timeline.push(this.getConsent1());
  timeline.push(this.getConsent2());
  timeline.push(this.getConcentrationWarning());
  for (i=0; i<this.stream.length; i++) {
    if (Math.random() > this.italics_probability)
      timeline.push(this.get_default_single_stim(this.stream[i]));
    else {
      timeline.push(this.get_with_critical(this.stream[i]));
      timeline.push(this.getCheckMissing());
    }
  }
  return timeline;
};


/* 
 Task 2 Specification
 ====================

 In this task participants have to decide whether a word forms a
 natural boundary in the sense that the meaning of the previous stream
 is complete.

*/


function Task2(stream, parameters) {
  if (stream.constructor === Array && stream.length > 0)
    this.stream = stream;
  else
    throw new Error('Stream was not a list of words');

  if (parameters === undefined) parameters = {};
  this.timing_response = (parameters.timing_response === undefined) ? 1500: parameters.timing_response;

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

  this.getNewTask = function() {
    return newTask;
  };
}

Task2.prototype.getStimulus = function(word) {
  return {
    type: 'single-stim',
    stimulus: word,
    is_html: true,
    choices: [' '],
    timing_response: this.timing_response,
    response_ends_trial: false
  };         
};

Task2.prototype.getTimeline = function() {
  timeline = [];
  timeline.push(this.getNewTask());
  for (i=0; i<this.stream.length; i++)
    timeline.push(this.getStimulus(this.stream[i]));
  return timeline;
};


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


function Task3(pairs, parameters) {
  if (pairs.constructor === Array && pairs.length > 0 && pairs[0].length === 2)
    this.pairs = pairs;
  var that = this;
  if (parameters === undefined) parameters = {};
  this.prime_timing_response = (parameters.prime_timing_response === undefined)? 150: parameters.prime_timing_response;
  this.target_timing_response = (parameters.target_timing_response === undefined)? 150: parameters.target_timing_response;
  this.cross_timing_response = (parameters.cross_timing_response === undefined)? 150: parameters.cross_timing_response;
  this.blank_timing_response = (parameters.blank_timing_response === undefined)? 150: parameters.blank_timing_response;

  var cross = {
    type: 'single-stim',
    stimulus: '+',
    is_html: true,
    timing_response: that.cross_timing_response,
    response_ends_trial: false
  };

  this.getCross = function() {
    return cross;
  };

  var blank = {
    type: 'single-stim',
    stimulus: ' ',
    is_html: true,
    timing_response: that.blank_timing_response,
    response_ends_trial: false
  };

  this.getBlank = function() {
    return blank;
  };
}


Task3.prototype.makeTrial = function(prime, target) {
  trial = [];
  trial.push(this.getCross());
  trial.push(this.getPrime(prime));
  trial.push(this.getBlank());
  trial.push(this.getTarget(target));
  return trial;
};

Task3.prototype.getPrime = function(word) {
  return {
    type: 'single-stim',
    stimulus: word.toUpperCase(),
    is_html: true,
    timing_response: this.prime_timing_response,
    response_ends_trial: false
  };
};

Task3.prototype.getTarget = function(word) {
  return {
    type: 'single-stim',
    stimulus: word.toLowerCase(),
    is_html: true,
    timing_reponse: this.target_timing_response,
    response_ends_trial: true,
    correct_response: ['m']  // FIXME: to this to be fixed
  };
};


Task3.prototype.getTimeline = function() {
  timeline = [];
  for (i=0; i<this.pairs.length; i++)
    timeline.push(this.makeTrial.apply(this, this.pairs[i]));
  timeline.flatten();
  return timeline;
};


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

Array.prototype.flatten = function() {
  var merged = [].concat.apply([], this);
  this.length = 0;
  for (i=0; i<merged.length; i++)
    this[i] = merged[i];
};

function ajax_call(url, parameters) {
  return {
    type: 'GET',
    url: url,
    data: parameters,
    success: function(data) { console.log('ajax loaded succesfully...'); }
  };
}

function task_factory(task_name, stream, parameters) {
  var task;

  if (task_name === 'task1')
    task = new Task1(stream, parameters);
  else if (task_name === 'task2')
    task = new Task2(stream, parameters);
  else if (task_name === 'task3')
    task = new Task3(stream, parameters);

  return task;
}









/* Temp bin

/*
 Generic stimuli



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

function makeTrial(prime, target) {
    trial = [];
    trial.push(cross);
    trial.push(get_default_prime(prime));
    trial.push(blank);
    trial.push(get_default_target(target));
    return trial;
}

*/
