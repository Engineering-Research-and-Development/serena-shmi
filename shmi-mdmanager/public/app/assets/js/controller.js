/* Global variables */
var url = "http://localhost:9090/api/metadata/api/1.0/";
//var url = "http://serena:9093/serena/1.0/";

var selectedTypeId = "";
var selectedItemType = "";
var context = "";

var types = {
    "@context": "http://serena:9000/context/base.jsonld",
    metadata_types: [
        {
            "@id": "serena:9000/serena/1.0/enterprise_types",
            name: "Enterprise Type"
    },
        {
            "@id": "serena:9000/serena/1.0/site_types",
            name: "Site Type"
    },
        {
            "@id": "serena:9000/serena/1.0/segment_types",
            name: "Segment Type"
    },
        {
            "@id": "serena:9000/serena/1.0/asset_types",
            name: "Asset Type"
    },
        {
            "@id": "serena:9000/serena/1.0/sg_as_event_types",
            name: "Segment Asset Event Type"
    },
        {
            "@id": "serena:9000/serena/1.0/meas_loc_types",
            name: "Measurment Location Type"
    },
        {
            "@id": "serena:9000/serena/1.0/eng_unit_types",
            name: "Engineering Unit Type"
    },
        {
            "@id": "serena:9000/serena/1.0/mloc_calc_types",
            name: "Measurment Location Calculation Type "
    }
  ]
};

/* View Controls */
$(document).ready(function () {
    $("#editListLoading").show();
    //here i populate the selection dropdown
    GetTypes();

    //EDIT button near every listed element
    $(document).on("click", "button.editButton", function () {
        OpenEditingForm(this.parentNode);
    });

    //ADD button in the bottom
    $(document).on("click", "button#addButton", function () {
        var selected = $("#typesSelect option:selected").val();
        OpenAddingForm(selected);
    });

    $("#updateButton").click(function () {
        var json;
        if (String.isNullOrEmpty($("#description").val())) {
            json = JSON.stringify({
                "@context": context,
                "@type": selectedItemType,
                name: $("#nameField").val(),
                user_tag_ident: $("#tagField").val()
            });
        } else {
            json = JSON.stringify({
                "@context": context,
                "@type": selectedItemType,
                name: $("#nameField").val(),
                user_tag_ident: $("#tagField").val(),
                description: $("#description").val()
            });
        }
        console.log(json);
        if (!String.isNullOrEmpty(selectedItemId)) {
            UpdateItemType(selectedItemId, json);
        } else {
            ErrorSnackBar(
                "You are trying to update an element that does not exists!!"
            );
            CloseOverlayForm();
        }
    });

    $("#createButton").click(function () {
        var json;
        if (String.isNullOrEmpty($("#description").val())) {
            json = JSON.stringify({
                "@context": context,
                "@type": selectedItemType,
                user_tag_ident: $("#tagField").val(),
                name: $("#nameField").val()
            });
        } else {
            json = JSON.stringify({
                "@context": context,
                "@type": String.capitalize(
                    SerenaSingleResourceNameFromURL(selectedTypeId)
                ),
                user_tag_ident: $("#tagField").val(),
                name: $("#nameField").val(),
                description: $("#description").val()
            });
        }
        console.log(json);
        if (!String.isNullOrEmpty(selectedTypeId)) {
            CreateItemType(selectedTypeId, json);
        } else {
            ErrorSnackBar("No Metadata Type Selected!!");
            CloseOverlayForm();
        }
    });

    $("#searchTypesButton").click(function () {
        SearchInList($("#searchTypesInput").val(), "#editList");
    });

    $("#searchTypesInput").keyup(function () {
        //console.log($(this).val());
        SearchInList($(this).val(), "#editList");
    });

    $("#typesSelect").change(function () {
        //console.log("Selected: " +$("#typesSelect option:selected").text() +" - " +$(this).val());
        $("#editList").empty();
        GetListElements($(this).val());
    });
});

