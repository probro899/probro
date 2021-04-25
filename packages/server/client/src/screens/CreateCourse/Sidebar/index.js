import React from 'react';
import SidebarMenus from './SidebarMenus';
import { Button } from '../../../common/utility-functions/Button/Button';

const Sidebar = (props) => {
    return (
        <>
            <div className="pcc-nav">
                <div className="pcc-sidebar">
                    <div className="nav-collapse">
                        <SidebarMenus {...props} />
                    </div>
                    <div className="course-publish-btn">
                        <Button
                            onClick={() => { }}
                            type="button"
                            buttonStyle="btn--primary--solid"
                            buttonSize="btn--medium"
                            title="Submit for Review"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;
