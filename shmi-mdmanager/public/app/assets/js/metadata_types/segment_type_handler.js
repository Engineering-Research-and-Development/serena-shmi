/*
    segment_type:{
        "@id" : string,
        "name": string
    }
*/


/*
GET List Request
https: //serena:9000/serena/1.0/segment_types

GET List Response
Response code 200

{
    "@context": "http://serena:9000/context/base.jsonld",
    "segment_types": [: {
            "@id": "serena:segment_type/0000000000000000/0/24",
            "name": "Bottling"
        },: {
            "@id": "serena:segment_type/0000000000000000/6/3",
            "name": "Bridge, CMM"
        },
        {
            "@id": "serena:segment_type/0000000000000000/6/4",
            "name": "Punch Tool"
        }
    ]
}

GET Request
https: //serena:9000/serena/1.0/segment_type/0000000000000000/6/2

GET Response
Response code 200

{
    "@context": "http://serena:9000/context/base.jsonld",
    "@id": "serena:segment_type/0000000000000000/6/2",
    "@type": "Segment_type",
    "sg_db_site": "0000000000000000",
    "sg_db_id": "6",
    "sg_type_code": "2",
    "user_tag_ident": "Rolling Mill",
    "name": "Rolling Mill"
}

POST Request
https: //serena:9000/serena/1.0/segment_type
    {
        "@context": "http://serena:9000/context/base.jsonld",
        "@type": "Segment_type",
        "user_tag_ident": "A new piece of plant equipment",
        "name": "A new piece of plant equipment"
    }

POST Response
Response code 201

{
    "@context": "http://serena:9000/context/base.jsonld",
    "@id": "serena:segment_type/0000000000000000/6/522",
    "@type": "Segment_type",
    "sg_db_site": "0000000000000000",
    "sg_db_id": "6",
    "sg_type_code": "522",
    "user_tag_ident": "A new piece of plant equipment",
    "name": "A new piece of plant equipment"
}

PUT Request
Only the name and user tag fields are mutable.

https: //serena:9000/serena/1.0/segment_type/0000000000000000/6/522
    {
        "@context": "http://serena:9000/context/base.jsonld",
        "@type": "Segment_type",
        "user_tag_ident": "Another piece of plant equipment",
        "name": "Another piece of plant equipment"
    }

PUT Response
Response code 200

{
    "@context": "http://serena:9000/context/base.jsonld",
    "@id": "serena:segment_type/0000000000000000/6/522",
    "@type": "Segment_type",
    "sg_db_site": "0000000000000000",
    "sg_db_id": "6",
    "sg_type_code": "522",
    "user_tag_ident": "Another piece of plant equipment",
    "name": "Another piece of plant equipment"
}

*/