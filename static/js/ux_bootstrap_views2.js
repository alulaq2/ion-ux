// renders the contents of the Header div of the page frame.



IONUX2.Views.Header = Backbone.View.extend({
	el: '#header2',
	initialize: function() {
		this.model.on('change:html', this.render, this);
	},
	render: function(){
		console.log('rendering header view');
		this.$el.html(this.model.html);
		return this;
	}
});

IONUX2.Views.MySearches = Backbone.View.extend({
  el: '.list_mysearches',
  template: _.template(IONUX2.getTemplate('templates/my_searches.html')),
  initialize: function() {
  },
  render: function() {
    console.log('rendering my searches view');
    this.$el.html(this.template(this.collection.toJSON()));
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
    console.log('initializing login view');
    console.log(this.model);
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
		'click .accordionTitle': 'expandHide',
    'click .textRight': 'saveSearch',
	},
	initialize: function() {
		this.model.on('change:html', this.render, this);
	},
	expandHide: function(e) {
		e.preventDefault();
		var $link = $(e.currentTarget);
		$link.parent().find('.spatialDetails').slideToggle('fast', function() {
			if ($(this).is(':visible')) {
            	$link.find('.expandHide').removeClass('arrowRight').addClass('arrowDown');              
        	} else {
        		$link.find('.expandHide').removeClass('arrowDown').addClass('arrowRight');
       		}        
		});
	},
  saveSearch: function() {
    (function() {
      // store spatial input values and set to model
      var spatial_dropdown = $('.lat_long_menu option:selected').attr('value'),
        from_latitude = $('#south').val(),
        from_ns = $('.from_ns option:selected').val(),
        from_longitude = $('#west').val(),
        from_ew = $('.from_ew option:selected').val(),
        to_latitude = $('.placeholder_lat').val(),
        to_ns = $('.north_south_menu option:selected').val(),
        to_longitude = $('.show_hide_longitude').val(),
        to_ew = $('.to_ew option:selected').val(),
        radius = $('.no_placeholder_radius').val(),
        miles_kilos = $('.milesKilosMenu').val(),
        vertical_from = $('[data-verticalfrom]').val(),
        vertical_to = $('[data-verticalto]').val(),
        feet_miles = $('.feet_miles option:selected').val();

      IONUX2.Models.saveSpatialSearch.set({
        'spatial_dropdown': spatial_dropdown,
        'from_latitude': from_latitude,
        'from_ns': from_ns,
        'from_longitude': from_longitude,
        'from_ew': from_ew,
        'to_latitude': to_latitude,
        'to_ns': to_ns,
        'to_longitude': to_longitude,
        'to_ew': to_ew,
        'radius': radius,
        'miles_kilos': miles_kilos,
        'vertical_from': vertical_from,
        'vertical_to': vertical_to,
        'feet_miles': feet_miles
      });
    })();

    (function() {
      // save temporal input values and set to model
      var temporal_dropdown = $('.temporal_menu option:selected').attr('value'),
        from_year = $('.from_date_menu .year').val(),
        from_month = $('.from_date_menu .month').val(),
        from_day = $('.from_date_menu .day').val(),
        from_hour = $('.from_date_menu .hour').val(),
        to_year = $('.to_date_menu .year').val(),
        to_month = $('.to_date_menu .month').val(),
        to_day = $('.to_date_menu .day').val(),
        to_hour = $('.to_date_menu .hour').val();

    var searchName = {
      'time': time,
      'name': name,
      'month': month,
      'day': day,
      'year': year,
      'hour': hour,
      'minute': minute
    };

    /*var sortableOrder = {
      'sortable_order': sortable_order
    };*/

    var spatial = {
      //'spatial_accordion_visible': spatial_accordion_visible,
      'spatial_dropdown': spatial_dropdown,
      'from_latitude': from_latitude,
      'from_ns': from_ns,
      'from_longitude': from_longitude,
      'from_ew': from_ew,
      'to_latitude': to_latitude,
      'to_ns': to_ns,
      'to_longitude': to_longitude,
      'to_ew': to_ew,
      'radius': radius,
      'miles_kilos': miles_kilos,
      'vertical_from': vertical_from,
      'vertical_to': vertical_to,
      'feet_miles': feet_miles
    };

    var temporal = {
      //'temporal_accordion_visible': temporal_accordion_visible,
      'temporal_dropdown': temporal_dropdown,
      'from_year': from_year,
      'from_month': from_month,
      'from_day': from_day,
      'from_hour': from_hour,
      'to_year': to_year,
      'to_month': to_month,
      'to_day': to_day,
      'to_hour': to_hour
    };

    // get facility checkbox values and add to collection
    //var facility_accordion_visible = $('#orgSelector .spatialDetails').is(':visible');
    (function() {
      var facilities_checked = [];
      $('.list_facilities input').each(function(data) {
        var facility_value = $(this).val();
        var is_checked = $(this).prop('checked');
        facilities_checked.push({/*'facility_accordion_visible' : facility_accordion_visible,*/ 'value' : facility_value, 'is_checked' : is_checked });
      });
      IONUX2.Collections.saveFacilitySearch.set(facilities_checked);
    })();

    (function() {
      // get facility checkbox values
      var facilities_checked = [];
      $('.list_facilities input').each(function(data) {
        var facility_value = $(this).val();
        var is_checked = $(this).prop('checked');
        facilities_checked.push({'value' : facility_value, 'is_checked' : is_checked });
      });
      console.log(facilities_checked);
    })();

    (function() {
      // get region checkbox values
      var regions_checked = [];
      $('.list_regions input').each(function(data) {
        var region_name = $(this).data('spatial');
        var is_checked = $(this).prop('checked');
        regions_checked.push({'name' : region_name, 'is_checked' : is_checked });
      });
      console.log(regions_checked);
    })();

    (function() {
      // get sites checkbox values
      var sites_checked = [];
      $('.list_sites input').each(function(data) {
        var site_id = $(this).data('id');
        var is_checked = $(this).prop('checked');
        sites_checked.push({'id' : site_id, 'is_checked' : is_checked });
      });
      console.log(sites_checked);
    })();

  },

	render: function() {
		console.log('rendering left side view');
		this.$el.html(this.model.html);
		return this;
	}
});

IONUX2.Views.Sites = Backbone.View.extend({
  el: '#site',
  template: _.template(IONUX2.getTemplate('templates/sites.html')),
  events: {
    'click .checkAllSites': 'select_all_sites',
    'click .resource_id': 'get_instrument'
  },

  initialize: function() {
    console.log('initializing sites view');
    this.render();
  },

  select_all_sites: function(e) {
    var $check = $(e.currentTarget);
    if ($check.is(':checked')) {
      $('.list_sites').find('input').prop('checked', true);
    }
    else {
      $('.list_sites').find('input').prop('checked', false);
    }
  },

  get_instrument: function(e) {
    var resourceId = $(e.currentTarget).data('id');
    var $check = $(e.currentTarget);
    IONUX2.Collections.instruments = new IONUX2.Collections.Instruments([], {resource_id: resourceId});
    IONUX2.Views.instruments = new IONUX2.Views.Instruments({collection: IONUX2.Collections.instruments});
    
    if ($check.is(':checked')) {
      IONUX2.Collections.instruments.fetch({
        success : function(collection) {
          $('#instrument .spatialDetails').append(IONUX2.Views.instruments.render().el);
        }
      });
    }
    else {
      //IONUX2.Collections.instruments.reset();
      $('.instrument_list').remove();
      /*IONUX2.Collections.instruments.fetch({
        success : function(collection) {
          IONUX2.Views.instruments.removeView();
          $('#instrument .spatialDetails').append(IONUX2.Views.instruments.render().el);
          //$('#instrument .spatialDetails').append(IONUX2.Views.instruments.render().el);
        }
      //$('#instrument .spatialDetails').html(IONUX2.Views.instruments.removeView().el);
      
    });*/
    }
  },

  render: function() {
    console.log('rendering sites');
    this.$el.html(this.template(this.collection.toJSON()));
    return this;
  }
});

IONUX2.Views.InstrumentView = Backbone.View.extend({
  tagName : "li",
  className : "instrument_item",
  /*initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
  },*/
  removeInstrumentView: function() {
    console.log('got instrument view to remove');
    $(this.el).html('replace list item');
    return this;
  },
  render : function() {
    // render the sites text as the content of this element.
    $(this.el).html('<input type="checkbox" /> ' + this.model.get("name") + '<br/>');
    return this;
  }
});

IONUX2.Views.Instruments = Backbone.View.extend({
  tagName: "ul",
  className: "instrument_list",
  initialize: function() {
    //this.listenTo(this.collection, 'reset', this.removeView);
  },
  removeView: function() {
    console.log('collection was reset and now the view needs to be removed');
    /*this.collection.each(function(instrument_name) {
      console.log("removing instrument " + instrument_name);
      var instrumentView = new IONUX2.Views.InstrumentView({ model : instrument_name });
      instrumentView.removeInstrumentView();
      //this.remove();
    }, this);*/
    //this.remove();
    //this.unbind();
    //$('.instrument_list').empty();
    //$(this.el).empty();
    //$(this.el).prepend(instrumentView.render().el);
    //this.$el.remove();
    //console.log("this dom element is " + this.$el.html());
  },
  render: function() {
    this.collection.each(function(instrument_name) {
      var instrumentView = new IONUX2.Views.InstrumentView({ model : instrument_name });
      $(this.el).prepend(instrumentView.render().el);
    }, this);
    return this;
  }
  /*add : function(models, options) {
    var newModels = [];
    _.each(models, function(model) {
      if (_.isUndefined(this.get(model.id))) {
        newModels.push(model);    
      }
    }, this);
    return Backbone.Collection.prototype.add.call(this, newModels, options);
  }*/
});



/*IONUX2.Views.Facility = Backbone.View.extend({
  el: '#facility',
  template: _.template(IONUX2.getTemplate('templates/facility.html')),
  events: {
    'click .checkAllFacilities': 'select_all_facilities'
  },
  initialize: function() {
    this.render();
  },

  select_all_facilities: function(e) {
    var $check = $(e.currentTarget);
    if ($check.is(':checked')) {
      $('.list_facilities').find('input').prop('checked', true);
    }
    else {
      $('.list_facilities').find('input').prop('checked', false);
    }
  },

  render: function() {
    this.$el.html(this.template(this.collection.toJSON()));
    return this;
  }

});*/
>>>>>>> fixing select all data types

IONUX2.Views.Region = Backbone.View.extend({
	el: '#region',
	template: _.template(IONUX2.getTemplate('templates/regions.html')),
	events: {
      'click .checkAll': 'select_all_regions',
      'click #region_item': 'toggle_sites'
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

  toggle_sites: function(e) {
    var $check = $(e.currentTarget);
    var $checked_item = $check.data('spatial');
    var select_data = '[data-sites="' + $checked_item + '"]';
    if ($check.is(':checked')) {
      console.log('checkbox is checked');
      $(select_data).prop('checked', true);
    }
    else {
      $(select_data).prop('checked', false);
    }
  },

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

IONUX2.Views.OrgSelector = Backbone.View.extend({
  el: '#orgSelector',
  template: _.template(IONUX2.getTemplate('templates/partials/block_dashboard_org_list2.html')),
  events: {
    'click .checkAllFacilities': 'select_all_facilities'
  },
	initialize: function() {
		console.log('initializing org selector view');
		this.collection.on('change:data', this.render, this);
	},
  select_all_facilities: function(e) {
    var $check = $(e.currentTarget);
    if ($check.is(':checked')) {
      $('.list_facilities').find('input').prop('checked', true);
    }
    else {
      $('.list_facilities').find('input').prop('checked', false);
    }
  },
	render: function(){
		this.$el.html(this.template({resources: this.collection.toJSON()}));
		return this;
	}
});	

/*IONUX2.Views.AccordionWhite = Backbone.View.extend({
  el: '#accordionSearch',
  template: _.template(IONUX2.getTemplate('templates/block_accordion_white2.html')),
  accordionTemplate: _.template(IONUX2.getTemplate('templates/partials/block_accordion_container2.html')),
  initialize: function() {
    console.log('initializing white accordion view');
  },
  render: function(){
    console.log('rendering white accordion to ' + this.el);
    this.$el.html(this.template());
    return this;
  },

});*/