function OpenEditingForm(listObject) {
    //console.log(listObject.getAttribute("value"));
    var itemId = listObject.getAttribute("value");
    //console.log("Editing: " +itemId +" - " +listObject.getElementsByTagName("span")[0].innerText);

    PromiseGetElementData(SerenaResourcePathFromUrl(itemId))
        .then(data => {
            //console.log(data);
            PopulateEditingForm(data);
        })
        .catch(error => {
            //console.log(error);
            ErrorSnackBar("Error: " + error.responseText);
        });
    selectedItemId = itemId;
}

function OpenAddingForm(typeId) {
    //console.log("Adding to: " + typeId);
    selectedTypeId = SerenaResourcePathFromUrl(typeId);
    var itemId = $("ul#editList li:first").attr("value");
    //console.log(itemId);
    PromiseGetElementData(SerenaResourcePathFromUrl(itemId))
        .then(data => {
            //console.log(data);
            PopulateCreatingForm(data);
        })
        .catch(error => {
            ErrorSnackBar("Error: " + error.responseText);
        });
}

function CloseOverlayForm() {
    ClearOverlayForm();
    $("#myOverlay").hide();
}

function ClearOverlayForm() {
    $("#nameField").val("");
    $("#tagField").val("");
    $("#description").val("");
    selectedTypeId = "";
    selectedItemId = "";
}

function ClearInputField(inputField) {
    inputField.value = "";
}

/* Ajax Calls*/
function GetTypes() {
    /*$.ajax({
      type: "GET",
      dataType: "json",
      url: url + "/types",
      async: true,
      contentType: "application/json; charset=utf-8",
      success: function (msg) {
        PopulateTypeSelect(msg);
        GetListElements($("#typesSelect option:selected").val());
      },
      error: function (xhr, status, errorThrown) {
        //Here the status code can be retrieved like;
        //console.log(xhr.status);
        //The message added to Response object in Controller can be retrieved as following.
        //console.log(xhr.responseText);
        //console.log(status);
        //console.log(errorThrown);
        alert('Error: ' + xhr.status + '\nMessage: ' + errorThrown);
      }
    });*/

    //Temporary hardcoded population
    //console.log(JSON.stringify(types));
    var metadata_types = JSON.parse(JSON.stringify(types));
    context = metadata_types["@context"];
    PopulateTypeSelect(metadata_types);
    GetListElements($("#typesSelect option:selected").val());
}

function GetListElements(val) {
    //These are types that don't have a Post method
    //so I need to disable the add button
    if (
        SerenaResourceListNameFromURL(val) == "enterprise_types" ||
        SerenaResourceListNameFromURL(val) == "site_types"
    ) {
        $("#addButton").attr("disabled", true);
    } else {
        $("#addButton").attr("disabled", false);
    }
    $("#editListLoading").show();
    var type_id = SerenaResourcePathFromUrl(val);
    var types = SerenaResourceListNameFromURL(val);

    PromiseGetListElements(type_id)
    .then(data => {
            //here I take the list of objects, whose name is the same I put in types
            /*
              {
                "@context": "http://serena:9009/context/base.jsonld",
                "enterprise_types": [
                    {
                        "@id": "serena:9009/serena/1.0/enterprise_type/0000000000000000/0/0",
                        "name": "Undetermined"
                    },
                    {
                        "@id": "serena:9009/serena/1.0/enterprise_type/0000000000000000/2/1",
                        "name": "Sole Proprietor"
                    },
                  ...
                ]
              }
            */
            var selected_type_list = data[types];
            //console.log(selected_type_list);
            PopulateEditList(selected_type_list, "#editList");
            //These are types that don't have a Put method
            //so I need to disable the edit button
            if (
                SerenaResourceListNameFromURL(val) == "enterprise_types" ||
                SerenaResourceListNameFromURL(val) == "site_types"
            ) {
                $(".editButton").attr("disabled", true);
            } else {
                $("#editButton").attr("disabled", false);
            }
            if ($("#searchTypesInput").val() != "")
                SearchInList($("#searchTypesInput").val(), "#editList");
        })
        .catch(error => {
            ErrorSnackBar("Error: " + error.responseText);
        });
}

