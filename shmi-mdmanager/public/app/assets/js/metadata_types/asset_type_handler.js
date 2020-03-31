/*
    asset_type:{
        "@id" : string,
        "name": string
    }
*/


/*
GET List Request
https: //serena:9000/serena/1.0/asset_types

GET List Response
Response code 200

{
    "@context": "http://serena:9000/context/base.jsonld",
    "asset_types": [: {
            "@id": "serena:asset_type/0000000000000000/0/308",
            "name": "Debarker System"
        },: {
            "@id": "serena:asset_type/0000000000000000/6/9",
            "name": "Pump, Hydraulic"
        },
        {
            "@id": "serena:asset_type/0000000000000000/6/10",
            "name": "Cylinder, Hydraulic, A"
        }
    ]
}

GET Request
https: //serena:9000/serena/1.0/asset_type/0000000000000000/6/9

GET Response
Response code 200

{
    "@context": "http://serena:9000/context/base.jsonld",
    "@id": "serena:asset_type/0000000000000000/6/9",
    "@type": "Asset_type",
    "as_db_site": "0000000000000000",
    "as_db_id": "6",
    "as_type_code": "9",
    "user_tag_ident": "Pump, Hydraulic",
    "name": "Pump, Hydraulic"
}

POST Request
https: //serena:9000/serena/1.0/asset_type
    {
        "@context": "http://serena:9000/context/base.jsonld",
        "@type": "Asset_type",
        "user_tag_ident": "A component of plant equipment",
        "name": "A component of plant equipment"
    }

POST Response
Response code 201

{
    "@context": "http://serena:9000/context/base.jsonld",
    "@id": "serena:asset_type/0000000000000000/6/96",
    "@type": "Asset_type",
    "as_db_site": "0000000000000000",
    "as_db_id": "6",
    "as_type_code": "96",
    "user_tag_ident": "A component of plant equipment",
    "name": "A component of plant equipment"
}

PUT Request
Only the name field is mutable.

https: //serena:9000/serena/1.0/asset_type/0000000000000000/6/96
    {
        "@context": "http://serena:9000/context/base.jsonld",
        "@type": "Asset_type",
        "user_tag_ident": "A component of plant equipment",
        "name": "Another component of plant equipment"
    }

PUT Response
Response code 200

{
    "@context": "http://serena:9000/context/base.jsonld",
    "@id": "serena:asset_type/0000000000000000/6/96",
    "@type": "Asset_type",
    "as_db_site": "0000000000000000",
    "as_db_id": "6",
    "as_type_code": "96",
    "user_tag_ident": "Another component of plant equipment",
    "name": "Another component of plant equipment"
}

*/