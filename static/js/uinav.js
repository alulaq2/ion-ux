var UINAV = {
	reorder: function(orderArray, configurationList, elementContainer) {
        console.log("reordering");
        console.log(elementContainer);
        // load configuration and sortable order for left accordion
        $.each(orderArray, function(key, val){
            elementContainer.append($("#"+val));
            for (item in configurationList) {
            	if (configurationList[item]) {
                    console.log("item is " + item);
            		$('#'+item + ' .leftAccordionContents').show();
            	}
            	else {
            		$('#'+item + ' .leftAccordionContents').hide();
            	}
            }
     	});
    },
    reorder_bottom: function(orderArray, configurationList, elementContainer) {
        // load configuration and sortable order for bottom accordion
        $.each(orderArray, function(key, val){
            elementContainer.append($("#"+val));
            for (item in configurationList) {
                if (configurationList[item]) {
                    $('#'+configurationList[item].id).show();
                }
                else {
                    $('#'+configurationList[item].id).hide();
                }
            }
        });
    },
    loadVisibility: function(configurationList) {
        for (item in configurationList) {
            if (configurationList[item]) {
                console.log("item visible is " + item);
                $('#'+item + ' .leftAccordionContents').show();
            }
        }
    },
    loadSpatial: function(spatialModel) {
        IONUX2.Models.spatialModelInstance.updateAttributes(spatialModel);
    },
    loadTemporal: function(temporalModel) {
        IONUX2.Models.temporalModelInstance.updateAttributes(temporalModel);
    },
    loadFacilities: function(facilitiesModel) {       
        $('.list_facilities input').each(function(index) {
            $(this).prop('checked', facilitiesModel[index].is_checked);
        });
    },
    loadSites: function(sitesModel) {
        $('.list_sites input').each(function(index) {
            $(this).prop('checked', sitesModel[index].is_checked);
        });
    },
    loadPlatformTypes: function(platformTypesModel) {
        $('.listPlatformTypes input').each(function(index) {
            $(this).prop('checked', platformTypesModel[index].is_checked);
        });
    },
    loadDataTypes: function(dataTypesModel) {
        $('.listDataTypes input').each(function(index) {
            $(this).prop('checked', dataTypesModel[index].is_checked);
        });
    },
    loadBooleanExpression: function(booleanExpressionModel) {
        $('select[name="filter_var"]').val(booleanExpressionModel[0].boolean_main_filter);
        $('select[name="filter_operator"]').val(booleanExpressionModel[0].boolean_sub_filter);
        $('.booleanInput').val(booleanExpressionModel[0].boolean_input);
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
    postUserConfiguration: function(userConfiguration) {
        $.ajax({
            async: false,
            type: "POST",
            url: '/profile/' + IONUX2.Models.SessionInstance.attributes.user_id + '_ui/',
            data: {data: userConfiguration},
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
            success: function(request) {
                if (request.data) {
                    UINAV.loadSavedSearches(request);
                }
            },
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded'
        });
    },
    getUserConfiguration: function() {
        $.ajax({
            async: false,
            type: "GET",
            url: '/profile/' + IONUX2.Models.SessionInstance.attributes.user_id + '_ui/',
            success: function(request) {
                if (request.data) {
                    UINAV.loadConfiguration(request);
                }
            },
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded'
        });
    },
    loadSavedSearches: function(savedSearch) {
        console.log("loading saved searches");
        var savedSearchList = JSON.parse(savedSearch.data);
        var $accordion_container = $('.jspPane');
        var sortableOrder = savedSearchList[0].sortable_order;
        var bottom_sortable = savedSearchList[0].bottom_sortable;
        var configurationList = savedSearchList[0].configuration;
        var bottomConfigList = savedSearchList[0].bottom_config;
        IONUX2.Collections.userProfileInstance.set(savedSearchList);
        IONUX2.Views.loadSearchCollection = new IONUX2.Views.LoadSearchCollection({collection: IONUX2.Collections.userProfileInstance});
        
        // trigger accordion visibility
        //var $accordion_container = $('.accordionContainer .jspPane');
        //this.loadVisibility(configurationList);
    },
    loadConfiguration: function(configuration) {
        console.log("loading configuration");
        var configurationModel = JSON.parse(configuration.data);
        var sortableOrder = configurationModel[0].sortable_order;
        var bottom_sortable = configurationModel[0].bottom_sortable;
        var configurationList = configurationModel[0].configuration;
        var bottomConfigList = configurationModel[0].bottom_config;
        
        // trigger saved jquery sort order
        var $accordion_container = $('.accordionContainer .jspPane');
        this.reorder(sortableOrder, configurationList, $accordion_container);

        //var $bottom_accordion = $('.accordionContainerWhite');
        //UINAV.reorder_bottom(bottom_sortable, bottomConfigList, $bottom_accordion);
    }
};