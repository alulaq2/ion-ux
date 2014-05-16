var UINAV = {
	reorder: function(orderArray, configurationList, elementContainer) {
        console.log("reordering");
        console.log(elementContainer);
        // load configuration and sortable order for left accordion
        $.each(orderArray, function(key, val){
            elementContainer.append($("#"+val));
     	});

        for (item in configurationList) {
            if (configurationList[item]) {
                $('#'+item + ' .leftAccordionContents').show();
                $('#'+item).find('.expandHide').removeClass('arrowRight').addClass('arrowDown');
            }
        }
    },
    reorder_bottom: function(orderArray, configurationList, elementContainer) {
        // load configuration and sortable order for bottom accordion

        $.each(orderArray, function(key, val){
            elementContainer.append($("#"+val));
        });

        for (item in configurationList) {
            if (configurationList[item].is_visible) {
                $('#'+configurationList[item].id).show();
                console.log("config id is");
                console.log($('#'+configurationList[item].id));
                $('#'+configurationList[item].id).parent().find('.expandHide').removeClass('arrowRight').addClass('arrowDown');
            }
        }
    },
    loadVisibility: function(configurationList) {
        for (item in configurationList) {
            if (configurationList[item]) {
                $('#'+item + ' .leftAccordionContents').show();
                $('#'+item).find('.expandHide').removeClass('arrowRight').addClass('arrowDown');
            }
        }
    },
    loadAccordionVisibility: function(configurationList) {
        // load configuration for bottom accordion
        for (item in configurationList) {
            if (configurationList[item].is_visible) {
                $('#'+configurationList[item].id).show();
                $('#'+configurationList[item].id).parent().find('.expandHide').removeClass('arrowRight').addClass('arrowDown');
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
    loadBooleanExpression: function(booleanExpressionCollection) {
        console.log("boolean expression collection");
        console.log(booleanExpressionCollection);
        $('.filter-item').each(function(index) {
            if (index != 0) {
                this.remove();
            }
        });
        var numFilters = (booleanExpressionCollection.length - $('.filter-item').length);
        if (numFilters > 0)  {
            for (var i=0; i<booleanExpressionCollection.length-1; i++) {
                $('.filter-add').eq(i).click();
            }
        }
        _.each(booleanExpressionCollection, function(booleanModel, key) {
            console.log("index is " + key);
            $('.filter-item').eq(key).find('select[name="filter_var"]').val(booleanModel.boolean_main_filter);

            if ((booleanModel.boolean_main_filter == "lcstate") || (booleanModel.boolean_main_filter == "processing_level_code") ||
             (booleanModel.boolean_main_filter == "quality_control_level") || (booleanModel.boolean_main_filter == "aggregated_status")
                || (booleanModel.boolean_main_filter == "type_")) {
                
                $('select[name="filter_arg"]').remove();
                $('.filter-item').eq(key).find('select[name="filter_operator"], .booleanInput').hide();
                
                var lcstateValues= ['DRAFT','PLANNED','DEVELOPED','INTEGRATED','DEPLOYED','RETIRED'];
                var processingValues = [
                    ['L0 - Unprocessed Data', 'L0'], ['L1 - Basic Data', 'L1'], ['L2 - Derived Data', 'L2']
                ];
                var qualityControl = [
                    ['a - No QC applied', 'a'], ['b - Automatic QC applied', 'b'], ['c - Human QC applied', 'c']
                ];
                var siteValues = ['Coastal Endurance', 'Coastal Pioneer', 'Global Argentine Basin', 'Global Irminger Sea', 'Global Southern Ocean',
                                'Global Station Papa', 'Regional Axial', 'Regional Hydrate Ridge', 'Regional Mid Plate'];
                var statusValues = ['Critical', 'OK', 'None expected', 'Warning'];
                var typeValues = [
                ['Attachment','Attachment'], ['Data Agent Instance','ExternalDatasetAgentInstance'], ['Data Agent','ExternalDatasetAgent'], ['Data Process','Data Process'],
                ['Data Product','DataProduct'], ['Data Transform','DataProcessDefinition'], ['Dataset Agent Instance','ExternalDatasetAgentInstance'], ['Dataset Agent','ExternalDatasetAgent'],
                ['Deployment','Deployment'], ['Event Type','EventType'], ['Event','Event'], ['Instrument Agent Instance','InstrumentAgentInstance'],
                ['Instrument Agent','InstrumentAgent'], ['Instrument Model','InstrumentModel'], ['Instrument','InstrumentDevice'], ['Organization [Facility]','Org'],
                ['Platform Agent Instance','PlatformAgentInstance'], ['Platform Agent','PlatformAgent'], ['Platform Model','PlatformModel'],
                ['Platform Port','PlatformSite'], ['Platform','PlatformDevice'], ['Port','InstrumentSite'], ['Role','UserRole'], ['Site','Observatory'], ['Station','StationSite'],
                ['Subscription','NotificationRequest'], ['User','UserInfo']
                ];
                var elementLength = $('.filter-item').eq(key).find('select[name="filter_arg"]:visible').length;
                if (elementLength == 0) {
                    $('.filter-add').before('<select class="booleanSelectContainer" name="filter_arg"></select>');
                }
                if (booleanModel.boolean_main_filter == "lcstate") {
                    for (val in lcstateValues) {
                        $('select[name="filter_arg"]').append('<option value="' + lcstateValues[val] + '">' + lcstateValues[val] + '</option');
                    }
                }
                if (booleanModel.boolean_main_filter == "processing_level_code") {
                    for (val in processingValues) {
                        $('select[name="filter_arg"]').append('<option value="' + processingValues[val][1] + '">' + processingValues[val][0] + '</option');
                    }
                }
                if (booleanModel.boolean_main_filter == "quality_control_level") {
                    for (val in qualityControl) {
                        $('select[name="filter_arg"]').append('<option value="' + qualityControl[val][1] + '">' + qualityControl[val][0] + '</option');
                    }
                }
                /*if (booleanModel.boolean_main_filter == "name") {
                    for (val in siteValues) {
                        $('select[name="filter_arg"]').append('<option value="' + siteValues[val] + '">' + siteValues[val] + '</option');
                    }
                }*/
                if (booleanModel.boolean_main_filter == "aggregated_status") {
                    for (val in statusValues) {
                        $('select[name="filter_arg"]').append('<option value="' + statusValues[val] + '">' + statusValues[val] + '</option');
                    }
                }
                if (booleanModel.boolean_main_filter == "type_") {
                    for (val in typeValues) {
                        $('select[name="filter_arg"]').append('<option value="' + typeValues[val][1] + '">' + typeValues[val][0] + '</option');
                    }
                }

                $('.filter-item').eq(key).find('select[name="filter_arg"]').val(booleanModel.boolean_input);
                
            }
            else {
                $('select[name="filter_arg"], .argument, select[name="filter_operator"], .booleanInput').remove();
                $('.filter-add').before('<select class="booleanSelectContainer" name="filter_operator"><option value="contains">contains</option><option value="like">like</option><option value="matches">matches</option><option value="starts with">starts with</option><option value="ends with">ends with</option></select><input type="text" class="booleanInput" name="filter_arg" value="">');
                $('.filter-item').eq(key).find('select[name="filter_operator"]').val(booleanModel.boolean_sub_filter);
                $('.filter-item').eq(key).find('.booleanInput').val(booleanModel.boolean_input);
            }
            $('.filter-item').eq(key).find('select[name="filter_var"]').on('change', function() {
                    $('.filter-item').eq(key).find('select[name="filter_operator"], .booleanInput').show();
                });
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
        
    },
    loadConfiguration: function(configuration) {
        console.log("loading configuration");
        var configurationModel = JSON.parse(configuration.data);
        var sortableOrder = configurationModel[0].sortable_order;
        var bottom_sortable = configurationModel[0].bottom_sortable;
       
        var configurationList = configurationModel[0].configuration;
        var bottomConfigList = configurationModel[0].bottom_config;
         console.log("bottom configuration list");
        console.log(bottomConfigList);
        
        // trigger saved jquery sort order
        var $accordion_container = $('.accordionContainer .jspPane');
        this.reorder(sortableOrder, configurationList, $accordion_container);

        var dataTypesList = [
            "CONDWAT", "DENSITY", "CDOMFLO", "CHLAFLO", "PH578SI", "FLUBSCT",
             "DOCONCS", "ABSTHRM", "PRACSAL", "PRESWAT", "TEMPWAT", "VELPROF", "PHWATER"];

        var assetTypesList = ["Platform", "Instrument"];

        var siteTypesList = ["Facility", "Observatory", "StationSite", "PlatformSite", "InstrumentSite"];

        var gotKey = function(dataList) {
            for (var key in dataList) {
                for (item in bottomConfigList) {
                    if (dataList[key] == $('#'+bottomConfigList[item].id).parent().attr('id')) {
                        return true
                    }
                }
            }   
        };

        if (gotKey(dataTypesList)) {
            console.log("got data");
            $('#dataSearchResultsTab').click();
            var $bottom_accordion = $('#dataSearchResultsAccordion .accordionContainerWhite');
            console.log("bottom accordion is");
            console.log($bottom_accordion);
        }
    
        if (gotKey(assetTypesList)) {
            console.log("got asset tab");
            $('#assetsSearchResultsTab').click();
            var $bottom_accordion = $('#assetsSearchResultsAccordion .accordionContainerWhite');
            console.log($bottom_accordion);
        }

        if (gotKey(siteTypesList)) {
            console.log("got site tab");
            $('#siteSearchResultsTab').click();
            var $bottom_accordion = $('#siteSearchResultsAccordion .accordionContainerWhite');
            console.log($bottom_accordion);
        }

        this.reorder_bottom(bottom_sortable, bottomConfigList, $bottom_accordion);
    }
};