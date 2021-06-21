import React from 'react';
import { Taginput } from '../../../../common';
import { GrAdd } from "react-icons/gr";
import Popup from '../../../../common/Form/Popup';
import { Button } from '../../../../common/utility-functions/Button/Button';
import Card from '../../../../common/Card';

const PopoverContent = (props) => {
  const { data, value, onChange, callback } = props;
  return (
    <div
      style={{
        padding: '10px 10px 0 10px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: 18,
          fontWeight: 600,
          paddingBottom: 10,
        }}
      >
        <span>Add Skills</span>
      </div>
      <Taginput data={data} onChange={onChange} value={value} />
      {/* <Button
       onClick={callback} fill intent="primary"
        large text="Add Skills" /> */}
      <Button
        onClick={callback}
        type="button"
        buttonStyle="btn--primary--solid"
        buttonSize="btn--medium"
        title="Add Skills"
      />
    </div>
  );
};

class Skills extends React.Component {
  state = {
    openPopover: false,
    value: [],
  };

  componentDidMount() {
    this.setSkills();
  }

  componentDidUpdate(prevProps) {
    const { skills } = this.props;
    if (skills.allIds !== prevProps.skills.allIds) {
      this.setSkills();
    }
  }

  setSkills = () => {
    const { skills, account } = this.props;
    let skill = [];
    Object.values(skills.byId).map((obj) => {
      if (obj.userId === account.user.id) {
        skill = JSON.parse(obj.skill);
      }
    });
    this.setState({
      value: skill,
    });
  }

  togglePopover = () => {
    const { openPopover } = this.state;
    this.setState({
      openPopover: !openPopover,
    });
  }

  onChageSkill = (id, value) => {
    this.setState({
      value,
    });
  }

  submitSkills = async () => {
    const {
      apis,
      account,
      skills,
      updateDatabaseSchema,
      addDatabaseSchema,
    } = this.props;
    const { value } = this.state;
    let skill;
    Object.values(skills.byId).map((obj) => {
      if (obj.userId === account.user.id) {
        skill = obj;
      }
    });
    try {
      if (!skill) {
        await apis.addUserSkill({
          userId: account.user.id,
          skill: JSON.stringify(value),
        });
        addDatabaseSchema('UserSkill', {
          id: Date.now(),
          userId: account.user.id,
          skill: JSON.stringify(value),
        });
      } else {
        await apis.updateUserSkill([{
          userId: account.user.id,
          skill: JSON.stringify(value),
        }, { id: skill.id }]);
        updateDatabaseSchema('UserSkill', {
          id: skill.id,
          skill: JSON.stringify(value),
        });
      }
    } catch (e) {
      console.log('Error- ', e);
    }
    this.togglePopover();
  }

  render() {
    const { openPopover, value } = this.state;
    const { skills, account } = this.props;
    let skill;
    Object.values(skills.byId).map((obj) => {
      if (obj.userId === account.user.id) {
        skill = JSON.parse(obj.skill);
      }
    });
    const data = { id: 'skills', name: 'Skills', placeholder: 'Type and press enter' };
    return (
      <div className="skills">
        <Card>
          <Popup
            onClose={this.togglePopover}
            isOpen={openPopover}
          >
            <PopoverContent
              onChange={this.onChageSkill}
              value={value}
              data={data}
              callback={this.submitSkills}
            />
          </Popup>
          <div className="pc-content-header">
            <h2 className="pc-content-header__title">
              Skills
            </h2>
            <span className="pc-content-header__icon">
              <GrAdd size={20} style={{ cursor: 'pointer' }} onClick={this.togglePopover} />
            </span>
          </div>
          {skill ? (
            <div className="skills-container">
              {
                skill.map((i, index) => {
                  return (
                    <span key={index}>{i}</span>
                  );
                })
              }
            </div>
          )
            : (
              <div style={{ color: '#696969' }}>
                No skills added
              </div>
            )}
        </Card>
      </div>
    );
  }
}

export default Skills;
