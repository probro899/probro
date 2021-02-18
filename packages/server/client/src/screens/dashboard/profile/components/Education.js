import React from 'react';
import { MdEdit } from "react-icons/md";
import { GrFormAdd } from "react-icons/gr";
import moment from 'moment';
import { PopoverForm } from '../../../../components';
import { educationSchema } from '../structure';


const SchoolInfo = ({ data, editPopover }) => {
  return (
    <div className="p-edu-list-i">
      <img src="/assets/graphics/university.svg" alt="school icon" />
      <p>
        <span className="p-name-i">{data.degree}</span>
        <br />
        <span>{data.address}</span>
        <br />
        <span className="p-timeline">{`${moment(data.startTime, 'DD/MM/YYYY').format("MMM DD, YYYY")} - ${moment(data.endTime, 'DD/MM/YYYY').format("MMM DD, YYYY")}`}</span>
      </p>
      <p><MdEdit style={{ cursor: 'pointer' }} size={20} onClick={() => editPopover(data)} /></p>
    </div>
  );
};

class Education extends React.Component {
  state = {
    educationEditPopover: false,
    editObj: null,
  };

  editPopover = (obj) => {
    educationSchema.map((i) => {
      switch (i.id) {
        case 'degree':
          i['val'] = obj.degree;
          return i;
        case 'address':
          i['val'] = obj.address;
          return i;
        case 'startTime':
          i['val'] = moment(obj.startTime, 'DD/MM/YYYY').format("MMM DD, YYYY");
          return i;
        case 'endTime':
          i['val'] = moment(obj.endTime, 'DD/MM/YYYY').format("MMM DD, YYYY");
          return i;
        default:
          return i;
      }
    });
    this.togglePopover(obj);
  }

  addEducation = async (data) => {
    const { editObj } = this.state;
    const {
      apis, account, addDatabaseSchema,
      updateDatabaseSchema,
    } = this.props;
    const info = {
      ...data,
      startTime: data.startTime.toLocaleString('en-IN').split(',')[0],
      endTime: data.endTime.toLocaleString('en-IN').split(',')[0],
      userId: account.user.id,
    };
    if (editObj) {
      await apis.updateUserEducation([{ ...info }, { id: editObj.id }]);
      updateDatabaseSchema('UserEducation', { ...info, id: editObj.id });
      return { response: 200, message: 'Successfully Edited!' };
    }
    const res = await apis.addUserEducation(info);
    addDatabaseSchema('UserEducation', { ...info, id: res });
    return { response: 200, message: 'Successfully Added!' };
  }

  togglePopover = (obj = null) => {
    const { educationEditPopover } = this.state;
    this.setState({
      editObj: obj && obj.id ? obj : null,
      educationEditPopover: !educationEditPopover,
    });
  }

  onDelete = async () => {
    const { editObj } = this.state;
    const { apis, deleteDatabaseSchema } = this.props;
    await apis.deleteUserEducation({ id: editObj.id });
    deleteDatabaseSchema('UserEducation', { id: editObj.id });
    this.togglePopover(editObj);
  }

  render() {
    const { educationEditPopover, editObj } = this.state;
    const { database, account } = this.props;
    const schools = Object.values(database.UserEducation.byId).filter(obj => obj && account.user.id === obj.userId);
    return (
      <div className="education">
        <PopoverForm
          del={editObj}
          onDelete={this.onDelete}
          isOpen={educationEditPopover}
          structure={educationSchema}
          callback={this.addEducation}
          onClose={() => this.togglePopover()}
        />
        <h2 className="p-top">
          Education
          <GrFormAdd
            size={20}
            onClick={() => this.editPopover({
              startTime: new Date(),
              endTime: new Date(),
            })}
            style={{ cursor: 'pointer' }}
          />
        </h2>
        {schools.length !== 0 ? (
          <div className="p-edu-list">
            {
              schools.map(obj => <SchoolInfo editPopover={this.editPopover} data={obj} key={obj.id} />)
            }
          </div>
        )
          : (
            <div>
              <span style={{ color: '#696969' }}>No School Added</span>
            </div>
          )
        }
      </div>
    );
  }
}

export default Education;
