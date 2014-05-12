var UINAV = {
	reorder: function(orderArray, configurationList, elementContainer) {
        $.each(orderArray, function(key, val){
            console.log("value is " + val);
            elementContainer.append($("#"+val));
            for (item in configurationList) {
            	if (configurationList[item]) {
            		$('#'+item + ' .leftAccordionContents').show();
            	}
            	else {
            		$('#'+item + ' .leftAccordionContents').hide();
            	}
            }
     	});
    },
    reorder_bottom: function(orderArray, configurationList, elementContainer) {
        $.each(orderArray, function(key, val){
            console.log("value is " + val);
            elementContainer.append($("#"+val));
            for (item in configurationList) {
                if (configurationList[item]) {
                    $('#'+item + ' .accordionContents').show();
                }
                else {
                    $('#'+item + ' .accordionContents').hide();
                }
            }
        });
    },
    loadSpatial: function(spatialModel) {
        $('.latLongMenu option[value="' + spatialModel.spatial_dropdown + '"]').attr('selected', 'selected');
        if (spatialModel.spatial_dropdown == 2) {
        	$('.top_search_to, .placeholder_lat, .north_south_menu, .show_hide_longitude').hide();
            $('.topSearchRadius, .noPlaceholderRadius, .milesKilosMenu').show();
    	}
   	 	else {
            $('.topSearchRadius, .noPlaceholderRadius, .milesKilosMenu').hide();
      		$('.top_search_to, .placeholder_lat, .north_south_menu, .show_hide_longitude').show();
    	}
        $('#south').val(spatialModel.from_latitude),
        $('.from_ns option[value="' + spatialModel.from_ns + '"]').attr('selected', 'selected');
        $('#west').val(spatialModel.from_longitude),
        $('.from_ew option[value="' + spatialModel.from_ew + '"]').attr('selected', 'selected');
        $('.placeholder_lat').val(spatialModel.to_latitude),
        $('.north_south_menu option[value="' + spatialModel.to_ns + '"]').attr('selected', 'selected');
        $('.show_hide_longitude').val(spatialModel.to_longitude),
        $('.to_ew option[value="'+ spatialModel.to_ew + '"]').attr('selected', 'selected');
        $('.no_placeholder_radius').val(spatialModel.radius),
        $('.milesKilosMenu').val(spatialModel.miles_kilos),
        $('[data-verticalfrom]').val(spatialModel.vertical_from),
        $('[data-verticalto]').val(spatialModel.vertical_to),
        $('.feet_miles option[value="' + spatialModel.feet_miles + '"]').attr('selected', 'selected');
    },
    loadTemporal: function(temporalModel) {
        $('.temporal_menu option[value="' + temporalModel.temporal_dropdown + '"]').attr('selected', 'selected');
        $('.from_date_menu .year option[value="' + temporalModel.from_year + '"]').attr('selected', 'selected');
        $('.from_date_menu .month option[value="' + temporalModel.from_month + '"]').attr('selected', 'selected');
        $('.from_date_menu .day option[value="' + temporalModel.from_day + '"]').attr('selected', 'selected');
        $('.from_date_menu .hour option[value="' + temporalModel.from_hour + '"]').attr('selected', 'selected');
        $('.to_date_menu .year option[value="' + temporalModel.to_year + '"]').attr('selected', 'selected');
        $('.to_date_menu .month option[value="' + temporalModel.to_month + '"]').attr('selected', 'selected');
        $('.to_date_menu .day option[value="' + temporalModel.to_day + '"]').attr('selected', 'selected');
        $('.to_date_menu .hour option[value="' + temporalModel.to_hour + '"]').attr('selected', 'selected');
    },
    loadFacilities: function(facilitiesModel) {        
        $('.list_facilities input').each(function(index) {
            $(this).prop('checked', facilitiesModel[index].is_checked);
        });
    },
    loadRegions: function(regionsModel) {
        $('.list_regions input').each(function(index) {
        	$(this).prop('checked', regionsModel[index].is_checked);
        });
    },
    loadSites: function(sitesModel) {
        $('.list_sites input').each(function(index) {
            $(this).prop('checked', sitesModel[index].is_checked);
        });
    },
    loadDataTypes: function(dataTypesModel) {
        $('.listDataTypes input').each(function(index) {
            $(this).prop('checked', dataTypesModel[index].is_checked);
        });
    },
    postUserProfile: function(userProfile) {
    	$.ajax({
            async: false,
            type: "POST",
            url: '/profile/' + IONUX2.Models.SessionInstance.attributes.user_id + '/',
            data: {data: userProfile},
            success: function(data) {
                console.log(data);
            },
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded'
        });
    },
    getUserProfile: function() {
    	$.ajax({
            async: false,
            type: "GET",
            url: '/profile/' + IONUX2.Models.SessionInstance.attributes.user_id + '/',
            success: function(data) {
                console.log("getting json saved search data from server");
                console.log(data);
                UINAV.loadConfiguration(data);
            },
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded'
        });
    },
    loadConfiguration: function(configuration) {
        var configurationModel = JSON.parse(configuration.data);
        var $accordion_container = $('.jspPane');
        var $bottom_accordion = $('#accordionContainerWhite');
        var sortableOrder = configurationModel.sortable_order;
        var bottom_sortable = configurationModel.bottom_sortable;
        var configurationList = configurationModel.configuration;
        var bottomConfigList = configurationModel.bottom_config;
        console.log("configuration list");
        console.log(configurationList);
        this.reorder(sortableOrder, configurationList, $accordion_container);
        this.reorder_bottom(bottom_sortable, bottomConfigList, $bottom_accordion);
    }
};