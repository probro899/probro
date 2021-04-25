import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Navbar } from '../home/component';
import Footer from '../../common/footer';
import Cover from './Cover';
import Contents from './Contents';

class CoursesDetailView extends React.Component {
    state = {};

    render() {
        return (
            <>
                <Navbar />
                <div className="pc-course-detail-page pc-container">
                    <Cover />
                    <Contents match={this.props.match} />
                </div>
                <Footer />
            </>
        )
    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(CoursesDetailView);