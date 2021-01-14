import React, { useMemo, useState, useEffect } from "react";

import { Filters } from '../filters/Filters';

import Table from '../table/Table';
import './table-overview.scss';
 
const TableOverview = () => {
    const [ loadingData, setLoadingData ] = useState(true);
 
    const columns = useMemo(
        () => [
            {
                Header: 'First Name',
                accessor: 'FirstName', 
                Filter: Filters,
            },
            {
                Header: 'Last Name',
                accessor: 'LastName',
                Filter: Filters,
            },
            {
                Header: 'Gender',                    
                accessor: 'Gender',
                Filter: Filters,
            },
            {
                Header: 'Latitude',
                accessor: 'Latitude',
            },
            {
                Header: 'Longitude',
                accessor: 'Longitude',
            },
            {
                Header: 'Credit Card Number',
                accessor: 'CreditCardNumber',
            },
            {
                Header: 'Credit Card Type',
                accessor: 'CreditCardType',
            },
            {
                Header: 'Email',
                accessor: 'Email',
            },
            {
                Header: 'Domain Name',
                accessor: 'DomainName',
            },
            {
                Header: 'Phone Number',
                accessor: 'PhoneNumber',
            },               
            {
                Header: 'Mac Address',
                accessor: 'MacAddress',
            },
            {
                Header: 'URL',
                accessor: 'URL',    
            },
            {
                Header: 'User Name',
                accessor: 'UserName',
            },
            {
                Header: 'Last Login',
                accessor: 'LastLogin',
            },
            {
                Header: 'Payment Method',
                accessor: 'PaymentMethod',
            },
        ], []
    )

    const [ data, setData ] = useState();
    
    useEffect(() => {
        const getData = async () => {
            let response = await fetch('https://api.enye.tech/v1/challenge/records');
            let result = await response.json();
            console.log(result.records.profiles);
            setData(result.records.profiles);
            setLoadingData(false);
        }
        if (loadingData) {
          getData();
        }
    }, [loadingData]);
    
 
    return (
        <div className="table-overview">
            { 
                loadingData ? (
                    <div className='table-loading'>
                        <h2>Table Data Is Loading...</h2>
                    </div>
                ) : (
                    <Table columns={columns} data={data} />
                )
            }
        </div>
    );
}


export default TableOverview;