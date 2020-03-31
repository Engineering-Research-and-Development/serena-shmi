/*
    meas_location:{
        "@id" : string,
        "name": string
    }
*/


/*
GET List Request
https: //serena:9000/serena/1.0/meas_loc_types

GET List Response
Response code 200

{
    "@context": "http://serena:9000/context/base.jsonld",
    "meas_loc_types": [: {
            "@id": "serena:meas_loc_type/0000000000000000/0/5",
            "name": "Pressure"
        },: {
            "@id": "serena:meas_loc_type/0000000000000000/6/21",
            "name": "Laser, Position"
        },
        {
            "@id": "serena:meas_loc_type/0000000000000000/6/22",
            "name": "Temperature, Correction"
        }
    ]
}

GET Request
https: //serena:9000/serena/1.0/meas_loc_type/0000000000000000/6/2

GET Response
Response code 200

{
    "@context": "http://serena:9000/context/base.jsonld",
    "@id": "serena:meas_loc_type/0000000000000000/6/2",
    "@type": "Meas_loc_type",
    "ml_db_site": "0000000000000000",
    "ml_db_id": "6",
    "ml_type_code": "2",
    "user_tag_ident": "Mass Flow, Polyol",
    "name": "Mass Flow, Polyol"
}

POST Request
https: //serena:9000/serena/1.0/meas_loc_type
    {
        "@context": "http://serena:9000/context/base.jsonld",
        "@type": "Meas_loc_type",
        "user_tag_ident": "A new type of measurement",
        "name": "A new type of measurement"
    }

POST Response
Response code 201

{
    "@context": "http://serena:9000/context/base.jsonld",
    "@id": "serena:meas_loc_type/0000000000000000/6/837",
    "@type": "Meas_loc_type",
    "ml_db_site": "0000000000000000",
    "ml_db_id": "6",
    "ml_type_code": "837",
    "user_tag_ident": "A new type of measurement",
    "name": "A new type of measurement"
}

PUT Request
Only the name field is mutable.

https: //serena:9000/serena/1.0/meas_loc_type/0000000000000000/6/837
    {
        "@context": "http://serena:9000/context/base.jsonld",
        "@type": "Meas_loc_type",
        "user_tag_ident": "Another type of measurement",
        "name": "Another type of measurement"
    }

PUT Response
Response code 200

{
    "@context": "http://serena:9000/context/base.jsonld",
    "@id": "serena:meas_loc_type/0000000000000000/6/837",
    "@type": "Meas_loc_type",
    "ml_db_site": "0000000000000000",
    "ml_db_id": "6",
    "ml_type_code": "837",
    "user_tag_ident": "Another piece of plant equipment",
    "name": "Another piece of plant equipment"
}

*/