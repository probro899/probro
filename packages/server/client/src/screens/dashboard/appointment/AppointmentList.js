import React, { useState, useEffect } from 'react';
import NoRecordFound from '../../../common/NoRecordFound';
import Pagination from '../../../common/Pagination';

const AppointmentList = () => {
    const tableData = [
        {
            name: 'Test Appointment 1',
            classroom: 'Classroom Name 1',
            fromDate: 'Apr 05, 2021 08:03',
            toDate: 'Apr 08, 2021 09:03',
            status: 'active'
        },
        {
            name: 'Test Appointment 2',
            classroom: 'Classroom Name 2',
            fromDate: 'Apr 09, 2021 10:03',
            toDate: 'Apr 12, 2021 02:03',
            status: 'cancelled'
        },
        {
            name: 'Test Appointment 3',
            classroom: 'Classroom Name 3',
            fromDate: 'Apr 07, 2021 03:03',
            toDate: 'Apr 11, 2021 08:03',
            status: 'completed'
        },
        {
            name: 'Test Appointment 3',
            classroom: 'Classroom Name 3',
            fromDate: 'Apr 07, 2021 03:03',
            toDate: 'Apr 11, 2021 08:03',
            status: 'completed'
        },
        {
            name: 'Test Appointment 3',
            classroom: 'Classroom Name 3',
            fromDate: 'Apr 07, 2021 03:03',
            toDate: 'Apr 11, 2021 08:03',
            status: 'completed'
        }
    ];
    // for pagination
    const [countPerPage] = useState(4);
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);

    const pageCount = Math.ceil(tableData.length / countPerPage);

    useEffect(() => {
        setData(tableData.slice(countPerPage * page - countPerPage, countPerPage * page));
    }, [page, countPerPage]);

    return (
        <>
            <div className="appointment-list">
                <table className="appointment-table">
                    <thead>
                        <tr>
                            <th>
                                Name
                        </th>
                            <th>
                                Classroom
                        </th>
                            <th>
                                From
                        </th>
                            <th>
                                To
                        </th>
                            <th>
                                Status
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tableData.length ? tableData.map((data) => (
                                <tr>
                                    <td>{data.name}</td>
                                    <td>{data.classroom}</td>
                                    <td>{data.fromDate}</td>
                                    <td>{data.toDate}</td>
                                    <td>{data.status}</td>
                                </tr>
                            )) : <tr>
                                <td colSpan="5">
                                    <NoRecordFound />
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
            {
                tableData.length && <div className="list-pagination">
                    <Pagination
                        pageCount={pageCount}
                        page={page}
                        setPage={setPage}
                    />
                </div>
            }

        </>
    )
}

export default AppointmentList;
