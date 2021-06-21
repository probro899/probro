import React from 'react';
import { BsPerson } from 'react-icons/bs';
import { TiEdit } from 'react-icons/ti';
import { FaProjectDiagram } from 'react-icons/fa';
import Card from '../../../common/Card';

const contents = [
    {
      id: 1,
      icon: <BsPerson size={25} />,
      title: 'Create Account',
      description: 'Sign up to own a dashboard and connect with Mentors'
    },
    {
      id: 2,
      icon: <TiEdit size={25} />,
      title: 'Enroll into Course',
      description: 'Choose courses of your interest, and start learning'
    },
    {
      id: 3,
      icon: <FaProjectDiagram size={25} />,
      title: 'Industry Level Projects',
      description: 'Complete the industry level projects in your course and get certified'
    },
]

const HowItWorks = () => {
    return (
        <div className="how-it-works pc-container">
            <div className="pc-row">
                <div className="left-col pc-col">
                    <div className="left-content">
                        <h2 className="content-header">Simple 3 Way to Start Learning </h2>
                    </div>
                </div>
                <div className="right-col pc-col">
                    <div className="right-content">
                        {
                            contents && contents.map((content) => (
                                <div key={`con-${content.id}`} className="content-section pc-col">
                                    <Card>
                                        <div className="top-section">
                                            <div className="icon-section">
                                                {content.icon}
                                            </div>
                                            <div className="title-section">
                                                {content.title}
                                            </div>
                                        </div>
                                        <div className="bottom-section">
                                            <p className="botom-content">
                                                {content.description}
                                            </p>
                                        </div>
                                    </Card>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HowItWorks;