function CreateItemType(typeId, json) {
    var res = SerenaSingleResourceNameFromURL(typeId);
    //console.log(typeId + " - " + res + " ->" + json);

    PromisePostElement(res, json)
        .then(data => {
            UpdateEditList();
            SuccessSnackBar("Object successfully created");
        })
        .catch(error => {
            ErrorSnackBar("Error: " + error.responseText);
        });

    CloseOverlayForm();
}

function UpdateItemType(itemId, json) {
    var res = SerenaResourcePathFromUrl(itemId);
    console.log(itemId + " - " + res + " ->" + json);
    PromisePutElement(res, json)
        .then(data => {
            UpdateEditList();
            SuccessSnackBar("Object successfully updated");
        })
        .catch(error => {
            ErrorSnackBar("Error: " + error.responseText);
        });
    CloseOverlayForm();
}

/* Populating objects */
function PopulateTypeSelect(msg) {
    //console.log(JSON.stringify(msg));
    $.each(msg.metadata_types, function (idx, obj) {
        //console.log(obj["@id"] + " - " + obj.name);
        var option = new Option(obj.name, obj["@id"]);
        $(option).html(obj.name);
        $("#typesSelect").append(option);
    });
}

function PopulateEditList(msg, id) {
    //console.log(JSON.stringify(msg));
    $(id).empty();
    $("#editListLoading").hide();
    $.each(msg, function (idx, obj) {
        var object =
            '<li class="list-group-item" value=' +
            obj["@id"] +
            "><span>" +
            obj.name +
            '</span><button type="button" class="editButton btn btn-link">Edit</button></li>';
        $(id).append(object);
    });

    $(id + " li")
        .sort(AscendingSort)
        .appendTo(id);
}

function UpdateEditList() {
    GetListElements($("#typesSelect").val());
}

/*function fakePopulateEditList(id) {
  //console.log(JSON.stringify(msg));
  var json = {
    types: [
      { "@id": 1, name: "objName" },
      { "@id": 1, name: "objName" },
      { "@id": 1, name: "objName" },
      { "@id": 1, name: "objName" },
      { "@id": 1, name: "objName" },
      { "@id": 1, name: "objName" },
      { "@id": 1, name: "objName" },
      { "@id": 1, name: "objName" },
      { "@id": 1, name: "objName" },
      { "@id": 1, name: "objName" }
    ]
  };
  var msg = json.types;
  $(id).empty();
  $("#editListLoading").hide();
  $.each(msg, function(idx, obj) {
    var object =
      '<li class="list-group-item" value=' +
      obj["@id"] +
      "><span>" +
      obj.name +
      '</span><button type="button" class="editButton btn btn-link">Edit</button></li>';
    $(id).append(object);
  });
  $(id + " li")
    .sort(AscendingSort)
    .appendTo(id);
}*/

function PopulateEditingForm(data) {
    //console.log(data.name + " -- " + data.user_tag_ident + " -- " + data.description);
    selectedItemType = data["@type"];
    $("#myOverlay-title").text("Editing form");
    $("#nameField").val(data.name);
    $("#tagField").val(data.user_tag_ident);
    if (data.hasOwnProperty("description")) {
        $("#description").val(data.description);
        $("#myOverlay-description-group").show();
    } else {
        $("#myOverlay-description-group").hide();
    }
    $("#createButton").hide();
    $("#updateButton").show();
    $("#myOverlay").show();
}

function PopulateCreatingForm(data) {
    //console.log(data.name + " -- " + data.user_tag_ident + " -- " + data.description);
    $("#myOverlay-title").text("Creating form");
    if (data.hasOwnProperty("description")) {
        $("#myOverlay-description-group").show();
    } else {
        $("#myOverlay-description-group").hide();
    }
    selectedItemType = data["@type"];
    $("#createButton").show();
    $("#updateButton").hide();
    $("#myOverlay").show();
}

/* Utilities */
function AscendingSort(a, b) {
    return $(b)
        .text()
        .toUpperCase() <
        $(a)
        .text()
        .toUpperCase() ?
        1 :
        -1;
}

