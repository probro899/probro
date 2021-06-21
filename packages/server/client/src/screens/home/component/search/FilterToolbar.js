import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { BiChevronUp } from 'react-icons/bi';
import Card from '../../../../common/Card';
import { Button } from '../../../../common/utility-functions/Button/Button';
import { Collapse } from '../../../../common/Collapse';
import { FormTextInput } from '../../../../common/Form/FormTextInput';
import { FormSelectField } from '../../../../common/Form/FormSelectField';
import filterOptions from './structure';

class FilterToolbar extends React.Component {
  constructor(props) {
    super(props);
    const { allParams } = props;
    this.state = {
      isCollapsed: false,
      open: false,
      form: {
        searchKey: allParams.searchKey,
        country: allParams.country,
        industry: allParams.industry,
        skill: allParams.skill,
      },
      filterOptions: filterOptions(),
    };
  }

  toggleMenu = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  toggleButton = () => {
    const { isCollapsed } = this.state;
    this.setState({ isCollapsed: !isCollapsed });
  }

  showOrHide = () => {
    const { isCollapsed } = this.state;
    return { display: isCollapsed ? 'none' : 'flex' }
  }

  rotateIcon = () => {
    const { open } = this.state;
    return { transform: open ? 'rotate(0deg)' : 'rotate(180deg)' }
  }

  onChange = (e) => this.setState({ form: { ...this.state.form, [e.target.name]: e.target.value } });

  applyFilter = (e) => {
    const { callback } = this.props;
    const { form } = this.state;
    callback(form)
  }

  getFields = () => {
    const { form, filterOptions } = this.state;
    return (
      <>
        <div className='search'>
          <FormTextInput name="searchKey" value={form.searchKey} type="search" onChange={this.onChange} placeholder='Search...' leftElement={<FiSearch size={20} />} />
        </div>
        <div className='input-group'>
          <div className="select-country">
            <FormSelectField onChange={this.onChange} name="country" value={form.country} options={filterOptions.countryOptions} />
          </div>
          <div className='select-industry'>
            <FormSelectField onChange={this.onChange} name="industry" value={form.industry} options={filterOptions.industryOptions} />
          </div>
        </div>
        <div className='select-language'>
          <FormSelectField onChange={this.onChange} name="skill" value={form.skill} options={filterOptions.skillOptions} />
        </div>
      </>
    )
  }

  render() {
    const { open } = this.state;
    return (
      <div className="filter-toolbar">
        <Card>
          <div className="filter-control">
            <div className='filter'>Search Filter</div>
            <Collapse isOpen={open}>
              <div style={this.showOrHide()} className="filter-inputs">{this.getFields()}</div>
            </Collapse>
            <div className="filter-inputs pc-desktop-filter">{this.getFields()}</div>
            <div>
              <Button onClick={this.applyFilter}
                type="button"
                buttonStyle="btn--primary--solid"
                buttonSize="btn--small"
                loading={false}
                disabled={false}
                title="Apply Filter"
              />
            </div>
            <span style={this.rotateIcon()} onClick={this.toggleMenu} className='arrow-icon'><BiChevronUp /></span>
          </div>
        </Card>
      </div>
    )
  }
}

export default FilterToolbar;
