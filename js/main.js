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
			title: ''
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
			'click .edit' : 'editTask',
			'click .delete' : 'destroy'
		},
		editTask: function() {
			var newAdd = prompt('Введите имя задачи');
			this.model.set('title', newAdd, {validate: true});
		},
		destroy: function() {
			this.model.destroy();
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


		},


	});

	window.tasksCollection = new App.Collections.Tasks;

	var tasksView = new App.Views.Tasks({ collection: tasksCollection });

	var newAddTask = new App.Views.AddTask({collection: tasksCollection});

	$( ".arrow" ).click(function() {
 		 $( ".center-content" ).hide( "fast");
 		 var g = $(".bg").css('height', '1000px');
 		 var height=$("body").height(); 
		 $("body").animate({"scrollTop":height},"slow"); 
		 $(".arrow").hide();
		});

	$('.tasks').html(tasksView.render().el);


	














})