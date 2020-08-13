import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const api = process.env.REACT_APP_API_URL

export default function GridData() {

    const classes = useStyles();

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                api + '/getLog',
            );
            setData(result.data);
        };
        fetchData();
    }, []);

    const info = [];

    data.map(row => (
        console.log(row)
    ))

    for (const key of Object.keys(data)) {
        info.push(
            <TableRow key={data[key].rutCliente+key}>
                <TableCell component="th" scope="row">
                    {data[key].rutCliente}
                </TableCell>
            </TableRow>
        )  
    }


    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Usuario (Rut Cliente)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {info}
                </TableBody>
            </Table>
        </TableContainer>
    );
}