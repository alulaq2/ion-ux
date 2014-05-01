var UINAV = {
	reorder: function(orderArray, elementContainer) {
        $.each(orderArray, function(key, val){
            console.log("value is " + val);
            elementContainer.append($("#"+val));
     	});
    },
    loadSpatial: function(spatialModel) {
    	if (spatialModel.spatial_accordion_visible) {
            $('#spatial .spatialDetails').show();
        }
        else {
            $('#spatial .expandHide').removeClass('arrowDown').addClass('arrowRight');
            $('#spatial .spatialDetails').hide();
        }
            
        $('.latLongMenu option[value="' + spatialModel.spatial_dropdown + '"]').attr('selected', 'selected');
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
    	if (temporalModel.temporal_accordion_visible) {
            $('#temporal .spatialDetails').show();
        }
        else {
            $('#temporal .expandHide').removeClass('arrowDown').addClass('arrowRight');
            $('#temporal .spatialDetails').hide();
        }
                
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
    	/*if (facilitiesModel[0].facility_accordion_visible) {
            $('#orgSelector .spatialDetails').show();
        }
        else {
            $('#orgSelector .expandHide').removeClass('arrowDown').addClass('arrowRight');
            $('#orgSelector .spatialDetails').hide();
        }*/
        
        $('.list_facilities input').each(function(index) {
            $(this).prop('checked', facilitiesModel[index].is_checked);
        });
    },
    loadRegions: function(regionsModel) {
    	/*if (regionsModel[0].region_accordion_visible) {
            $('#region .spatialDetails').show();
        }
        else {
            $('#region .expandHide').removeClass('arrowDown').addClass('arrowRight');
            $('#region .spatialDetails').hide();
        }*/
        
        $('.list_regions input').each(function(index) {
        	$(this).prop('checked', regionsModel[index].is_checked);
        });
    },
    loadSites: function(sitesModel) {
    	/*if (sitesModel[0].sites_accordion_visible) {
            $('#site .spatialDetails').show();
        }
        else {
            $('#site .expandHide').removeClass('arrowDown').addClass('arrowRight');
            $('#site .spatialDetails').hide();
        }*/
        
        $('.list_sites input').each(function(index) {
            $(this).prop('checked', sitesModel[index].is_checked);
        });
    },
    loadDataTypes: function(dataTypesModel) {
    	/*if (dataTypesModel[0].datatype_accordion_visible) {
            $('#dataTypesList .spatialDetails').show();
        }
        else {
            $('#dataTypesList .expandHide').removeClass('arrowDown').addClass('arrowRight');
            $('#dataTypesList .spatialDetails').hide();
        }*/
        
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
        var sortableOrder = configurationModel.sortable_order;
        this.reorder(sortableOrder, $accordion_container);

        if (configurationModel.spatial_open) {
        	$('#spatial .spatialDetails').show();
        }
        else {
            $('#spatial .expandHide').removeClass('arrowDown').addClass('arrowRight');
            $('#spatial .spatialDetails').hide();
        }

        if (configurationModel.temporal_open) {
        	$('#temporal .spatialDetails').show();
        }
        else {
        	$('#temporal .expandHide').removeClass('arrowDown').addClass('arrowRight');
            $('#temporal .spatialDetails').hide();
        }

        if (configurationModel.facility_open) {
            $('#orgSelector .spatialDetails').show();
        }
        else {
            $('#orgSelector .expandHide').removeClass('arrowDown').addClass('arrowRight');
            $('#orgSelector .spatialDetails').hide();
        }

        if (configurationModel.region_open) {
            $('#region .spatialDetails').show();
        }
        else {
            $('#region .expandHide').removeClass('arrowDown').addClass('arrowRight');
            $('#region .spatialDetails').hide();
        }

        if (configurationModel.site_open) {
            $('#site .spatialDetails').show();
        }
        else {
            $('#site .expandHide').removeClass('arrowDown').addClass('arrowRight');
            $('#site .spatialDetails').hide();
        }

        if (configurationModel.datatype_open) {
            $('#dataTypesList .spatialDetails').show();
        }
        else {
            $('#dataTypesList .expandHide').removeClass('arrowDown').addClass('arrowRight');
            $('#dataTypesList .spatialDetails').hide();
        }
    }
};