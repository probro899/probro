import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { BiChevronUp } from 'react-icons/bi';
import countryList from 'react-select-country-list';
import { Button } from '../../../../common/utility-functions/Button/Button';

class FilterControl extends React.Component {
    constructor(props) {
        super(props);
        const { allParams } = props;
        this.state = {
            isCollapsed: false,
            form: {
                searchKey: allParams.searchKey,
                country: allParams.country,
                industry: allParams.industry,
                skill: allParams.skill,
            },
            countries: countryList().getData().map(obj => ({ label: obj.label, value: obj.label })),
        };
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
        const { isCollapsed } = this.state;
        return {
            transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
            // marginTop: isCollapsed ? '0px' : '20px'
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

                <div>
                    {/* <button style={this.showOrHide()} onClick={this.applyFilter} className='filter-apply-btn'>
                        Apply filter
                </button> */}
                    <Button onClick={this.applyFilter}
                        type="button"
                        buttonStyle="btn--primary--solid"
                        buttonSize="btn--small"
                        loading={false}
                        disabled={false}
                        title="Apply Filter" />
                </div>

                <span style={this.rotateIcon()} onClick={this.toggleButton} className='arrow-icon'>
                    <BiChevronUp />
                </span>
            </div>
        )
    }
}

export default FilterControl;