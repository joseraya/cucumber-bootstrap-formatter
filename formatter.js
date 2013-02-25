var CucumberHTML = {};

CucumberHTML.DOMFormatter = function(rootNode) {
  var currentUri;
  var currentFeature;
  var currentElement;
  var currentSteps;

  var currentStepIndex;
  var currentStep;
  var $templates = $(CucumberHTML.templates);

  this.uri = function(uri) {
    currentUri = uri;
  };

  this.feature = function(feature) {
    var $li = $('<li><a href="#'+feature.id+'">'+feature.name+'</a></li>');
    $('ul.nav-list', rootNode).append($li);

    var $div = $('<div class="feature" id="' + feature.id + '"><h2>'+feature.name+'</h2><pre>'+feature.description+'</pre></div>');
    currentFeature = $div;
    $('div.span9', rootNode).append($div);
  };

  this.background = function(background) {
    var $div = $('<div class="background"/>');
    if (!currentFeature.background) {
      currentFeature.append($div);
      currentFeature.background = $div;
    }
    currentElement = $div;
    currentStepIndex = 1;
  };

  this.scenario = function(scenario) {
    var $div = $('<div class="background" id="'+scenario.id +'"/>');
    $div.append($('<h3>' + scenario.name + '</h3>'));
    currentFeature.append($div);
    currentElement = $div;
    currentStepIndex = 1;
  };

  this.step = function(step) {
    //var $pre =$('<span class="keyword">'+step.keyword+'</span>');
    var $step=$('<div class="step"><label class="keyword">'+step.keyword+'</label>'+
      '<label>'+step.name+'</label></div>');
    if (step.rows) {
      var tableHtml='<table class="table"><thead><tr>';
      var cells = step.rows[0].cells;
      for(i=0; i < cells.length; i++) {
        tableHtml += '<th>' + cells[i] + '</th>';
      }
      tableHtml +='</tr></thead>';
      tableHtml += '<tbody>';
      if (step.rows[1]) {
        for(i=0; i < step.rows[1].cells.length; i++) {
          tableHtml += '<td>' + step.rows[1].cells[i] + '</td>';
        }
        tableHtml += '</tbody>';
      }
      tableHtml +='</table>';
   
      $step.append($(tableHtml));
    }
    if (step.doc_string) {
      $step.append('<pre>' + step.doc_string.value +'</pre>');
    }
    currentElement.append($step);
  };

  this.scenarioOutline= function(scenarioOutline) {

  };

  this.examples = function(examples) {

  };

  this.match = function(match) {
    currentStep = currentElement.find('.step:nth-child(' + currentStepIndex + ')');
    currentStepIndex++;
  };

  this.result = function(result) {
    currentStep.addClass(result.status);
    if(result.status === "passed") {
      currentStep.prepend($('<span class="badge badge-success">pass</span>'));
    }
  };
};

if (typeof module !== 'undefined') {
  module.exports = CucumberHTML;
} else if (typeof define !== 'undefined') {
  define([], function() { return CucumberHTML; });
}
