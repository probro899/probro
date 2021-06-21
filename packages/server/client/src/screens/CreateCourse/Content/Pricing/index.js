import React from 'react';
import { connect } from 'react-redux';
import updateCourse from '../../../../actions/courseAction';
import ContentHeader from '../../components/ContentHeader';
import ContentWrapper from '../../components/ContentWrapper';
import PricingForm from './PricingForm';
import Alert from '../../../../common/Alert';
import { SwitchButton } from '../../../../common/Form/SwitchButton';
import { Spinner } from '../../../../common';

class Pricing extends React.Component {
    state = { loading: true, priceDetails: null, alert: { message: '', status: 'success', isOpen: false } };

    async componentDidMount() {
      const { courseId, apis, updateCourse } = this.props;
      if (courseId) {
        const res = await apis.getCourseDetails({ courseId: parseInt(courseId, 10) });
        updateCourse({ courseId: res.course.id, status: res.course.status });
        if (res) {
          this.setState({ loading: false, priceDetails: res.priceDetails });
        } 
      }
    }

    toggleAlert = (data) => this.setState({ alert: { ...data } });
    
    toggleFree = async () => {
        const { priceDetails } = this.state;
        if (priceDetails && priceDetails.price < 1) {
            this.setState({ priceDetails: { ...priceDetails, price: 1 }});
            return;
        }
        this.savePrice({ currency: 'NPR', price: 0, discount: 0 });
    }

    savePrice = async (data) => {
        const { priceDetails } = this.state;
        const { apis, courseId } = this.props;
        if (priceDetails) {
            await apis.updateCoursePrice([{ ...data }, { id: priceDetails.id }]);
            this.setState({ priceDetails: { ...priceDetails, ...data }});
        } else {
            let coursePriceObj = { ...data, courseId: parseInt(courseId, 10) };
            const res = await apis.addCoursePrice(coursePriceObj);
            this.setState({ priceDetails: { ...coursePriceObj, id: res } });
        }
        this.toggleAlert({ message: 'Congratulations! you have updated pricing information', status: 'success', isOpen: true });
    }

    render() {
        const { alert, loading, priceDetails } = this.state;
        if (loading) return <Spinner />;
        const isFree = priceDetails && priceDetails.price < 1; 
        return (
            <>
                <ContentHeader title="Pricing" />
                <ContentWrapper>
                    <Alert isOpen={alert.isOpen} onClose={() => this.toggleAlert({ ...alert, isOpen: false })} status={alert.status} title={alert.message} />
                    <div className="course-price-container">

                        <div className="free-course-switch">
                            <span className="free-title"> If you intend to offer your course for free, click on toggle button:</span>
                            <SwitchButton onChange={this.toggleFree} checked={isFree} />
                        </div>
                        {
                            !isFree &&
                            <div>
                                <p className="price-description">Add pricing information.</p>
                                <PricingForm toggleAlert={this.toggleAlert} savePrice={this.savePrice} priceDetails={priceDetails} />
                            </div>
                        }
                    </div>
                </ContentWrapper>
            </>
        )
    }
}

const mapStateToProps = ({ course }) => ({ course });
export default connect(mapStateToProps, { updateCourse })(Pricing);
