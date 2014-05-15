var UINAV = {
	reorder: function(orderArray, configurationList, elementContainer) {
        console.log("order array in reorder");
        console.log(orderArray);
        console.log("element container");
        console.log(elementContainer);
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
        $.each(orderArray[0], function(key, val){
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
        IONUX2.Models.spatialModelInstance.updateAttributes(spatialModel);
    },
    loadTemporal: function(temporalModel) {
        IONUX2.Models.temporalModelInstance.updateAttributes(temporalModel);
    },
    loadFacilities: function(facilitiesModel) {    
    console.log("facilities model");
    console.log(facilitiesModel);    
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
            success: function(request) {
                console.log("getting json saved search data from server");
                console.log(request.data + " " + typeof(request.data));
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
        console.log("config object");
        console.log(configurationModel);
        var $accordion_container = $('.jspPane');
        //var $bottom_accordion = $('#accordionContainerWhite');
        /*var sortableOrder = configurationModel.sortable_order;
        var bottom_sortable = configurationModel.bottom_sortable;
        var configurationList = configurationModel.configuration;
        var bottomConfigList = configurationModel.bottom_config;*/
        var sortableOrder = configurationModel[0].sortable_order;
        console.log("sortable order in load config");
        console.log(sortableOrder);
        //var bottom_sortable = configurationModel[0].bottom_sortable;
        var configurationList = configurationModel[0].configuration;
        //var bottomConfigList = configurationModel[0].bottom_config;
        //this.reorder(sortableOrder[0], configurationList[0], $accordion_container);
        //this.reorder_bottom(bottom_sortable, bottomConfigList, $bottom_accordion);
        IONUX2.Collections.userProfileInstance.set(configurationModel);
        console.log("load config collection");
        console.log(IONUX2.Collections.userProfileInstance);
        //IONUX2.Models.saveConfiguration.set(configurationModel);
        //IONUX2.Views.loadSearches = new IONUX2.Views.LoadSearches({model: IONUX2.Models.saveConfiguration});
        IONUX2.Views.loadSearchCollection = new IONUX2.Views.LoadSearchCollection({collection: IONUX2.Collections.userProfileInstance});
    }
};