import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import ContentWrapper from '../../components/ContentWrapper';
import SyllabusContent from './SyllabusContent';

const Syllabus = (props) => {
    return (
        <div>
            <ContentHeader title="Syllabus" />
            <ContentWrapper>
                <SyllabusContent {...props} />
            </ContentWrapper>
        </div>
    )
}

export default Syllabus;