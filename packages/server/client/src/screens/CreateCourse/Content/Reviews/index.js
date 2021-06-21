import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import ContentWrapper from '../../components/ContentWrapper';
import ReviewItem from '../../../Courses/Contents/ReviewItem';
import ReviewsFilter from './ReviewsFilter';

const reviews = [
    {
        "id": 1,
        "userId": 3,
        "review": "asdasd",
        "noOfStar": "3",
        "createdAt": "1619055409886",
        "updatedAt": null,
        "userDetails": {
            "id": 3,
            "firstName": "Bikal",
            "lastName": "Shrestha",
            "middleName": "",
            "slug": "bikal-shrestha-1612490170718",
            "userDetail": {
                "type": "mentor",
                "country": "Nepal",
                "image": "image-1612490252304.jpeg",
                "__typename": "UserDetail"
            },
            "__typename": "User"
        },
        "__typename": "Review"
    },
    {
        "id": 2,
        "userId": 3,
        "review": "this is test review",
        "noOfStar": "2",
        "createdAt": "1619055642593",
        "updatedAt": null,
        "userDetails": {
            "id": 3,
            "firstName": "Bikal",
            "lastName": "Shrestha",
            "middleName": "",
            "slug": "bikal-shrestha-1612490170718",
            "userDetail": {
                "type": "mentor",
                "country": "Nepal",
                "image": "image-1612490252304.jpeg",
                "__typename": "UserDetail"
            },
            "__typename": "User"
        },
        "__typename": "Review"
    },
    {
        "id": 3,
        "userId": 3,
        "review": "asdasdasdasdas",
        "noOfStar": "5",
        "createdAt": "1619055677825",
        "updatedAt": null,
        "userDetails": {
            "id": 3,
            "firstName": "Bikal",
            "lastName": "Shrestha",
            "middleName": "",
            "slug": "bikal-shrestha-1612490170718",
            "userDetail": {
                "type": "mentor",
                "country": "Nepal",
                "image": "image-1612490252304.jpeg",
                "__typename": "UserDetail"
            },
            "__typename": "User"
        },
        "__typename": "Review"
    },
    {
        "id": 4,
        "userId": 3,
        "review": "asd",
        "noOfStar": "2",
        "createdAt": "1619056302152",
        "updatedAt": null,
        "userDetails": {
            "id": 3,
            "firstName": "Bikal",
            "lastName": "Shrestha",
            "middleName": "",
            "slug": "bikal-shrestha-1612490170718",
            "userDetail": {
                "type": "mentor",
                "country": "Nepal",
                "image": "image-1612490252304.jpeg",
                "__typename": "UserDetail"
            },
            "__typename": "User"
        },
        "__typename": "Review"
    },
    {
        "id": 5,
        "userId": 3,
        "review": "asdasdasdasdasdas as asdas",
        "noOfStar": "2",
        "createdAt": "1619058357560",
        "updatedAt": null,
        "userDetails": {
            "id": 3,
            "firstName": "Bikal",
            "lastName": "Shrestha",
            "middleName": "",
            "slug": "bikal-shrestha-1612490170718",
            "userDetail": {
                "type": "mentor",
                "country": "Nepal",
                "image": "image-1612490252304.jpeg",
                "__typename": "UserDetail"
            },
            "__typename": "User"
        },
        "__typename": "Review"
    },
    {
        "id": 6,
        "userId": 3,
        "review": "",
        "noOfStar": "0",
        "createdAt": "1619058368775",
        "updatedAt": null,
        "userDetails": {
            "id": 3,
            "firstName": "Bikal",
            "lastName": "Shrestha",
            "middleName": "",
            "slug": "bikal-shrestha-1612490170718",
            "userDetail": {
                "type": "mentor",
                "country": "Nepal",
                "image": "image-1612490252304.jpeg",
                "__typename": "UserDetail"
            },
            "__typename": "User"
        },
        "__typename": "Review"
    },
    {
        "id": 7,
        "userId": 3,
        "review": "",
        "noOfStar": "0",
        "createdAt": "1619058376985",
        "updatedAt": null,
        "userDetails": {
            "id": 3,
            "firstName": "Bikal",
            "lastName": "Shrestha",
            "middleName": "",
            "slug": "bikal-shrestha-1612490170718",
            "userDetail": {
                "type": "mentor",
                "country": "Nepal",
                "image": "image-1612490252304.jpeg",
                "__typename": "UserDetail"
            },
            "__typename": "User"
        },
        "__typename": "Review"
    },
    {
        "id": 8,
        "userId": 3,
        "review": "",
        "noOfStar": "0",
        "createdAt": "1619058392943",
        "updatedAt": null,
        "userDetails": {
            "id": 3,
            "firstName": "Bikal",
            "lastName": "Shrestha",
            "middleName": "",
            "slug": "bikal-shrestha-1612490170718",
            "userDetail": {
                "type": "mentor",
                "country": "Nepal",
                "image": "image-1612490252304.jpeg",
                "__typename": "UserDetail"
            },
            "__typename": "User"
        },
        "__typename": "Review"
    },
    {
        "id": 9,
        "userId": 3,
        "review": "asdasd",
        "noOfStar": "3",
        "createdAt": "1619061338224",
        "updatedAt": null,
        "userDetails": {
            "id": 3,
            "firstName": "Bikal",
            "lastName": "Shrestha",
            "middleName": "",
            "slug": "bikal-shrestha-1612490170718",
            "userDetail": {
                "type": "mentor",
                "country": "Nepal",
                "image": "image-1612490252304.jpeg",
                "__typename": "UserDetail"
            },
            "__typename": "User"
        },
        "__typename": "Review"
    },
    {
        "id": 10,
        "userId": 3,
        "review": "dasdasd",
        "noOfStar": "0",
        "createdAt": "1619061418263",
        "updatedAt": null,
        "userDetails": {
            "id": 3,
            "firstName": "Bikal",
            "lastName": "Shrestha",
            "middleName": "",
            "slug": "bikal-shrestha-1612490170718",
            "userDetail": {
                "type": "mentor",
                "country": "Nepal",
                "image": "image-1612490252304.jpeg",
                "__typename": "UserDetail"
            },
            "__typename": "User"
        },
        "__typename": "Review"
    },
    {
        "id": 11,
        "userId": 3,
        "review": "asdad",
        "noOfStar": "3",
        "createdAt": "1619061444433",
        "updatedAt": null,
        "userDetails": {
            "id": 3,
            "firstName": "Bikal",
            "lastName": "Shrestha",
            "middleName": "",
            "slug": "bikal-shrestha-1612490170718",
            "userDetail": {
                "type": "mentor",
                "country": "Nepal",
                "image": "image-1612490252304.jpeg",
                "__typename": "UserDetail"
            },
            "__typename": "User"
        },
        "__typename": "Review"
    },
    {
        "id": 12,
        "userId": 3,
        "review": "asd",
        "noOfStar": "3",
        "createdAt": "1619061514128",
        "updatedAt": null,
        "userDetails": {
            "id": 3,
            "firstName": "Bikal",
            "lastName": "Shrestha",
            "middleName": "",
            "slug": "bikal-shrestha-1612490170718",
            "userDetail": {
                "type": "mentor",
                "country": "Nepal",
                "image": "image-1612490252304.jpeg",
                "__typename": "UserDetail"
            },
            "__typename": "User"
        },
        "__typename": "Review"
    },
    {
        "id": 13,
        "userId": 3,
        "review": "",
        "noOfStar": "0",
        "createdAt": "1619061515815",
        "updatedAt": null,
        "userDetails": {
            "id": 3,
            "firstName": "Bikal",
            "lastName": "Shrestha",
            "middleName": "",
            "slug": "bikal-shrestha-1612490170718",
            "userDetail": {
                "type": "mentor",
                "country": "Nepal",
                "image": "image-1612490252304.jpeg",
                "__typename": "UserDetail"
            },
            "__typename": "User"
        },
        "__typename": "Review"
    },
    {
        "id": 14,
        "userId": 3,
        "review": "sad",
        "noOfStar": "2",
        "createdAt": "1619061537203",
        "updatedAt": null,
        "userDetails": {
            "id": 3,
            "firstName": "Bikal",
            "lastName": "Shrestha",
            "middleName": "",
            "slug": "bikal-shrestha-1612490170718",
            "userDetail": {
                "type": "mentor",
                "country": "Nepal",
                "image": "image-1612490252304.jpeg",
                "__typename": "UserDetail"
            },
            "__typename": "User"
        },
        "__typename": "Review"
    },
    {
        "id": 15,
        "userId": 3,
        "review": "asdas",
        "noOfStar": "3",
        "createdAt": "1619062223948",
        "updatedAt": null,
        "userDetails": {
            "id": 3,
            "firstName": "Bikal",
            "lastName": "Shrestha",
            "middleName": "",
            "slug": "bikal-shrestha-1612490170718",
            "userDetail": {
                "type": "mentor",
                "country": "Nepal",
                "image": "image-1612490252304.jpeg",
                "__typename": "UserDetail"
            },
            "__typename": "User"
        },
        "__typename": "Review"
    },
    {
        "id": 16,
        "userId": 3,
        "review": "",
        "noOfStar": "0",
        "createdAt": "1619062304509",
        "updatedAt": null,
        "userDetails": {
            "id": 3,
            "firstName": "Bikal",
            "lastName": "Shrestha",
            "middleName": "",
            "slug": "bikal-shrestha-1612490170718",
            "userDetail": {
                "type": "mentor",
                "country": "Nepal",
                "image": "image-1612490252304.jpeg",
                "__typename": "UserDetail"
            },
            "__typename": "User"
        },
        "__typename": "Review"
    },
    {
        "id": 17,
        "userId": 3,
        "review": "",
        "noOfStar": "0",
        "createdAt": "1619062330139",
        "updatedAt": null,
        "userDetails": {
            "id": 3,
            "firstName": "Bikal",
            "lastName": "Shrestha",
            "middleName": "",
            "slug": "bikal-shrestha-1612490170718",
            "userDetail": {
                "type": "mentor",
                "country": "Nepal",
                "image": "image-1612490252304.jpeg",
                "__typename": "UserDetail"
            },
            "__typename": "User"
        },
        "__typename": "Review"
    },
    {
        "id": 18,
        "userId": 3,
        "review": "",
        "noOfStar": "0",
        "createdAt": "1619062344751",
        "updatedAt": null,
        "userDetails": {
            "id": 3,
            "firstName": "Bikal",
            "lastName": "Shrestha",
            "middleName": "",
            "slug": "bikal-shrestha-1612490170718",
            "userDetail": {
                "type": "mentor",
                "country": "Nepal",
                "image": "image-1612490252304.jpeg",
                "__typename": "UserDetail"
            },
            "__typename": "User"
        },
        "__typename": "Review"
    },
    {
        "id": 19,
        "userId": 3,
        "review": "",
        "noOfStar": "0",
        "createdAt": "1619062357594",
        "updatedAt": null,
        "userDetails": {
            "id": 3,
            "firstName": "Bikal",
            "lastName": "Shrestha",
            "middleName": "",
            "slug": "bikal-shrestha-1612490170718",
            "userDetail": {
                "type": "mentor",
                "country": "Nepal",
                "image": "image-1612490252304.jpeg",
                "__typename": "UserDetail"
            },
            "__typename": "User"
        },
        "__typename": "Review"
    },
    {
        "id": 20,
        "userId": 3,
        "review": "",
        "noOfStar": "0",
        "createdAt": "1619062398898",
        "updatedAt": null,
        "userDetails": {
            "id": 3,
            "firstName": "Bikal",
            "lastName": "Shrestha",
            "middleName": "",
            "slug": "bikal-shrestha-1612490170718",
            "userDetail": {
                "type": "mentor",
                "country": "Nepal",
                "image": "image-1612490252304.jpeg",
                "__typename": "UserDetail"
            },
            "__typename": "User"
        },
        "__typename": "Review"
    },
    {
        "id": 21,
        "userId": 3,
        "review": "",
        "noOfStar": "0",
        "createdAt": "1619062440201",
        "updatedAt": null,
        "userDetails": {
            "id": 3,
            "firstName": "Bikal",
            "lastName": "Shrestha",
            "middleName": "",
            "slug": "bikal-shrestha-1612490170718",
            "userDetail": {
                "type": "mentor",
                "country": "Nepal",
                "image": "image-1612490252304.jpeg",
                "__typename": "UserDetail"
            },
            "__typename": "User"
        },
        "__typename": "Review"
    },
    {
        "id": 22,
        "userId": 3,
        "review": "",
        "noOfStar": "0",
        "createdAt": "1619062485473",
        "updatedAt": null,
        "userDetails": {
            "id": 3,
            "firstName": "Bikal",
            "lastName": "Shrestha",
            "middleName": "",
            "slug": "bikal-shrestha-1612490170718",
            "userDetail": {
                "type": "mentor",
                "country": "Nepal",
                "image": "image-1612490252304.jpeg",
                "__typename": "UserDetail"
            },
            "__typename": "User"
        },
        "__typename": "Review"
    },
    {
        "id": 23,
        "userId": 3,
        "review": "",
        "noOfStar": "0",
        "createdAt": "1619062553650",
        "updatedAt": null,
        "userDetails": {
            "id": 3,
            "firstName": "Bikal",
            "lastName": "Shrestha",
            "middleName": "",
            "slug": "bikal-shrestha-1612490170718",
            "userDetail": {
                "type": "mentor",
                "country": "Nepal",
                "image": "image-1612490252304.jpeg",
                "__typename": "UserDetail"
            },
            "__typename": "User"
        },
        "__typename": "Review"
    },
    {
        "id": 24,
        "userId": 3,
        "review": "",
        "noOfStar": "0",
        "createdAt": "1619062582435",
        "updatedAt": null,
        "userDetails": {
            "id": 3,
            "firstName": "Bikal",
            "lastName": "Shrestha",
            "middleName": "",
            "slug": "bikal-shrestha-1612490170718",
            "userDetail": {
                "type": "mentor",
                "country": "Nepal",
                "image": "image-1612490252304.jpeg",
                "__typename": "UserDetail"
            },
            "__typename": "User"
        },
        "__typename": "Review"
    },
    {
        "id": 25,
        "userId": 3,
        "review": "",
        "noOfStar": "0",
        "createdAt": "1619064848704",
        "updatedAt": null,
        "userDetails": {
            "id": 3,
            "firstName": "Bikal",
            "lastName": "Shrestha",
            "middleName": "",
            "slug": "bikal-shrestha-1612490170718",
            "userDetail": {
                "type": "mentor",
                "country": "Nepal",
                "image": "image-1612490252304.jpeg",
                "__typename": "UserDetail"
            },
            "__typename": "User"
        },
        "__typename": "Review"
    },
    {
        "id": 26,
        "userId": 3,
        "review": "",
        "noOfStar": "0",
        "createdAt": "1619070687552",
        "updatedAt": null,
        "userDetails": {
            "id": 3,
            "firstName": "Bikal",
            "lastName": "Shrestha",
            "middleName": "",
            "slug": "bikal-shrestha-1612490170718",
            "userDetail": {
                "type": "mentor",
                "country": "Nepal",
                "image": "image-1612490252304.jpeg",
                "__typename": "UserDetail"
            },
            "__typename": "User"
        },
        "__typename": "Review"
    },
    {
        "id": 27,
        "userId": 3,
        "review": "the course itself is good wished it also had unsupervised and reinforced learning in machine learning also the part where cnn is explained is a bit rushed many big concepts are explained in a very short way which lead to many confusions otherwise it's a go go course as a machine learning beginner",
        "noOfStar": "5",
        "createdAt": "1619143147422",
        "updatedAt": null,
        "userDetails": {
            "id": 3,
            "firstName": "Bikal",
            "lastName": "Shrestha",
            "middleName": "",
            "slug": "bikal-shrestha-1612490170718",
            "userDetail": {
                "type": "mentor",
                "country": "Nepal",
                "image": "image-1612490252304.jpeg",
                "__typename": "UserDetail"
            },
            "__typename": "User"
        },
        "__typename": "Review"
    }
]

const Reviews = () => {
    return (
        <>
            <ContentHeader title="Reviews" />
            <ContentWrapper>
                <div className="syllabus-editor"><p>Manage Reviews for the course</p></div>
                <ReviewsFilter />
                {reviews.map(item => <ReviewItem review={item} key={`r-item-${item.id}`} />)}
            </ContentWrapper>
        </>
    )
}

export default Reviews;
