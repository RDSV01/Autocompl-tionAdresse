jQuery.noConflict();
//Code pour adresse de facturation
//Auto-complétion du champ code postal

    jQuery("#billing_postcode").autocomplete({
        source: function(request, response) {
            jQuery.ajax({
                url: "https://api-adresse.data.gouv.fr/search/?q=" + jQuery("input[name='billing_postcode']").val() + '&type=municipality&autocomplete=1',
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
            jQuery('#billing_city').val(ui.item.city);
        },

    });


    //Auto-complétion du champ ville
    jQuery("#billing_city").autocomplete({
        source: function (request, response) {
            jQuery.ajax({
                url: "https://api-adresse.data.gouv.fr/search/?city=" + jQuery("input[name='billing_city']").val(),
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
            jQuery('#billing_postcode').val(ui.item.postcode);
        }
    });


    //Auto-complétion du champ adresse
    jQuery("#billing_address_1").autocomplete({
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
            jQuery('#billing_postcode').val(ui.item.postcode);
            jQuery('#billing_city').val(ui.item.city);
        }
    });





//Code pour adresse de livraison



//Auto-complétion du champ code postal
jQuery("#shipping_postcode").autocomplete({
    source: function (request, response) {
        jQuery.ajax({
            url: "https://api-adresse.data.gouv.fr/search/?q=" + jQuery("input[name='shipping_postcode']").val() + '&type=municipality&autocomplete=1',
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
        jQuery('#shipping_city').val(ui.item.city);
    },

});


//Auto-complétion du champ ville
jQuery("#shipping_city").autocomplete({
    source: function (request, response) {
        jQuery.ajax({
            url: "https://api-adresse.data.gouv.fr/search/?city=" + jQuery("input[name='shipping_city']").val(),
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
        jQuery('#shipping_postcode').val(ui.item.postcode);
    }
});


//Auto-complétion du champ adresse
jQuery("#shipping_address_1").autocomplete({
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
        jQuery('#shipping_postcode').val(ui.item.postcode);
        jQuery('#shipping_city').val(ui.item.city);
    }
});


//Code permettant de supprimer le code postal ou la ville si l'un d'eux est modifié manuellement
//Permet d'éviter les fausses adresses
const adresseLivrai = document.getElementById("shipping_address_1");
const cpLivrai = document.getElementById("shipping_postcode");
const villeLivrai = document.getElementById("shipping_city");

const listeAdresseLivrai = document.getElementById("ui-id-6");
const listeCpLivrai = document.getElementById("ui-id-4");
const listeVilleLivrai = document.getElementById("ui-id-5");

cpLivrai.onclick = function(){ 
    if((cpLivrai.value != "") || (cpLivrai.value == "")){ 
        cpLivrai.value = "";
        villeLivrai.value = "";
    }
}
villeLivrai.onclick = function(){ 
    if((villeLivrai.value != "") || (villeLivrai.value == "")){ 
        villeLivrai.value = "";
        cpLivrai.value = "";
    }
}



const adresseFact = document.getElementById("billing_address_1");
const cpFact = document.getElementById("billing_postcode");
const villeFact = document.getElementById("billing_city");

const listeAdresseFact = document.getElementById("ui-id-3");
const listeCpFact = document.getElementById("ui-id-1");
const listeVilleFact = document.getElementById("ui-id-2");


cpFact.onclick = function(){ 
    if((cpFact.value != "") || (cpFact.value == "")){ 
        cpFact.value = "";
        villeFact.value = "";  
    }
}
villeFact.onclick = function(){ 
    if((villeFact.value != "") || (villeFact.value == "")){ 
        villeFact.value = "";
        cpFact.value = "";
    }
}
