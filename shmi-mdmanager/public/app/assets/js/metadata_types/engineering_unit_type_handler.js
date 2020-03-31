/*
    eng_unit_type: {
        "@id" : string,
        "name": string
    }
*/


/*
GET List Request
https: //serena:9000/serena/1.0/eng_unit_types

GET List Response
Response code 200

{
    "@context": "http://serena:9000/context/base.jsonld",
    "eng_unit_types": [: {
            "@id": "serena:eng_unit_type/0000000000000000/0/22",
            "name": "Fathoms"
        },: {
            "@id": "serena:eng_unit_type/0000000000000000/6/3",
            "name": "Grams Per Second"
        },
        {
            "@id": "serena:eng_unit_type/0000000000000000/6/4",
            "name": "Round Motor"
        }
    ]
}

GET Request
https: //serena:9000/serena/1.0/eng_unit_type/0000000000000000/6/2

GET Response
Response code 200

{
    "@context": "http://serena:9000/context/base.jsonld",
    "@id": "serena:eng_unit_type/0000000000000000/6/2",
    "@type": "Eng_unit_type",
    "eu_db_site": "0000000000000000",
    "eu_db_id": "6",
    "eu_type_code": "2",
    "user_tag_ident": "Kilonewtons",
    "name": "Kilonewtons"
}

POST Request
https: //serena:9000/serena/1.0/eng_unit_type
    {
        "@context": "http://serena:9000/context/base.jsonld",
        "@type": "Eng_unit_type",
        "user_tag_ident": "Some New Unit",
        "name": "Some New Unit"
    }

POST Response
Response code 201

{
    "@context": "http://serena:9000/context/base.jsonld",
    "@id": "serena:eng_unit_type/0000000000000000/6/342",
    "@type": "Eng_unit_type",
    "eu_db_site": "0000000000000000",
    "eu_db_id": "6",
    "eu_type_code": "342",
    "user_tag_ident": "Some New Unit",
    "name": "Some New Unit"
}

PUT Request
Only the name ans user tag identifier fields are mutable.

https: //serena:9000/serena/1.0/eng_unit_type/0000000000000000/6/342
    {
        "@context": "http://serena:9000/context/base.jsonld",
        "@id": "serena:eng_unit_type/0000000000000000/6/342",
        "@type": "Eng_unit_type",
        "user_tag_ident": "Another New Unit",
        "name": "Another New Unit"
    }

PUT Response
Response code 200

{
    "@context": "http://serena:9000/context/base.jsonld",
    "@id": "serena:eng_unit_type/0000000000000000/6/342",
    "@type": "Eng_unit_type",
    "eu_db_site": "0000000000000000",
    "eu_db_id": "6",
    "eu_type_code": "342",
    "user_tag_ident": "Another New Unit",
    "name": "Another New Unit"
}

*/