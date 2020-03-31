/*
    mloc_calc_type: {
        "@id" : string,
        "name": string
    }
*/


/*
GET List Request
https: //serena:9000/serena/1.0/mloc_calc_types

GET List Response
Response code 200

{
    "@context": "http://serena:9000/context/base.jsonld",
    "mloc_calc_types": [: {
            "@id": "serena:mloc_calc_type/0000000000000000/0/6",
            "name": "Median"
        },: {
            "@id": "serena:mloc_calc_type/0000000000000000/6/9",
            "name": "RMS band pass 50Hz-100Hz filter"
        },
        {
            "@id": "serena:mloc_calc_type/0000000000000000/6/10",
            "name": "Prediction"
        }
    ]
}

GET Request
https: //serena:9000/serena/1.0/mloc_calc_type/0000000000000000/6/5

GET Response
Response code 200

{
    "@context": "http://serena:9000/context/base.jsonld",
    "@id": "serena:mloc_calc_type/0000000000000000/6/5",
    "@type": "Mloc_calc_type",
    "mc_db_site": "0000000000000000",
    "mc_db_id": "6",
    "mc_type_code": "2",
    "user_tag_ident": "Kurtosis",
    "name": "Kurtosis"
    "description": "Returns kurtosis or sharpness of peak value of X measurement events"
}

POST Request
https: //serena:9000/serena/1.0/mloc_calc_type
    {
        "@context": "http://serena:9000/context/base.jsonld",
        "@type": "Mloc_calc_type",
        "user_tag_ident": "A new type of measurement calculation",
        "name": "A new type of measurement calculation",
        "description": "This is a description of the measurement calculation with more detail than can be given by the name alone"
    }

POST Response
Response code 201

{
    "@context": "http://serena:9000/context/base.jsonld",
    "@id": "serena:mloc_calc_type/0000000000000000/6/153",
    "@type": "Mloc_calc_type",
    "mc_db_site": "0000000000000000",
    "mc_db_id": "6",
    "mc_type_code": "153",
    "user_tag_ident": "A new type of measurement calculation",
    "name": "A new type of measurement calculation"
    "description": "This is a description of the measurement calculation with more detail than can be given by the name alone"
}

PUT Request
Only the name field is mutable.

https: //serena:9000/serena/1.0/mloc_calc_type/0000000000000000/6/153
    {
        "@context": "http://serena:9000/context/base.jsonld",
        "@type": "Mloc_calc_type",
        "user_tag_ident": "A different measurement calculation",
        "name": "A different measurement calculation",
        "description": "Any updates that need to be made to the measurement calculation description"
    }

PUT Response
Response code 200

{
    "@context": "http://serena:9000/context/base.jsonld",
    "@id": "serena:mloc_calc_type/0000000000000000/6/153",
    "@type": "Mloc_calc_type",
    "mc_db_site": "0000000000000000",
    "mc_db_id": "6",
    "mc_type_code": "153",
    "user_tag_ident": "A different measurement calculation",
    "name": "A different measurement calculation"
    "description": "Any updates that need to be made to the measurement calculation description"
}
*/