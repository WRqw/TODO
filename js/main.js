$(function() {

	window.App = {
		Models: {},
		Views: {},
		Collections: {},
		Router: {}
	};
	window.template = function(id) {
		return _.template( $('#' + id).html() );
	};

	App.Models.Task = Backbone.Model.extend({
		defaults: {
			title: '',
			completed: false
		},
		validate: function (attrs) {
			if ( ! $.trim(attrs.title) ) {
				return 'Не корректное имя задачи. Попробуйте еще раз.'
		}
	}
});


	App.Collections.Tasks = Backbone.Collection.extend({
		model: App.Models.Task
	});

	App.Collections.List = Backbone.Collection.extend({

	});



	App.Views.Task = Backbone.View.extend({
		tagName: 'li',
		template: template('taskTemplate'),
		initialize: function () {
			this.model.on('change', this.render, this);
			this.model.on('destroy', this.remove, this)
			
		},
		render: function() {
			var template = this.template(this.model.toJSON());
			this.$el.html( template );
			return this;
		},
		events: {
			'click .nameTask' : 'editTask',
			'click .delete' : 'destroy',
			'click .edit' : 'completedTask',
			'click .pseudoelement' : 'editCompletedTask'

		},
		editTask: function() {
			var newAdd = prompt('Введите имя задачи');
			this.model.set('title', newAdd, {validate: true});
		},
		destroy: function() {
			this.model.destroy();
		},

		completedTask: function() {

 			this.$('span').removeClass('nameTask').addClass('pseudoelement');
 		},
 		editCompletedTask: function() {
 			var newAdd = prompt('Введите имя задачи');
			this.model.set('title', newAdd, {validate: true});
			this.$('span').removeClass('nameTask').addClass('pseudoelement');


 		}
		
	});

	App.Views.Tasks = Backbone.View.extend({
		tagName: 'ul',

		initialize: function() {
			this.collection.on('add', this.addOne, this);
		},
		render: function () {
			this.collection.each(this.addOne, this);
			return this;

		},
		addOne: function (task) {
			var taskView = new App.Views.Task({ model: task });
			this.$el.append(taskView.render().el);
			document.getElementById('editAdd').value = '';
		}
	});



	App.Views.AddTask = Backbone.View.extend({
		el: '#addTask',
		initialize: function() {

		},
		events: {
			'submit' : 'submit',
			'click #submitTask' : 'addClass'
		},
		submit: function(e) {
			e.preventDefault();

			var newTaskTitle = $(e.currentTarget).find('input[type=text]').val();

			var newTask = new App.Models.Task({title: newTaskTitle}, {validate: true});

			this.collection.add(newTask);

			var resetButton = document.querySelector('.reset');

			resetButton.classList.add('resetgrey');


		},


	});

	window.tasksCollection = new App.Collections.Tasks;

	var tasksView = new App.Views.Tasks({ collection: tasksCollection });

	var newAddTask = new App.Views.AddTask({collection: tasksCollection});

	$( ".arrow-down" ).click(function() {
		var height=$("body").height(); 
		 $("body").animate({"scrollTop":height}, 600);
		});

	$( ".back").click(function() {
		var height=$("body").height(); 
		 $("body").animate({"scrollTop":0}, 600);
	})

	/*$( ".arrow" ).click(function() {
 		 $( ".center-content" ).hide( "fast");
 		 var g = $(".bg").css('height', '1000px');
 		 var height=$("body").height(); 
		 $("body").animate({"scrollTop":height},"slow"); 
		 $(".arrow").hide();
		});*/
	var elem = document.querySelector('.arrow-down');

	var elem2 = document.querySelector('.center-content');

	var bgElem = document.querySelector('.bg');

	var arrow = document.querySelector('.arrow-down');

	var spanBack = document.querySelector('.back');

	var creater = document.querySelector('.created');

	var animated = document.querySelector('.animated');

	




	elem.addEventListener('click', scrollDown);

	elem.addEventListener('click', hideArrow);

	elem.addEventListener('click', showArrow);

	spanBack.addEventListener('click', showPanel);

	

	



	function scrollDown() {


		elem2.classList.add('visuallyhidden');

		bgElem.style.height = '1000px';

		creater.style.display = 'block';

		animated.classList.add('bounceInLeft');
    		





    };

    function hideArrow () {
  

    	arrow.style.display = 'none';
    };
    function showArrow () {


    	if (arrow.style.display = 'none') {
    		spanBack.style.display = 'block';

    	}
    };
    function showPanel() {
    	elem2.classList.remove('visuallyhidden');
    	bgElem.style.height = '300px';
    	spanBack.style.display = 'none';
    	arrow.style.display = 'block';
    	creater.style.display = 'none';

    };

    $(".reset").click(function () {
      $("li").remove();
      	var resetButton = document.querySelector('.reset');

		resetButton.classList.remove('resetgrey');
    });




    
	
	




	$('.tasks').html(tasksView.render().el);


	














});