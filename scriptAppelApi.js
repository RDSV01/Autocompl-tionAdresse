jQuery.noConflict();
//Code pour adresse de facturation
//Auto-complétion du champ code postal

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
        // Remplissage de la ville correspondant au code postal
        select: function (event, ui) {
            jQuery('#city').val(ui.item.city);
        },

    });


    //Auto-complétion du champ ville
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
                        // Ajout d'un tableau pour éviter les doublons
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
        // Remplissage du code postal correspondant a la ville selectionnée
        select: function (event, ui) {
            jQuery('#postcode').val(ui.item.postcode);
        }
    });


    //Auto-complétion du champ adresse
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
        // Remplissage du code postal et de la ville correspondant a l'adresse selectionnée
        select: function (event, ui) {
            jQuery('#postcode').val(ui.item.postcode);
            jQuery('#city').val(ui.item.city);
        }
    });
