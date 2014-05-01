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
                //this.populateSearch(data);
            },
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded'
        });
    },
    populateSearch: function(search_info) {
        var searchModel = JSON.parse(search_info.data);
        var spatialModel = searchModel.spatial,
       		temporalModel = searchModel.temporal,
            facilitiesModel = searchModel.facilities,
            regionsModel = searchModel.regions,
            sitesModel = searchModel.sites,
            dataTypesModel = searchModel.dataTypes,
        	sortableOrder = searchModel.sortableOrder;
    }
};

/*$(function(){

	$('#mySearchesTab').on('click', function(e) {
        e.preventDefault();
        console.log('clicked mySearchesTab');
        // render my searches view
        IONUX2.Views.mySearches.render();
        
        // loop through list of saved searches
        $('.list_mysearches a').each(function(index) {
            
        	$(this).on('click', function(e) {
        		e.preventDefault();

        		// retrieve model at current index from collection
                var searchModel = IONUX2.Collections.saveNames.at(index);

                // convert search model into string to pass to ajax call
                var body = JSON.stringify(searchModel);

                // post user profile to server
                //UINAV.postUserProfile(body);

                // get user profile from server
                //UINAV.getUserProfile();

                // separate accordion modules into their own models
                var spatialModel = searchModel.attributes.spatial,
                    temporalModel = searchModel.attributes.temporal,
                    facilitiesModel = searchModel.attributes.facilities,
                    regionsModel = searchModel.attributes.regions,
                    sitesModel = searchModel.attributes.sites,
                    dataTypesModel = searchModel.attributes.dataTypes,
                    sortableOrder = searchModel.attributes.sortableOrder;

                    // trigger saved jquery sort order
                    var $accordion_container = $('.jspPane');
                    UINAV.reorder(sortableOrder.sortable_order, $accordion_container);
                    
                    // populate accordion modules with saved data
                    UINAV.loadSpatial(spatialModel);
                    UINAV.loadTemporal(temporalModel);
                    UINAV.loadFacilities(facilitiesModel);
                    UINAV.loadRegions(regionsModel);
                    UINAV.loadSites(sitesModel);
                    UINAV.loadDataTypes(dataTypesModel);

                    $('#searchTab').trigger('click');

                    /*(function() {
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
                        })();*/

                    // populate temporal module with saved data
                   /*     (function() {
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
                    })();*/

                    //(function() {
                        /*if (facilitiesModel[0].facility_accordion_visible) {
                            $('#orgSelector .spatialDetails').show();
                        }
                        else {
                            $('#orgSelector .expandHide').removeClass('arrowDown').addClass('arrowRight');
                            $('#orgSelector .spatialDetails').hide();
                        }*/
                       /* $('.list_facilities input').each(function(index) {
                            $(this).prop('checked', facilitiesModel[index].is_checked);
                        });
                    })();*/

                    /*(function() {
                        if (regionsModel[0].region_accordion_visible) {
                            $('#region .spatialDetails').show();
                        }
                        else {
                            $('#region .expandHide').removeClass('arrowDown').addClass('arrowRight');
                            $('#region .spatialDetails').hide();
                        }
                        $('.list_regions input').each(function(index) {
                            $(this).prop('checked', regionsModel[index].is_checked);
                        });
                    })();*/

                    /*(function() {
                        if (sitesModel[0].sites_accordion_visible) {
                            $('#site .spatialDetails').show();
                        }
                        else {
                            $('#site .expandHide').removeClass('arrowDown').addClass('arrowRight');
                            $('#site .spatialDetails').hide();
                        }
                        $('.list_sites input').each(function(index) {
                            $(this).prop('checked', sitesModel[index].is_checked);
                        });
                    })();*/

                    /*(function() {
                        if (dataTypesModel[0].datatype_accordion_visible) {
                            $('#dataTypesList .spatialDetails').show();
                        }
                        else {
                            $('#dataTypesList .expandHide').removeClass('arrowDown').addClass('arrowRight');
                            $('#dataTypesList .spatialDetails').hide();
                        }
                        $('.listDataTypes input').each(function(index) {
                            $(this).prop('checked', sitesModel[index].is_checked);
                        });
                    })();*/

                
                //}
  /*              });
            });
            
        });
});*/