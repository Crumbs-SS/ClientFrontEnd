import React from "react";
import { DataGrid } from '@material-ui/data-grid';


const DriverRatingsTable = ({driverRatings}) => {

    const rows = driverRatings.map((rating, index) => {
        return {
            id:index,
            date: rating.order.deliveredAt,
            restaurant: rating.order.restaurant.name,
            rating: rating.rating,
            description: rating.description
        }
    });
    const columns = [
        {
            field: 'id',
            hide: true
        },
        {
            field: 'date',
            headerName: 'Delivered On',
            width: 165,
            editable: false,
            valueFormatter: (params) => {
                return `${params.value.split('T')[0]} at ${params.value.split('T')[1].split('.')[0]}`;
            },
        },
        {
            field: 'restaurant',
            headerName: 'Restaurant',
            width: 150,
            editable: false,
        },
        {
            field: 'rating',
            headerName: 'Rating',
            width: 125,
            editable: false,
        },
        {
            field: 'description',
            headerName: 'Description',
            disableColumnFilter: true,
            disableColumnMenu: true,
            disableColumnSelector: true,
            disableSelectionOnClick: true,
            sortable: false,
            width: 320,
            editable: false,
        }
    ];

    return(
        <React.Fragment>
            <div style={{ height: 450, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={6}
                        rowsPerPageOptions={[6]}
                    />
                </div>
        </React.Fragment>
    )

}
export default DriverRatingsTable;
