import React from 'react';
import { AiOutlineProject } from "react-icons/ai";
import { BsFillPersonFill, BsFillPeopleFill } from "react-icons/bs";
import { BiParagraph, BiCog } from "react-icons/bi";
import { RiQuillPenFill } from 'react-icons/ri';
import { GiPaintBrush } from 'react-icons/gi';
import { FaRegCalendarCheck } from 'react-icons/fa';


export default () => {
    let mainStructure = [
        { iconName: <BsFillPersonFill size={20} />, name: 'Profile', url: '' },
        { iconName: <AiOutlineProject size={20} />, name: 'Classes', url: 'classes' },
        { iconName: <BsFillPeopleFill size={20} />, name: 'Connections', url: 'connection' },
        { iconName: <GiPaintBrush size={20} />, name: 'Drawing Board', url: 'drawing-board' },
        { iconName: <RiQuillPenFill size={20} />, name: 'Courses', url: 'courses' },
        { iconName: <BiParagraph size={20} />, name: 'Blog', url: 'blog' },
        { iconName: <FaRegCalendarCheck size={20} />, name: 'Appointment', url: 'appointment' },
        { iconName: <BiCog size={20} />, name: 'Settings', url: 'settings/basic' },
    ];
    return mainStructure;
}
