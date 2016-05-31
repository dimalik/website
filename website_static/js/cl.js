var Task = function() {
  if (this.constructor === Task)
    throw new Error("Cannot instantiate abstract class Task");
};

Task.prototype.getTimeline = function() {
  throw new Error("Not Implemented Yet");
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

function Task1(stream, parameters) {
  Task.call(this, arguments);
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

Task1.prototype = Object.create(Task.prototype);
Task1.prototype.constructor = Task1;

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
  Task.call(this, arguments);
  if (stream.constructor === Array && stream.length > 0)
    this.stream = stream;
  else
    throw new Error('Stream was not a list of words');

  if (parameters === undefined) parameters = {};
  this.timing_response = (parameters.timing_response === undefined) ? 1500: parameters.timing_response;

}

Task2.prototype = Object.create(Task.prototype);
Task2.prototype.constructor = Task2;

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
  Task.call(this, arguments);
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

Task3.prototype = Object.create(Task.prototype);
Task3.prototype.constructor = Task3;

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

function unfixCentre(target_object) {
  target_object.css({
    position: 'static',
    left: 'auto',
    top: 'auto',
    'margin-left': 'auto',
    'margin-top': '50px',
    'text-align': 'start'
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
    dataType: 'json',
    url: url + "/",
    data: parameters,
    success: function(data) {  }
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


function fixTasks12(stimuli, task1_size, task2_size) {
  var task1_stimuli = [];
  var task2_stimuli = [];
  
  for (i=0; i<task1_size; i++)
    task1_stimuli.push(stimuli[i]);
  for (i=0; i<task2_size; i++)
    task2_stimuli.push(stimuli[i+task1_size]);

  return [task1_stimuli, task2_stimuli];
}


function save_data(experiment_name, save_path, middleware_token, data, opt_data){
  var data_table = experiment_name;
  $.ajax({
    type: 'post',
    cache: false,
    url: save_path,
    data: {
      table: data_table,
      json: JSON.stringify(data),
      opt_data: opt_data,
      csrfmiddlewaretoken: middleware_token
    },
    success: function(output) {
      console.log(output);
    }
  });
}

function check_form(elem) {
  if (!$('#participant-form').valid())
    return false;
  participant_data.push($('#participant-form').serializeArray());
  return true;
}

function getQuestions(q) {
  var mykeys = Object.keys(q);
  var ans = {};
  for (i=0; i<mykeys.length; i++) {
    if (mykeys[i] === 'message' || mykeys[i] === 'code')
      continue;
    ans[mykeys[i]] = $.parseJSON(q[mykeys[i]]);
    if (ans[mykeys[i]].type === 'html')
      ans[mykeys[i]].check_fn = window[ans[mykeys[i]].check_fn];
  }
  return ans;
}
