var UINAV = {
	reorder: function(orderArray, configurationList, elementContainer) {
        // load configuration and sortable order for left accordion
        $.each(orderArray, function(key, val){
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
    /*loadBooleanExpression: function(booleanExpressionModel) {
        $('.')
    }*/
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
            success: function(request) {
                if (request.data) {
                    UINAV.loadConfiguration(request);
                }
            },
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded'
        });
    },
    loadConfiguration: function(configuration) {
        var configurationModel = JSON.parse(configuration.data);
        var $accordion_container = $('.jspPane');
        var sortableOrder = configurationModel[0].sortable_order;
        var configurationList = configurationModel[0].configuration;
        IONUX2.Collections.userProfileInstance.set(configurationModel);
        IONUX2.Views.loadSearchCollection = new IONUX2.Views.LoadSearchCollection({collection: IONUX2.Collections.userProfileInstance});
    }
};