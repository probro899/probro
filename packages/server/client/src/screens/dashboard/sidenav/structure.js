import React from 'react';
import { AiOutlineProject } from "react-icons/ai";
import { BsFillPersonFill, BsFillPeopleFill } from "react-icons/bs";
import { BiParagraph, BiCog } from "react-icons/bi";
import { RiQuillPenFill } from 'react-icons/ri';
import { GiPaintBrush } from 'react-icons/gi';
import { FaRegCalendarCheck } from 'react-icons/fa';

export default (isMentor) => {
  let mainStructure = [
      { iconName: <BsFillPersonFill size={20} />, name: 'Profile', url: '', active: true },
      { iconName: <AiOutlineProject size={20} />, name: 'Classes', url: 'classes', active: true },
      { iconName: <BsFillPeopleFill size={20} />, name: 'Connections', url: 'connection', active: true },
      { iconName: <GiPaintBrush size={20} />, name: 'Drawing Board', url: 'drawing-board', active: true },
      { iconName: <RiQuillPenFill size={20} />, name: 'Courses', url: 'courses', active: true },
      { iconName: <BiParagraph size={20} />, name: 'Blog', url: 'blog', active: true },
      { iconName: <FaRegCalendarCheck size={20} />, name: 'Appointment', url: 'appointment', active: isMentor },
      { iconName: <BiCog size={20} />, name: 'Settings', url: 'settings/basic', active: true },
  ];
  return mainStructure;
}
