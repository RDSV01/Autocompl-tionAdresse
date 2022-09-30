    /** Programme permettant l'autocompletion des champs d'adresse lors d'une commande 
 * Utilisation de l'API de la base nationale d'adresses (BAN) du gouvernement (https://adresse.data.gouv.fr/api-doc/adresse)
*/


//Code pour adresse de facturation

    //Auto-complétion du champ code postal
    $("#billing_postcode").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "https://api-adresse.data.gouv.fr/search/?q=" + $("input[name='billing_postcode']").val() + '&type=municipality&autocomplete=1',
                data: {
                    q: request.term
                },
                dataType: "json",
                success: function (data) {
                    response($.map(data.features, function (item) {
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
            $('#billing_city').val(ui.item.city);
        },

    });


    //Auto-complétion du champ ville
    $("#billing_city").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "https://api-adresse.data.gouv.fr/search/?city=" + $("input[name='billing_city']").val(),
                data: {
                    q: request.term
                },
                dataType: "json",
                success: function (data) {
                    var cities = [];
                    response($.map(data.features, function (item) {
                        // Ajout d'un tableau pour éviter les doublons
                        if ($.inArray(item.properties.postcode, cities) == -1) {
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
            $('#billing_postcode').val(ui.item.postcode);
        }
    });


    //Auto-complétion du champ adresse
    $("#billing_address_1").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "https://api-adresse.data.gouv.fr/search/?postcode=" + $("input[name='billing_postcode']").val(),
                data: {
                    q: request.term
                },
                dataType: "json",
                success: function (data) {
                    response($.map(data.features, function (item) {
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
            $('#billing_postcode').val(ui.item.postcode);
            $('#billing_city').val(ui.item.city);
        }
    });





//Code pour adresse de livraison



//Auto-complétion du champ code postal
$("#shipping_postcode").autocomplete({
    source: function (request, response) {
        $.ajax({
            url: "https://api-adresse.data.gouv.fr/search/?q=" + $("input[name='shipping_postcode']").val() + '&type=municipality&autocomplete=1',
            data: {
                q: request.term
            },
            dataType: "json",
            success: function (data) {
                response($.map(data.features, function (item) {
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
        $('#shipping_city').val(ui.item.city);
    },

});


//Auto-complétion du champ ville
$("#shipping_city").autocomplete({
    source: function (request, response) {
        $.ajax({
            url: "https://api-adresse.data.gouv.fr/search/?city=" + $("input[name='shipping_city']").val(),
            data: {
                q: request.term
            },
            dataType: "json",
            success: function (data) {
                var cities = [];
                response($.map(data.features, function (item) {
                    // Ajout d'un tableau pour éviter les doublons
                    if ($.inArray(item.properties.postcode, cities) == -1) {
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
        $('#shipping_postcode').val(ui.item.postcode);
    }
});


//Auto-complétion du champ adresse
$("#shipping_address_1").autocomplete({
    source: function (request, response) {
        $.ajax({
            url: "https://api-adresse.data.gouv.fr/search/?postcode=" + $("input[name='shipping_postcode']").val(),
            data: {
                q: request.term
            },
            dataType: "json",
            success: function (data) {
                response($.map(data.features, function (item) {
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
        $('#shipping_postcode').val(ui.item.postcode);
        $('#shipping_city').val(ui.item.city);
    }
});


//Code permettant au clic de reouvrir la liste de villes proposés par l'API
document.getElementById("shipping_address_1").onclick = function(){ //lancement au clic (sur le champ) de la fonction
    if(document.getElementById("shipping_address_1").value != ""){ //si le champ n'est pas vide
	    document.getElementById("ui-id-6").style.display = '';     //affichage de la liste 
    }
}
document.getElementById("billing_address_1").onclick = function(){ 
    if(document.getElementById("billing_address_1").value != ""){ 
	    document.getElementById("ui-id-3").style.display = '';      
    }
}
document.getElementById("shipping_postcode").onclick = function(){ 
    if(document.getElementById("shipping_postcode").value != ""){ 
	    document.getElementById("ui-id-4").style.display = '';      
    }
}
document.getElementById("billing_postcode").onclick = function(){ 
    if(document.getElementById("billing_postcode").value != ""){ 
	    document.getElementById("ui-id-1").style.display = '';      
    }
}
document.getElementById("shipping_city").onclick = function(){ 
    if(document.getElementById("shipping_city").value != ""){ 
	    document.getElementById("ui-id-5").style.display = '';      
    }
}
document.getElementById("billing_city").onclick = function(){ 
    if(document.getElementById("billing_city").value != ""){ 
	    document.getElementById("ui-id-2").style.display = '';      
    }
}