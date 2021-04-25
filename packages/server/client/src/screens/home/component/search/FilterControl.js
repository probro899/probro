import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { BiChevronUp } from 'react-icons/bi';
import countryList from 'react-select-country-list';
import { Button } from '../../../../common/utility-functions/Button/Button';
import { Collapse } from '../../../../common/Collapse';

class FilterControl extends React.Component {
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
            countries: countryList().getData().map(obj => ({ label: obj.label, value: obj.label })),
        };
    }

    toggleMenu = () => {
        const { open } = this.state;
        this.setState({
            open: !open,
        });
    }

    toggleButton = () => {
        const { isCollapsed } = this.state;
        this.setState({
            isCollapsed: !isCollapsed
        });
    }

    showOrHide = () => {
        const { isCollapsed } = this.state;
        return {
            display: isCollapsed ? 'none' : 'flex',
        }
    }

    rotateIcon = () => {
        const { open } = this.state;
        return {
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        }
    }

    onChange = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            }
        });
    }

    applyFilter = (e) => {
        const { callback } = this.props;
        const { form } = this.state;
        callback(form)
    }

    render() {
        const { countries, form } = this.state;
        return (
            <div className="filter-control">
                <div className='filter'>
                    Search Filter
                </div>
                <Collapse isOpen={this.state.open}>
                    <div style={this.showOrHide()} className="filter-inputs">

                        <div className='search'>
                            <BsSearch className="search-icon" />
                            <input name="searchKey" type="search" onChange={this.onChange} value={form.searchKey} placeholder='Search...' />
                        </div>

                        <div className='input-group'>
                            <div className="select-country">
                                <select value={form.country} name="country" onChange={this.onChange}>
                                    <option value="">Select country</option>
                                    {
                                        countries.map(obj => {
                                            return (
                                                <option value={obj.value}>{obj.label}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className='select-industry'>
                                <select name="industry" value={form.industry} onChange={this.onChange}>
                                    <option value="">Industry Stack</option>
                                    <option value="engineering">Engineering</option>
                                    <option value="medicine">Medicine</option>
                                    <option value="politics">Accounting</option>
                                    <option value="loksewa">Loksewa</option>
                                </select>
                            </div>
                        </div>

                        <div className='select-language'>
                            <select name="skill" value={form.skill} onChange={this.onChange}>
                                <option value="">Skill</option>
                                <option value="JavaScript">Javascript</option>
                                <option value="Python">Python</option>
                                <option value="Wordpress">Wordpress</option>
                            </select>
                        </div>
                    </div>
                </Collapse>
                <div className="filter-inputs pc-desktop-filter">

                    <div className='search'>
                        <BsSearch className="search-icon" />
                        <input name="searchKey" type="search" onChange={this.onChange} value={form.searchKey} placeholder='Search...' />
                    </div>

                    <div className='input-group'>
                        <div className="select-country">
                            <select value={form.country} name="country" onChange={this.onChange}>
                                <option value="">Select country</option>
                                {
                                    countries.map(obj => {
                                        return (
                                            <option value={obj.value}>{obj.label}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className='select-industry'>
                            <select name="industry" value={form.industry} onChange={this.onChange}>
                                <option value="">Industry Stack</option>
                                <option value="engineering">Engineering</option>
                                <option value="medicine">Medicine</option>
                                <option value="politics">Accounting</option>
                                <option value="loksewa">Loksewa</option>
                            </select>
                        </div>
                    </div>

                    <div className='select-language'>
                        <select name="skill" value={form.skill} onChange={this.onChange}>
                            <option value="">Skill</option>
                            <option value="JavaScript">Javascript</option>
                            <option value="Python">Python</option>
                            <option value="Wordpress">Wordpress</option>
                        </select>
                    </div>
                </div>
                <div>
                    <Button onClick={this.applyFilter}
                        type="button"
                        buttonStyle="btn--primary--solid"
                        buttonSize="btn--small"
                        loading={false}
                        disabled={false}
                        title="Apply Filter" />
                </div>

                <span style={this.rotateIcon()} onClick={this.toggleMenu} className='arrow-icon'>
                    <BiChevronUp />
                </span>
            </div>
        )
    }
}

export default FilterControl;