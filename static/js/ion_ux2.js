// Timestamp conversion methods to call when parsing response.
// Maybe put these into IONUX2.Helpers namespace?
var epoch_to_iso = function(epoch_time){
    try {
      return new Date(parseInt(epoch_time)).toISOString().replace(/T/, ' ').replace(/.\d{3}Z$/, 'Z');
    } catch (err) {
      return epoch_time;
    };
};

var make_iso_timestamps = function(resp) {
  if(resp != null && 'type_' in resp) {
    if('ts_created' in resp) {
      resp['ts_created'] = epoch_to_iso(resp['ts_created']);
    }
    if('ts_updated' in resp) {
      resp['ts_updated'] = epoch_to_iso(resp['ts_updated']);
    }
  }

  _.each(resp, function(val, key) {
      if (typeof val == 'object') {
        make_iso_timestamps(val);
      };
  });
  return;
};

var get_template = function(url) {
	var full_url = '/' + url;
    var data = "<h1> failed to load url : " + full_url + "</h1>";
    $.ajax({
        async: false,
        url: full_url,
        success: function(response) {
            data = response;
        }
    });
    return data;
};

// Look up chained values found in data-path
function get_descendant_properties(obj, desc) {
  var arr = desc.split(".");
  while(arr.length && (obj = obj[arr.shift()]));
  return obj;
};

Dispatcher = {
	add_handlers: function(object){

	}
};

IONUX2 = {
	Models: {},
	Collections: {},
	Views: {},
	Dashboard: {},
	Router: {},
	Dispatcher: {},
	registerEvents: function(source){
		var _self = this;
		source.on("all", function(eventName) {
		  var args = Array.prototype.slice.apply(arguments).splice(1);
		  args.unshift(eventName);
		  _self.trigger.apply(_self, args);
		});
	},
	init: function(){

		_.extend(this, Backbone.Events);

		Backbone.Model.prototype.initialize = function(initialize) {
			return function(){
				IONUX2.registerEvents(this);
				return initialize.apply(this, arguments);
			};
		}(Backbone.Model.prototype.initialize);

		this.on("all", function(eventName){
			console.log(this.prototype);
			if (this instanceof IONUX2.Models.Login) {
				console.log("Captured event: " + eventName);
				console.log(this);
			}
		});

	    var router = new IONUX.Router();
	    IONUX2.ROUTER = router;

		IONUX2.Models.SessionInstance = new IONUX2.Models.Session();

		/*
		IONUX2.Models.HeaderInstance = new IONUX2.Models.Header();

		IONUX2.Views.HeaderInstance = new IONUX2.Views.Header({model: IONUX2.Models.HeaderInstance});

		IONUX2.Models.HeaderInstance.fetch({
			async: false,
			dataType: 'html'
		});
		*/

		IONUX2.Models.LoginTemplateInstance = new IONUX2.Models.LoginTemplate();
		IONUX2.Models.LoginInstance = new IONUX2.Models.Login();
		IONUX2.Models.LoginInstance.setModels(IONUX2.Models.LoginTemplateInstance, IONUX2.Models.SessionInstance);

		IONUX2.Views.LoginInstance = new IONUX2.Views.Login({model: IONUX2.Models.LoginInstance});

	    IONUX2.Models.LoginInstance.fetch();

		/*IONUX2.Models.saveCustomName.fetch({
			async: false,
			dataType: 'html'
		});*/

		IONUX2.Models.SearchTabContentInstance = new IONUX2.Models.SearchTabContent();
		IONUX2.Views.SearchTabContentInstance = new IONUX2.Views.SearchTabContent({model: IONUX2.Models.SearchTabContentInstance});
		IONUX2.Models.SearchTabContentInstance.fetch({
			async: false,
			dataType: 'html'
		});

		// $("#leftSubheader").html(IONUX2.getTemplate('templates/block_nav_tabs2.html')).show();
		$("#lowerMain").html(IONUX2.getTemplate('templates/block_accordion_white2.html')).show();

	    // Bootstrap navigation menu
	    $.ajax({
			async: false,
			url: '/ui/navigation/',
			success: function(resp) {
		        // MAPS Sidebar (initially shown)
		        IONUX2.Dashboard.Observatories = new IONUX2.Collections.Observatories(_.sortBy(resp.data.observatories,function(o){return o.spatial_area_name + (o.local_name ? o.local_name : '') + o.name}));
      		},
      	});
	    IONUX2.Views.spatial = new IONUX2.Views.Spatial();

	    IONUX2.Models.SessionInstance.fetch({
      		async: false
    	});

	    IONUX2.Models.SessionInstance.set_polling();
	    
        //new IONUX.Views.OrgSelector({collection: IONUX.Dashboard.Orgs, title: 'Facility'}).render().el;

	    //IONUX2.Views.RegionObservatory = new IONUX.Views.ObservatorySelector({collection: IONUX2.Dashboard.Observatories});
      	this.dashboard_map();
	},

	getTemplate: function(url) {
		var full_url = '/' + url;
		var data = "<h1> failed to load url : " + full_url + "</h1>";
    	$.ajax({
        	async: false,
        	url: full_url,
        	dataType: 'text',
        	success: function(response) {
            	data = response;
        	}
    	});
    	return data;
	},

	dashboard_map: function(){	    
	    $('#upperMain').html(get_template('templates/block_map2.html')).show();
	    if (!IONUX2.Dashboard.MapResources || !IONUX2.Dashboard.MapResource) {
	      IONUX2.Dashboard.MapResources = new IONUX2.Collections.MapResources([], {resource_id: null});
	      IONUX2.Dashboard.MapResource = new IONUX2.Models.MapResource();
	      IONUX2.Dashboard.MapDataResources = new IONUX2.Collections.MapDataProducts([], {resource_id: null});
	    };
	    
	    if (!IONUX2.Dashboard.MapView){
	      IONUX2.Dashboard.MapView = new IONUX2.Views.Map({
	        collection: IONUX2.Dashboard.Observatories,
	        model: IONUX2.Dashboard.MapResource
	      });
	    }else{
	      IONUX2.Dashboard.MapView.active_marker = null; // Track clicked icon
	      IONUX2.Dashboard.MapView.map_bounds_elmt = $('#map_bounds');
	      IONUX2.Dashboard.MapView.draw_map();
	      IONUX2.Dashboard.MapView.draw_markers();
	    }
	}
  
};