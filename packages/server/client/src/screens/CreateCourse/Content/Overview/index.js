import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import ContentWrapper from '../../components/ContentWrapper';
import OverViewCard from '../../../dashboard/organizationDashboard/Home/Overview/OverViewCard';
import { BsFillPeopleFill } from 'react-icons/bs';
import { MdAttachMoney, MdRateReview } from 'react-icons/md';
import { AiOutlineStar } from 'react-icons/ai';

const OverView = () => {
    return (
        <>
            <ContentHeader title="Overview" />
            <ContentWrapper>
                <div className="syllabus-editor"><p>Overview for the course</p></div>
                <div className="data-length">
                    <label>
                        Date range:
                        <select className="custom-select-field">
                            <option value="12" selected>Last 12 months</option>
                            <option value="7">Last 7 days</option>
                            <option value="30">Last 30 days</option>
                            <option value="all">All time</option>

                        </select>
                    </label>
                </div>
                <div className="pc-overview-cards">
                    <OverViewCard title="Total Students" number="50" icon={<BsFillPeopleFill size={24} />} className="dark-blue" />
                    <OverViewCard title="Total Amount" number="$1000" icon={<MdAttachMoney size={24} />} className="green" />
                    <OverViewCard title="Total Reviews" number="15" icon={<MdRateReview size={24} />} className="red" />
                    <OverViewCard title="Total Course Review" number="55" icon={<AiOutlineStar size={24} />} className="light-blue" />
                </div>
            </ContentWrapper>
        </>
    )
}

export default OverView;