function SearchInList(filter, listId) {
    var li = $(listId + " li");
    for (i = 0; i < li.length; i++) {
        var textValue = li[i]
            .getElementsByTagName("span")[0]
            .innerText.toUpperCase();
        //console.log(textValue);
        if (textValue.indexOf(filter.toUpperCase()) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

String.isNullOrEmpty = function (value) {
    return !value;
};

String.capitalize = function (s) {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
};

function SnackBar(text, color) {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    x.innerText = text;

    x.style.background = color;

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 3000);
}

function ErrorSnackBar(text) {
    var errorColor = "#e57373";
    SnackBar(text, errorColor);
}

function SuccessSnackBar(text) {
    var errorColor = "#81C784";
    SnackBar(text, errorColor);
}

/* SERENA PARSING */
//Having an id (that is a URL) of type serena:9009/serena/1.0/enterprise_types
//here I take just the resource part from the id (URL) -> serena/1.0/enterprise_types
//I need it to identify the resource URL to be concatenated to the host URL
function SerenaResourceAddressFromURL(url) {
    return url.substr(url.indexOf("/") + 1);
}

function SerenaResourcePathFromUrl(url){
    var breakStr="1.0/";
    return url.substr(url.indexOf("1.0") + breakStr.length);
}

//here I just take the type of metadata from the id (URL) -> enterprise_types
//I need it to get the list of element of this type
function SerenaResourceListNameFromURL(url) {
    return url.substr(url.lastIndexOf("/") + 1);
}

//here I take a substring of the id the identifies the single resource name -> enterprise_type
//I need it for selecting the single element and using GET,PUT and POST
function SerenaSingleResourceNameFromURL(url) {
    return url.slice(0, -1);
}

/*************
 * Promise Test
 ***************/
function PromiseGetElementData(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: url + id,
            async: true,
            contentType: "application/json",
            success: function (msg) {
                resolve(msg);
            },
            error: function (xhr, status, errorThrown) {
                //Here the status code can be retrieved like;
                //console.log(xhr.status);
                //The message added to Response object in Controller can be retrieved as following.
                //console.log(xhr.responseText);
                //console.log(status);
                //console.log(errorThrown);
                //console.log("Error: " + xhr.status + "\nMessage: " + errorThrown);
                reject(xhr);
            }
        });
    });
}

function PromiseGetListElements(id) {
    //console.log("id:" + id);
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: url + id,
            async: true,
            contentType: "application/json",
            success: function (msg) {
                resolve(msg);
            },
            error: function (xhr, status, errorThrown) {
                //Here the status code can be retrieved like;
                //console.log(xhr.status);
                //The message added to Response object in Controller can be retrieved as following.
                //console.log(xhr.responseText);
                //console.log(status);
                //console.log(errorThrown);
                //console.log("Error: " + xhr.status + "\nMessage: " + errorThrown);
                reject(xhr);
            }
        });
    });
}

function PromisePostElement(res, json) {
    console.log(url + res + " - " + json);
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url + res,
            type: "POST",
            data: json,
            dataType: "json",
            contentType: "application/json",
            success: function (msg) {
                resolve(msg);
            },
            error: function (xhr, status, errorThrown) {
                //Here the status code can be retrieved like;
                //console.log(xhr.status);
                //The message added to Response object in Controller can be retrieved as following.
                //console.log(xhr.responseText);
                //console.log(status);
                //console.log(errorThrown);
                //console.log("Error: " + xhr.status + "\nMessage: " + errorThrown);
                reject(xhr);
            }
        });
    });
}

function PromisePutElement(res, json) {
    console.log(url + res + " - " + json);
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url + res,
            type: "PUT",
            data: json,
            dataType: "json",
            contentType: "application/json",
            success: function (msg) {
                resolve(msg);
            },
            error: function (xhr, status, errorThrown) {
                //Here the status code can be retrieved like;
                //console.log(xhr.status);
                //The message added to Response object in Controller can be retrieved as following.
                //console.log(xhr.responseText);
                //console.log(status);
                //console.log(errorThrown);
                //console.log("Error: " + xhr.status + "\nMessage: " + errorThrown);
                reject(xhr);
            }
        });
    });
}
