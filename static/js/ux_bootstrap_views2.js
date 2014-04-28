// renders the contents of the Header div of the page frame.



IONUX2.Views.Header = Backbone.View.extend({
	el: '#header',
	initialize: function() {
		this.model.on('change:html', this.render, this);
	},
	render: function(){
		console.log('rendering header view');
		this.$el.html(this.model.html);
		return this;
	}
});

// responds to model in two ways.  Captures fetched template
// and renders with loaded template when data (session) is
// fetched.
IONUX2.Views.Login = Backbone.View.extend({
	el: '#login',
	events: {
		'click #userprofile': 'userprofile',
		'click #signup': 'create_account'
	},
	initialize: function(){
		this.model.on('change:html', this.setTemplate, this);
		this.model.on('change:session', this.render, this);
	},
	setTemplate: function(){
		console.log('setting login template');
		this.template = _.template(this.model.html);
		return this;
	},
	render: function(){
		console.log('rendering login view');
		this.$el.html(this.template(this.model.data));
		return this;
	}
});

IONUX2.Views.SearchTabContent = Backbone.View.extend({
	el: '#searchTabContent',
	events: {
		'click .accordion_title': 'expandHide'
	},
	initialize: function() {
		this.model.on('change:html', this.render, this);
	},
	expandHide: function(e) {
		e.preventDefault();
		var $link = $(e.currentTarget);
		$link.parent().find('.spatial_details').slideToggle('fast', function() {
			if ($(this).is(':visible')) {
            	$link.find('.expand_hide').removeClass('arrow_right').addClass('arrow_down');              
        	} else {
        		$link.find('.expand_hide').removeClass('arrow_down').addClass('arrow_right');
       		}        
		});
	},
	render: function() {
		console.log('rendering left side view');
		this.$el.html(this.model.html);
		return this;
	}
});

IONUX2.Views.Sites = Backbone.View.extend({
  el: '#sites',
  template: _.template(IONUX2.getTemplate('templates/sites.html')),
  initialize: function() {
    console.log('initializing sites view');
    this.render();
  },
  render: function() {
    console.log('rendering sites');
    this.$el.html(this.template(this.collection.toJSON()));
    return this;
  }
});

IONUX2.Views.Region = Backbone.View.extend({
	el: '#region',
	template: _.template(IONUX2.getTemplate('templates/regions.html')),
	events: {
      'click .secondary-link': 'click_action',
      'click .secondary-nested-link': 'click_action_nested',
      'click .secondary-link-selected': 'click_action',
      'click .secondary-nested-link-selected': 'click_action_nested',
      'click .toggle-all-menu': 'toggle_action',
      'click .toggle-all-menu-selected': 'toggle_action',
      'click .primary-link': 'trigger_pan_map',
      'click .checkAll': 'select_all_regions' 
  },
	initialize: function() {
		console.log('initializing region view');
		this.render();
	},

  select_all_regions: function(e) {
    var $check = $(e.currentTarget);
    if ($check.is(':checked')) {
      $('.list_regions').find('input').prop('checked', true);
    }
    else {
      $('.list_regions').find('input').prop('checked', false);
    }
  },

  /*trigger_pan_map: function(e) {
   IONUX2.Dashboard.MapResource.tmp = e.target.innerHTML.toString().trim();
   if (e.target.className =="primary-link nested-primary-link"){
      IONUX2.Dashboard.MapResource.resource_level = 3;
   }else{
      IONUX2.Dashboard.MapResource.resource_level = 0;
   }
   //get selected id
   var res = e.target.pathname.split("/",3);
   IONUX2.Dashboard.MapResource.tmpId = res[2];
   IONUX2.Dashboard.MapResource.trigger('pan:map');
  },
  
   click_action_map: function(e){
       e.preventDefault();
       var target = $(e.target);
       target.parent().next('ul').toggle();
  },

  click_action: function(e){
      e.preventDefault();
      var target = $(e.target);
      target.parent().parent().next('ul').toggle()
      if (target.parent().parent().next('ul').is(":visible")) {
          target.attr('class','secondary-link-selected  pull-right');
      }
      else {
          target.attr('class','secondary-link pull-right');
      }

      console.log(target.parent().parent().next('ul').is(":visible"))
  },

  click_action_nested: function(e){
      e.preventDefault();
      var target = $(e.target);
      target.parent().next('ul').toggle()
      if (target.parent().next('ul').is(":visible")) {
          target.attr('class','secondary-nested-link-selected  pull-right');
      }
      else {
          target.attr('class','secondary-nested-link pull-right');
      }

      console.log(target.parent().next('ul').is(":visible"))
  },

   toggle_action: function(e){
       e.preventDefault();
       var map_target = $('.map-nested-ul');
       map_target.toggle();
       var target = $(e.target);
       console.log(target.attr('class'));
       if (target.attr('class') == 'toggle-all-menu pull-right'){
           target.attr('class', 'toggle-all-menu-selected pull-right')
       }
       else {
           target.attr('class', 'toggle-all-menu pull-right')
       }
   },*/

	build_menu: function(){
    // Grab all spatial names, then uniques; separate for clarity.
    var spatial_area_names = _.map(this.collection.models, function(resource) {
      var san = resource.get('spatial_area_name');
      if (san != '') return san;
    });
    var unique_spatial_area_names = _.uniq(spatial_area_names);

    var resource_list = {};
    _.each(unique_spatial_area_names, function(san) {
      resource_list[san] = _.map(this.collection.where({spatial_area_name: san}), function(resource) { return resource.toJSON()});
    }, this);
    return resource_list;
  },

   render: function() {
		console.log('rendering region');
		//this.$el.html(this.template(this.collection.toJSON()));
		 this.$el.removeClass('placeholder');
		 this.$el.html(this.template({resources: this.build_menu(), title: this.title}));
   	 	 this.$el.find('#list').jScrollPane({autoReinitialise: true});
    	 return this;
	}
});

IONUX2.Views.Spatial = Backbone.View.extend({
	el: '#spatial',
	template: _.template(IONUX2.getTemplate('templates/spatial.html')),
	initialize: function() {
		console.log('initializing spatial view');
		this.render();
	},
	render: function() {
		console.log('rendering spatial');
		this.$el.html(this.template());
		return this;
	}
});
