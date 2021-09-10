import React from "react";
import {
    Button,
    Typography,
} from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';

const RecentOrders = ({ id, rerender }) => {

 
    const rows =  [ {id: '0', time: '18:00', amount: '2', status: 'Done', order: null } ] 
    

    const columns = [
        {
            field: 'id',
            hide: true
        },
        {
            field: 'time',
            headerName: 'Order Placed At',
            width: 165,
            editable: false,
            disableColumnFilter: true,
            disableColumnMenu: true,
            disableColumnSelector: true,
            disableSelectionOnClick: true,
            valueFormatter: (params) => {
                return `${params.value}`;
            },
        },
        {
            field: 'amount',
            headerName: 'Amount',
            width: 111,
            editable: false,
            disableColumnFilter: true,
            disableColumnMenu: true,
            disableColumnSelector: true,
            disableSelectionOnClick: true,
            valueFormatter: (params) => {
                return `${params.value} $`;
            },
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 180,
            editable: false,
            disableColumnFilter: true,
            disableColumnMenu: true,
            disableColumnSelector: true,
            disableSelectionOnClick: true,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 95,
            disableClickEventBubbling: true,
            disableColumnSelector: true,
            disableColumnFilter: true,
            disableColumnMenu: true,
            sortable: false,
            disableSelectionOnClick: true,
            renderCell: (params) => {
                return <Button size="small" color="primary" variant="contained" onClick={() => {}}>View</Button>;
            }

        },
        {
            field: 'order',
            hide: true
        }
    ];

    
        return (
            <React.Fragment>
                
                <Typography component="h1" variant="h6" color="inherit" >
                    Pending Orders:
                </Typography>
                <br />
                <div style={{ height: 595, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={9}
                        rowsPerPageOptions={[9]}
                    />
                </div>
            </React.Fragment>
        );
    
}
export default RecentOrders;
