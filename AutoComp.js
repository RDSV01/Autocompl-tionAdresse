jQuery.noConflict();
    jQuery("#postcode").autocomplete({
        source: function(request, response) {
            jQuery.ajax({
                url: "https://api-adresse.data.gouv.fr/search/?q=" + jQuery("input[name='postcode']").val() + '&type=municipality&autocomplete=1',
                data: {
                    q: request.term
                },
                dataType: "json",
                success: function (data) {
                    response(jQuery.map(data.features, function (item) {
                        return {
                            label: item.properties.postcode + " – " + item.properties.city,
                            city: item.properties.city,
                            value: item.properties.postcode
                        };
                    }));
                }
            });
        },
        select: function (event, ui) {
            jQuery('#city').val(ui.item.city);
        },

    });
    jQuery("#city").autocomplete({
        source: function (request, response) {
            jQuery.ajax({
                url: "https://api-adresse.data.gouv.fr/search/?city=" + jQuery("input[name='city']").val(),
                data: {
                    q: request.term
                },
                dataType: "json",
                success: function (data) {
                    var cities = [];
                    response(jQuery.map(data.features, function (item) {
                        if (jQuery.inArray(item.properties.postcode, cities) == -1) {
                            cities.push(item.properties.postcode);
                            return {
                                label: item.properties.postcode + " - " + item.properties.city,
                                postcode: item.properties.postcode,
                                value: item.properties.city
                            };
                        }
                    }));
                }
            });
        },
        select: function (event, ui) {
            jQuery('#postcode').val(ui.item.postcode);
        }
    });
    jQuery("#address").autocomplete({
        source: function (request, response) {
            jQuery.ajax({
                url: "https://api-adresse.data.gouv.fr/search/",
                data: {
                    q: request.term
                },
                dataType: "json",
                success: function (data) {
                    response(jQuery.map(data.features, function (item) {
                        return {
                            label: item.properties.name + ", " + item.properties.postcode + ", " + item.properties.city,
                            postcode: item.properties.postcode,
                            city: item.properties.city,
                            value: item.properties.name
                        };
                    }));
                }
            });
        },
        select: function (event, ui) {
            jQuery('#postcode').val(ui.item.postcode);
            jQuery('#city').val(ui.item.city);
        }
    });
