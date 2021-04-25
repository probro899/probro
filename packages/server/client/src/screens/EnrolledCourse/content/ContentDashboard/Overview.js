import React from 'react';
import OverviewDescription from './OverviewDescription';

const Overview = () => {
    return (
        <div className="course-overview-container">
            <div className="course-overview-heading">
                <div className="overview-heading">
                    About this course
                </div>
                <p className="overview-brief">
                    Learn how to develop reliable and scalable back-end applications effortlessly using Serverless Framework
                </p>
            </div>
            <OverviewDescription title="Instructor" content=" <p>I am a passionate Software Engineer with years of experience in front- and back-end development.</p>
            <p>I have profiles on several mentorship platforms where I maintain a solid 5-star rating.</p>
            "
            />
            <OverviewDescription title="By the numbers" content=" <p>Skill level: All Levels</p>
                    <p>Students: 56228</p>
                    <p>Languages: English</p>
                    <p>Lectures: 76</p>"
            />
            <OverviewDescription title="Description" content="<p>Ever felt like you would like to build a back-end application that can handle <strong>millions of users</strong>, but you were terrified by the idea of managing (or learning how to manage) the infrastructure behind it?</p>
                    <p><strong>Serverless Architecture</strong> takes the pain of site reliability off your shoulders. With Serverless Architecture, you and your team can focus on feature development. Your application will <strong>scale effortlessly</strong>, serving users <strong>reliably</strong>. You do not need to be an infrastructure expert to serve an application at scale. With Serverless, you <strong>only pay for what you use</strong>.</p>
                    <p>More than that, Serverless Framework intelligently helps you manage your infrastructure as code (IaC), which eliminates the chance of paying for services that are not in use.</p><p>More than that, Serverless Framework intelligently helps you manage your infrastructure as code (IaC), which eliminates the chance of paying for services that are not in use.</p><p>More than that, Serverless Framework intelligently helps you manage your infrastructure as code (IaC), which eliminates the chance of paying for services that are not in use.</p><p>More than that, Serverless Framework intelligently helps you manage your infrastructure as code (IaC), which eliminates the chance of paying for services that are not in use.</p>"
            />
        </div>
    )
}

export default Overview;
