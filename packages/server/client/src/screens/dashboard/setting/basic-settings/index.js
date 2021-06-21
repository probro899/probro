import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../actions';
import getName from '../../../../common/utility-functions/getName';
import BasicSettingContainer from './BasicSettingContainer';
import { Name, Gender, Headline, Address, CareerInterest, Country } from './components';


class BasicSettings extends React.Component {
    state = {};

    submitChange = async (data, table) => {
        const { apis, account } = this.props;
        try {
            if (table === 'User') {
                await apis[`update${table}`]([ { ...data }, { id: account.user.id } ]);
            } else {
                await apis[`update${table}`]({ ...data, userId: account.user.id });
            }
            return { response: 200, message: 'Changed successfully' };
        } catch (e) {
            return { response: 400, error: 'Internal server error' };
        }
    }

    getCareerInterests = (userDetail) => {
        if (!userDetail.field || JSON.parse(userDetail.field).length < 1) return null;
        return (
            <div className="skills-container">
                {JSON.parse(userDetail.field).map((obj, idx) => <span key={`career-${idx}`}>{obj}</span>)}
            </div>
        );
    }

    render() {
        const { account, database } = this.props;
        const user = Object.values(database.User.byId).find(u => u.id === account.user.id);
        let userDetail = Object.values(database.UserDetail.byId).find(obj => user.id === obj.userId) || {};
        const careerInterests = this.getCareerInterests(userDetail);
        return (
            <div className="basic-setting-wrappers">
                <BasicSettingContainer title="Full Name" subtitle={getName(user)} form={<Name callback={this.submitChange} instance={user} />} />
                <BasicSettingContainer title="Gender" subtitle={userDetail.gender} form={<Gender callback={this.submitChange} instance={userDetail} />} />
                <BasicSettingContainer title="Headline" subtitle={userDetail.headLine} form={<Headline callback={this.submitChange} instance={userDetail} />} />
                <BasicSettingContainer title="Country" subtitle={userDetail.country} form={<Country callback={this.submitChange} instance={userDetail} />} />
                <BasicSettingContainer title="Address" subtitle={userDetail.address} form={<Address callback={this.submitChange} instance={userDetail} />} />
                <BasicSettingContainer title="Career Interests" subtitle={careerInterests} form={<CareerInterest callback={this.submitChange} instance={userDetail} />} />
            </div>
        );
    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(BasicSettings);
