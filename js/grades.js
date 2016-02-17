
var grades = ReactiveVar();

Tracker.autorun(function(){

allGrades.set(Grades.find().fetch());


})


Grades.insert({course:"math",earned:15,total:20,comments:"Not bad for a first assessment"});


Template.listGrades.helpers({

grades: function(){


return grades.get();

}

})

Template.grade.helpers({

percent:function(){

return (this.earned*100/this.total).toFixed(1);

}


})
Template.enterGrade.events({
'click #enterGrade':function(e){
e.preventDefault();

var course = $('#course').val();
var earned = parseInt($('#earnedPoints').val());
var total = parseInt($('#totalPoints').val());
var comments = $('#comments').val();

var newGrade = {
course:course,
earned:earned,
total:total,
comments:comments
}

Grades.insert(newGrade);


}


})

Template.gradeDisplay.helpers({

mathPercentage: function(){

var mathGrades = Grades.find({course:'math'});

return calculateTotalGrade(mathGrades);


}


})

var calculateTotalGrade = function(grades){

var totalEarned = 0;
var totalPossible = 0;

grades.forEach(function(grade){

totalEarned += grade.earned;
totalPossible += grade.total;


})

return (100*totalEarned/totalPossible).toFixed(1)


}
