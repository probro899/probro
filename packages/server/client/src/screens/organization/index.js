import React, { Component } from 'react'
import { Navbar } from '../home/component';
import { CoverPicture } from './CoverPicture';
import { OrganizationBasicInfo } from './OrganizationBasicInfo';
import { OrganizationHeadline } from './OrganizationHeadline';
import { JoinedMembers } from './JoinedMembers';
import { Support } from './Support';
import { PopularOnPc } from '../../common/PopularOnPc';
import Footer from '../../common/footer';

const data = {
  blogData: [
    {
      id: 1,
      name: "Test Blog 1",
      author: 'Bikal Shrestha',
      date: 'Tue Jan 26 2021',
      image: '/assets/graphics/blog-img.jpg',
    },
    {
      id: 2,
      name: "Test Blog 2",
      author: 'Bikal Shrestha',
      date: 'Tue Jan 26 2020',
      image: '/assets/graphics/blog-img.jpg',

    },
    {
      id: 3,
      name: "Test Blog 3",
      author: 'Bikal Shrestha',
      date: 'Tue Jan 16 2021',
      image: '/assets/graphics/blog-img.jpg',
    },
  ],
  userData: [
    {
        id: 1,
        name: 'Bikal Shrestha',
        country: 'Nepal',
        connected: true,
        image: 'http://localhost:3000/assets/user/10000003/profile/thumbnail-1607482166799.jpeg'
    },
    {
        id: 2,
        name: 'Ram Shrestha',
        country: 'Nepal',
        connected: false,
        image: 'http://localhost:3000/assets/user/10000003/profile/thumbnail-1607482166799.jpeg'
    },
  ]
}

export default class OrganizationPublicView extends Component {
    state = {};
    render() {
        return (
            <>
                <Navbar />
                <div className="pc-organization-public-profile pc-container">
                    <div className="pc-org-right-section pc-org-col">
                        <CoverPicture />
                        <OrganizationBasicInfo />
                        <OrganizationHeadline />
                        <JoinedMembers />
                        <Support />
                    </div>
                    <PopularOnPc data={data} />
                </div>
                <Footer />
            </>
        )
    }
}