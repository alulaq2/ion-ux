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
    'click #saveSearch': 'saveSearch',
    'click #saveName': 'saveName'
	},
	initialize: function() {
		this.model.on('change:html', this.render, this);
	},
	expandHide: function(e) {
		e.preventDefault();
		var $link = $(e.currentTarget);
		$link.parent().find('.leftAccordionContents').slideToggle('fast', function() {
			if ($(this).is(':visible')) {
            	$link.find('.expandHide').removeClass('arrowRight').addClass('arrowDown');              
        	} else {
        		$link.find('.expandHide').removeClass('arrowDown').addClass('arrowRight');
       		}        
		});
	},
  saveName: function() {
      $('#customSearchName').hide();
      $('#saveButtons').show();

  
      var name = $('.customName').val();
      var d = new Date();
      var month = d.getMonth() + 1;
      var day = d.getDate();
      var year = d.getFullYear();
      var hour = d.getHours();
      var minute = d.getMinutes();
      var time = d.getTime();

      //var sortable_order = $( "#accordionContainer" ).sortable( "toArray" );  

      // store spatial input values and set to model
      var spatial_dropdown = $('.latLongMenu option:selected').attr('value'),
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

    IONUX2.Models.saveSpatialSearch.set(spatial);
    console.log("spatial model");
    console.log(IONUX2.Models.saveSpatialSearch);

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

    IONUX2.Models.saveTemporalSearch.set(temporal);
    console.log("temporal model");
    console.log(IONUX2.Models.saveTemporalSearch);

    // get facility checkbox values and add to collection
    (function() {
      var facilities_checked = [];
      $('.list_facilities input').each(function(data) {
        var facility_value = $(this).val();
        var is_checked = $(this).prop('checked');
        facilities_checked.push({/*'facility_accordion_visible' : facility_accordion_visible,*/ 'value' : facility_value, 'is_checked' : is_checked });
      });
      IONUX2.Collections.saveFacilitySearch.set(facilities_checked);
    })();

    // get region checkbox values and add to collection
    (function() {
      var regions_checked = [];
      $('.list_regions input').each(function(data) {
        var region_name = $(this).data('spatial');
        var is_checked = $(this).prop('checked');
        regions_checked.push({/*'region_accordion_visible' : region_accordion_visible,*/ 'region_name' : region_name, 'is_checked' : is_checked });
      });
      IONUX2.Collections.saveRegionSearch.set(regions_checked);
    })();

    (function() {
      // get sites checkbox values and add to collection
      var sites_checked = [];
      $('.list_sites input').each(function(data) {
        var site_id = $(this).data('id');
        var is_checked = $(this).prop('checked');
        sites_checked.push({/*'sites_accordion_visible' : sites_accordion_visible,*/ 'id' : site_id, 'is_checked' : is_checked });
      });
      IONUX2.Collections.saveSiteSearch.set(sites_checked);
    })();

    (function() {
      // get data type checkbox values and add to collection
      var datatype_checked = [];
      $('.listDataTypes input').each(function(data) {
        var datatype_value = $(this).val();
        var is_checked = $(this).prop('checked');
        datatype_checked.push({/*'datatype_accordion_visible' : datatype_accordion_visible,*/ 'datatype_value' : datatype_value, 'is_checked' : is_checked });
      });
      IONUX2.Collections.saveDataTypeSearch.set(datatype_checked);
    })();

      var facilities = IONUX2.Collections.saveFacilitySearch.toJSON();
      var regions = IONUX2.Collections.saveRegionSearch.toJSON();
      var sites = IONUX2.Collections.saveSiteSearch.toJSON();
      var dataTypes = IONUX2.Collections.saveDataTypeSearch.toJSON();

      var values = {
        'searchName': searchName,
        //'sortableOrder': sortableOrder,
        'spatial' : spatial,
        'temporal': temporal,
        'facilities' : facilities,
        'regions': regions,
        'sites': sites,
        'dataTypes': dataTypes
      };

      // add search values to saved search collection
      IONUX2.Collections.saveNames.add(values);
      console.log("saved search collection");
      console.log(IONUX2.Collections.saveNames);     

      //remove previous input text so that name placeholder shows
      $('.customName').val(''); 
  },

  saveSearch: function() {
    $('#saveButtons').hide();
    $('#customSearchName').show();
  },

	render: function() {
		console.log('rendering left side view');
		this.$el.html(this.model.html);
		return this;
	}
});

IONUX2.Views.LeftAccordion = Backbone.View.extend({
  el: '#accordionContainer',
  //template: _.template(IONUX2.getTemplate('templates/leftAccordions.html')),
  template: _.template('<article class="leftAccordion"><span class="accordionTitle">' +
   '<div class="expandHide arrowRight"></div><div class="accordionLabel"><%= title %></div></span>' +
  '<section class="leftAccordionContents" style="display:none;" id="<%= id %>"></section></article>'),
  initialize: function() {
    console.log('initializing left accordion view');
  },
  addAccordion: function(title, id) {
    params = {'data':{'title':title, 'id':id}};
    this.$el.append(this.template(params.data));
    //return this;
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
          $('#instrument').append(IONUX2.Views.instruments.render().el);
        }
      });
    }
    else {
      //IONUX2.Collections.instruments.reset();
      var $resourceIdElem = $('.' + IONUX2.Collections.instruments.resource_id + '');
      console.log("resource id element is " + $resourceIdElem);
      $resourceIdElem.remove();
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
      $(this.el).addClass(IONUX2.Collections.instruments.resource_id).prepend(instrumentView.render().el);
    }, this);
    return this;
  }
});

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

IONUX2.Views.Temporal = Backbone.View.extend({
  el: '#temporal',
  template: _.template(IONUX2.getTemplate('templates/temporal.html')),
  initialize: function() {
    console.log('initializing temporal view');
    this.render();
  },
  render: function() {
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
