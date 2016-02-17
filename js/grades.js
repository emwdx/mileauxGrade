
var grades = ReactiveVar();

Tracker.autorun(function(){

grades.set(Grades.find().fetch()); //I don't want to use a separate reactive variable for each helper. I want to be able to access the Grades.find() cursor as we do in a Meteor app and have it be reactive.


})


Grades.insert({course:"math",earned:15,total:20,comments:"Not bad for a first assessment"});


Template.listGrades.helpers({

grades: function(){


return grades.get();
//return Grades.find()

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
