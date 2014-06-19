var UINAV = {
    disableMapEventHandling: false,
	reorder: function(orderArray, configurationList, elementContainer) {
        // load configuration and sortable order for left accordion
        $.each(orderArray, function(key, val){
            elementContainer.append($("#"+val));
        });

        for (item in configurationList) {
            if (configurationList[item]) {
                this.disableMapEventHandling = true;
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

    loadLeftNav: function(searchModel, index) {
        var spatialModel = searchModel.saved_searches[index].spatial,
            temporalModel = searchModel.saved_searches[index].temporal,
            facilitiesModel = searchModel.saved_searches[index].facilities,
            sitesModel = searchModel.saved_searches[index].sites,
            platformTypesModel = searchModel.saved_searches[index].platformTypes,
            dataTypesModel = searchModel.saved_searches[index].dataTypes,
            booleanExpressionModel = searchModel.saved_searches[index].booleanExpression,
            configurationModel = searchModel.configuration,
            bottomConfigModel = searchModel.bottom_config;

            // populate accordion modules with saved data
            this.loadSpatial(spatialModel);
            this.loadTemporal(temporalModel);
            this.loadFacilities(facilitiesModel);
            this.loadSites(sitesModel);
            this.loadPlatformTypes(platformTypesModel);
            this.loadDataTypes(dataTypesModel);
            this.loadBooleanExpression(booleanExpressionModel);
            this.loadVisibility(configurationModel);
            this.loadAccordionVisibility(bottomConfigModel);
    },

    loadSpatial: function(spatialModel) {
        IONUX2.Models.spatialModelInstance.updateAttributes(spatialModel);
        IONUX2.Dashboard.MapView.map.setCenter(new google.maps.LatLng(spatialModel.center["k"], spatialModel.center["A"]));
    },
    loadTemporal: function(temporalModel) {
        IONUX2.Models.temporalModelInstance.updateAttributes(temporalModel);
    },
    loadFacilities: function(facilitiesModel) {       
        $('.list_facilities input').each(function(index) {
            $(this).prop('checked', facilitiesModel[index].is_checked);
        });
    },
    /*loadRegions: function(regionsModel) {
        $('.list_regions input').each(function(index) {
        	$(this).prop('checked', regionsModel[index].is_checked);
        });
    },*/
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
        $('select[name="filter_arg"]').each(function(index) {
            console.log("got filter arg " + index);
                $(this).remove();
        });
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
            
            $('.filter-item').eq(key).find('select[name="filter_var"] option[data-name="' + booleanModel.boolean_main_filter + '"]').attr('selected', 'selected');

            if ((booleanModel.boolean_main_filter == "lcstate") || (booleanModel.boolean_main_filter == "processing_level_code") ||
             (booleanModel.boolean_main_filter == "quality_control_level") || (booleanModel.boolean_main_filter == "site") || (booleanModel.boolean_main_filter == "aggregated_status") || (booleanModel.boolean_main_filter == "type_")) {
                
                $('.filter-item').eq(key).find('select[name="filter_operator"], .booleanInput').remove();
                
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
                console.log("element lenght is " + elementLength);
                if (elementLength == 0) {
                    $('.filter-add').before('<select class="booleanSelectContainer" name="filter_arg"></select>');
                }
                $('.filter-item').eq(key).find('select[name="filter_arg"]').empty();
                if (booleanModel.boolean_main_filter == "lcstate") {
                    console.log()
                    for (val in lcstateValues) {
                        $('.filter-item').eq(key).find('select[name="filter_arg"]').append('<option value="' + lcstateValues[val] + '">' + lcstateValues[val] + '</option');
                    }
                }
                if (booleanModel.boolean_main_filter == "processing_level_code") {
                    for (val in processingValues) {
                        $('.filter-item').eq(key).find('select[name="filter_arg"]').append('<option value="' + processingValues[val][1] + '">' + processingValues[val][0] + '</option');
                    }
                }
                if (booleanModel.boolean_main_filter == "quality_control_level") {
                    for (val in qualityControl) {
                        $('.filter-item').eq(key).find('select[name="filter_arg"]').append('<option value="' + qualityControl[val][1] + '">' + qualityControl[val][0] + '</option');
                    }
                }
                if (booleanModel.boolean_main_filter == "site") {
                    for (val in siteValues) {
                        $('.filter-item').eq(key).find('select[name="filter_arg"]').append('<option value="' + siteValues[val] + '">' + siteValues[val] + '</option');
                    }
                }
                if (booleanModel.boolean_main_filter == "aggregated_status") {
                    for (val in statusValues) {
                        $('.filter-item').eq(key).find('select[name="filter_arg"]').append('<option value="' + statusValues[val] + '">' + statusValues[val] + '</option');
                    }
                }
                if (booleanModel.boolean_main_filter == "type_") {
                    for (val in typeValues) {
                        $('.filter-item').eq(key).find('select[name="filter_arg"]').append('<option value="' + typeValues[val][1] + '">' + typeValues[val][0] + '</option');
                    }
                }

                $('.filter-item').eq(key).find('select[name="filter_arg"]').val(booleanModel.boolean_input);
                
            }
            else {
                var argument = $('.filter-item').eq(key).find('.argument').length;
                console.log("argument");
                console.log("key is " + key + " and argument is " + argument);
                if (argument == 1) {
                    $('.filter-add').eq(key).before('<select class="booleanSelectContainer" name="filter_operator"><option value="contains">contains</option><option value="like">like</option><option value="matches">matches</option><option value="starts with">starts with</option><option value="ends with">ends with</option></select><input type="text" class="booleanInput" name="filter_arg" value="">');
                    $('.filter-item').eq(key).find('.argument').remove();
                }
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
        //console.log("savedSearchList");

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
        var $accordion_container = $('.accordionContainer');
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
    },

    saveEntireSearch: function(customName) {
        $('#customSearchName').hide();
      $('#saveButtons').show();

      //var name = $('.customName').val();
      var d = new Date();
      var month = d.getMonth() + 1;
      var day = d.getDate();
      var year = d.getFullYear();
      var hour = d.getHours();
      var minute = d.getMinutes();
      if ((minute.length) == 1) {
        minute = '0' + minute;
      }
      var time = d.getTime();

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
        radius = $('#radius').val(),
        miles_kilos = $('.milesKilosMenu').val(),
        vertical_from = $('[data-verticalfrom]').val(),
        vertical_to = $('[data-verticalto]').val(),
        feet_miles = $('.feet_miles option:selected').val(),
        center = IONUX2.Dashboard.MapView.map.getCenter();

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
      'name': customName,
      'month': month,
      'day': day,
      'year': year,
      'hour': hour,
      'minute': minute
    };

    var spatial = {
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
      'feet_miles': feet_miles,
      'center': center
    };

    IONUX2.Models.spatialModelInstance.set(spatial);

    var temporal = {
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

    IONUX2.Models.temporalModelInstance.set(temporal);

    // get facility checkbox values and add to collection
    (function() {
      var facilities_checked = [];
      $('.list_facilities input').each(function(data) {
        var facility_value = $(this).val();
        var is_checked = $(this).prop('checked');
        facilities_checked.push({ 'value' : facility_value, 'is_checked' : is_checked });
      });
      IONUX2.Collections.saveFacilitySearch.set(facilities_checked);
    })();


    (function() {
      // get sites checkbox values and add to collection
      var sites_checked = [];
      $('.list_sites input').each(function(data) {
        var site_id = $(this).data('id');
        var is_checked = $(this).prop('checked');
        sites_checked.push({ 'id' : site_id, 'is_checked' : is_checked });
      });
      IONUX2.Collections.saveSiteSearch.set(sites_checked);
    })();

    (function() {
      // get platform types checkbox values and add to collection
      var platform_checked = [];
      $('.listPlatformTypes input').each(function(data) {
        var is_checked = $(this).prop('checked');
        platform_checked.push({ 'is_checked' : is_checked });
      });
      IONUX2.Collections.savePlatformSearch.set(platform_checked);
    })();

    (function() {
      // get data type checkbox values and add to collection
      var datatype_checked = [];
      $('.listDataTypes input').each(function(data) {
        var datatype_value = $(this).val();
        var is_checked = $(this).prop('checked');
        datatype_checked.push({ 'datatype_value' : datatype_value, 'is_checked' : is_checked });
      });
      IONUX2.Collections.saveDataTypeSearch.set(datatype_checked);
    })();

    (function() {
      // get boolean expression input values and add to collection
      var boolean_expression_list = [];
      $('#boolean_expression .filter-item').each(function(index) {
        var boolean_main_filter = $(this).find('.booleanSelectContainer[name="filter_var"] option:selected').data('name'),
          boolean_sub_filter = $(this).find('.booleanSelectContainer[name="filter_operator"] option:selected').attr('value');
          if (boolean_sub_filter == undefined) {
            boolean_sub_filter = "";
          }
          var boolean_input;
          if ((boolean_main_filter == "lcstate") || (boolean_main_filter == "processing_level_code") || (boolean_main_filter == "quality_control_level") || (boolean_main_filter == "site") || (boolean_main_filter == "aggregated_status") || (boolean_main_filter == "type_")) {
            boolean_input = $(this).find('.booleanSelectContainer[name="filter_arg"] option:selected').attr('value');
          console.log("boolean input is " + boolean_input);
          }
          else {
            boolean_input = $(this).find('.booleanInput').val();
            console.log("boolean input is " + boolean_input);
          }
       
        boolean_expression_list.push({ 'boolean_main_filter' : boolean_main_filter, 'boolean_sub_filter' : boolean_sub_filter, 'boolean_input': boolean_input });
        console.log("boolean expression list");
        console.log(boolean_expression_list);
      });
      IONUX2.Collections.saveBooleanExpression.set(boolean_expression_list);
    })();

    (function() {
      // get visibility state for bottom accordion elements and add to collection
      var accordion_list = [];
      var tabs = $('#searchResultsTabContainer .twoNavTab.active').attr('id');
      tabs = tabs.substring(0, tabs.length -3);
      var getElement = "#" + tabs + "Accordion .accordionWhite";
      $(getElement).each(function(item) {
        var accordion_id = 'accordion' + $(this).attr('id');
        var $accordion_contents = $(this).find('.accordionContents:visible').length;
          accordion_list.push({'id' : accordion_id, 'is_visible' : $accordion_contents});
        });
        IONUX2.Collections.saveAccordionConfig.set(accordion_list);
        console.log("accordion config is");
        console.log(IONUX2.Collections.saveAccordionConfig);
    })();

      var facilities = IONUX2.Collections.saveFacilitySearch.toJSON();
      var platformTypes = IONUX2.Collections.savePlatformSearch.toJSON();
      var sites = IONUX2.Collections.saveSiteSearch.toJSON();
      var dataTypes = IONUX2.Collections.saveDataTypeSearch.toJSON();
      var booleanExpression = IONUX2.Collections.saveBooleanExpression.toJSON();

      var values = {
        'searchName': searchName,
        'spatial' : spatial,
        'temporal': temporal,
        'facilities' : facilities,
        'sites': sites,
        'platformTypes': platformTypes,
        'dataTypes': dataTypes,
        'booleanExpression': booleanExpression
      };

      IONUX2.Collections.saveNames.set(values);
      
    }
};