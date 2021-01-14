import React, { useMemo } from 'react';
import { useTable, usePagination, useFilters, useGlobalFilter } from 'react-table';

import { Filters } from '../filters/Filters';
import { SearchTable } from '../search-table/SearchTable';

import './table.scss';

const Table = ({ columns, data }) => {

    const defaultColumn = useMemo(
        () => ({
          Filter: Filters
        }),
        []
    )
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, 
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize, globalFilter },
        setGlobalFilter
    } = useTable(
        {
          columns,
          data,
          initialState: { pageIndex: 0, pageSize: 20 },
          defaultColumn,
        },
        useFilters,
        useGlobalFilter,
        usePagination,
    )

    const next = true;

    return (
        <div>
            <div className="table-top">
                <div className="select-div">
                    <span>Show</span>
                    <select
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                        className="select"
                        >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>{pageSize}</option>
                        ))}
                    </select>
                    <span id="entries">entries</span>
                </div>
                <SearchTable filter={globalFilter} setFilter={setGlobalFilter} />
            </div>
            <div className="table-div">
                <table {...getTableProps()} className="table">
                    <thead>
                        {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>
                                {column.render('Header')}
                                <div>{ (column.canFilter && column.Filter) ? column.render('Filter') : null}</div>
                            </th>
                            ))}
                        </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {
                            (page.length > 0) ? (
                                page.map(row => {
                                    prepareRow(row)
                                        return (
                                            <tr {...row.getRowProps()}>
                                                {row.cells.map(cell => {
                                                    return (
                                                    <td {...cell.getCellProps()}>
                                                        {cell.render('Cell')}
                                                    </td>
                                                    )
                                                })}
                                            </tr>
                                        )
                                    }
                                )
                            ) : (
                                <tr>
                                    <td style={{
                                        position: 'absolute',
                                        top: '54%',
                                        left: '35%',
                                        border: 'none',
                                    }}>Sorry, No Record Found For That Search Query...</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <div id="buttons">
                    <button 
                        className={` button`}
                        onClick={
                            () => gotoPage(0)
                        } 
                        disabled={
                            !canPreviousPage
                        }
                    >
                        Skip Backwards
                    </button>{' '}
                    <button 
                        className={` button`}
                        onClick={
                            () => previousPage()
                        } 
                        disabled={
                            !canPreviousPage
                        }
                    >
                    Previous
                    </button>{' '}
                    <button 
                        className={` ${ next ? 'button-next' : '' } button`}
                        onClick={
                            () => nextPage()
                        } 
                        disabled={
                            !canNextPage
                        }
                    >
                        Next
                    </button>{' '}
                    <button 
                        className={` ${ next ? 'button-next' : '' } button`}
                        onClick={
                            () => gotoPage(pageCount - 1)
                        } 
                        disabled={
                            !canNextPage
                        }
                    >
                        Skip Forward
                    </button>{' '}
                </div>
                <div id="paginationIdentifier">
                    <label>
                        Page{' '}<strong> {pageIndex + 1} of {pageOptions.length}</strong>{' '} | Go to page:{' '}
                    </label>
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(page)
                        }}
                        className='page-jumper'
                    />{' '}
                </div>
            </div>
        </div>
    )
}

export default Table;