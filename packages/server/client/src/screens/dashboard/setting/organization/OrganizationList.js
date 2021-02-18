import React, { Component } from 'react'
import { MoreButton } from '../../../../components';
import { Link } from 'react-router-dom';

const orgData = [
    {
        id: "23",
        name: "Test Organization 1",
        location: "Kathmandu, Nepal",
        image: "/assets/graphics/img-1.svg",
    },
    {
        id: "12",
        name: "Test Organization 2",
        location: "Lalitpur, Nepal",
        image: "/assets/graphics/img-2.svg",
    },
    {
        id: "233",
        name: "Test Organization 3",
        location: "Bhaktapur, Nepal",
        image: "/assets/graphics/img-3.svg",
    },

]

export class OrganizationList extends Component {

    render() {
        const { match } = this.props;
        return (
            <div className="pc-organization-list">
                {
                    orgData.length ?
                        orgData.map(data => <div className="pc-org-list-container">
                            <div className="pc-each-org-wrapper">
                                <div className="pc-org-img-container">
                                    <MoreButton />
                                    <figure>
                                        <img
                                            alt={data.name}
                                            src={data.image}
                                        />
                                    </figure>
                                </div>
                                <div className="pc-org-detail-container">
                                    <div className="pc-org-name">
                                        <Link to={`/dashboard/${match.params.id}/organization/${data.id}`}>
                                            {data.name}
                                        </Link>
                                    </div>
                                    <div className="pc-org-address">
                                        <p>{data.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>) : <p className="no-organization-title">You don't have any organization. Create One?</p>
                }
            </div>
        )
    }
}
