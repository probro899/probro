import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import ContentWrapper from '../../components/ContentWrapper';
import Pagination from '../../../../common/Pagination'
import { Link } from 'react-router-dom';

const studentData = [
    {
        id: 1,
        name: 'Hari Bahadur',
        email: 'hari@gmail.com',
        totalAmount: 'NRS 15000',
        status: 'paid',
        joinedDate: '  2021-05-25',
        projects: ['HTML, CSS', 'Python']
    },
    {
        id: 2,
        name: 'Ram Bahadur',
        email: 'ram@gmail.com',
        totalAmount: 'NRS 10000',
        status: 'partial',
        joinedDate: '  2021-04-25',
        projects: ['HTML, CSS', 'Java']
    },
    {
        id: 3,
        name: 'Shyam Bahadur',
        email: 'shyam@gmail.com',
        totalAmount: 'NRS 0',
        status: 'free',
        joinedDate: '  2021-06-25',
        projects: ['C#', 'Java']
    },
]

const Performance = () => {
    return (
        <>
            <ContentHeader title="Students" />
            <ContentWrapper>
                <div className="syllabus-editor"><p>Manage students for the course</p></div>
                <div className="student-data-table">
                    <div className="data-length">
                        <label>
                            Show
                            <select className="custom-select-field">
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                                <option value="50">50</option>
                            </select>
                            entries
                        </label>
                    </div>
                    <table className="pc-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Total Amount</th>
                                <th>Status</th>
                                <th>Joined Date</th>
                                <th>Projects</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                studentData && studentData.map((data) => (
                                    <tr>
                                        <td>{data.id}</td>
                                        <td>
                                            <Link to="#" >{data.name}</Link>
                                        </td>
                                        <td>
                                            {data.email}
                                        </td>
                                        <td>
                                            {data.totalAmount}
                                        </td>
                                        <td>
                                            <span className={`payment-status ${data.status}`}>  {data.status}</span>
                                        </td>
                                        <td>
                                            {data.joinedDate}
                                        </td>
                                        <td>
                                            <div>
                                                {
                                                    data.projects.map((project) => <p><Link to="#">{project}</Link></p>)
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    {
                        studentData.length > 0 && (<div className="list-pagination pagination-info">
                            <p>
                                Showing 1 to 9 of 9 entries
                            </p>
                            <Pagination
                                pageCount={2}
                                page={1}
                                setPage={() => console.info('h')}
                            />
                        </div>)
                    }
                </div>
            </ContentWrapper>
        </>
    )
}

export default Performance;
