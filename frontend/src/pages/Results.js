import React, { useEffect, useState } from 'react'
import { Link, useParams, useLocation } from "react-router-dom";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Pagination from "@material-ui/lab/Pagination";
import {
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableHead,
} from "@material-ui/core";
import PaginationItem from "@material-ui/lab/PaginationItem";
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > * + *': {
        justifyContent: 'center'
      },
    },
  }));

const api = process.env.REACT_APP_API_URL

export default function Results() {

    const classes = useStyles();
    const location = useLocation();

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [logsPerPage] = useState(100);

    const { pageNumber = 1 } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true) 
            const result = await axios(
                api + '/' + location.state.log, {
                    params: {
                        server : location.state.server,
                        startDate : location.state.startDate,
                        endDate : location.state.endDate,
                        rut : location.state.rut
                    }
                } 
            );
            setData(result.data);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const USER_PATH = "/results";

    if(isLoading){
        return (
            
                <div className={classes.root}>
                  <CircularProgress color="secondary" />
                  <LinearProgress />
                </div>
                
        
        );
    }

    console.log(location.state.startDate + ' ' + location.state.rut)
    return (
        <Box display="flex" flexDirection="column" flex={1}>
            <Paper elevation={3} variant="outlined" className={classes.paper}>
                <Box display="flex" flexDirection="column" flex={1}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Usuario (Rut Cliente)</TableCell>
                                    <TableCell align="left">IP Cliente</TableCell>
                                    <TableCell align="left">Fecha</TableCell>
                                    <TableCell align="left">Evento</TableCell>
                                    <TableCell align="left">Error Detalle</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(logsPerPage > 0
                                    ? data.slice(
                                        (Number(pageNumber) - 1) * logsPerPage,
                                        (Number(pageNumber) - 1) * logsPerPage + logsPerPage,
                                    )
                                    : data
                                ).map(dataRow => {
                                    return (
                                        <TableRow
                                            key={dataRow.id}
                                            title="tableRow"
                                            className={classes.tableRow}
                                            classes={{ hover: classes.hover }}
                                            hover
                                        >
                                            <TableCell className={classes.tableCell}>
                                                {dataRow.rutCliente}
                                            </TableCell>
                                            <TableCell align="left" className={classes.tableCell}>
                                                {dataRow.ipCliente}
                                            </TableCell>
                                            <TableCell align="left" className={classes.tableCell}>
                                                {dataRow.fecha}
                                            </TableCell>
                                            <TableCell align="left" className={classes.tableCell}>
                                                {dataRow.evento}
                                            </TableCell>
                                            <TableCell align="left" className={classes.tableCell}>
                                                {dataRow.errorDetalle}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    flex={1}
                    padding={1}
                    paddingRight={10}
                >
                    <Pagination
                        page={Number(pageNumber)}
                        count={Math.ceil(data.length / logsPerPage)}
                        shape="rounded"
                        color="primary"
                        showFirstButton
                        showLastButton
                        boundaryCount={2}
                        renderItem={(item) => (
                            <PaginationItem
                                type={"start-ellipsis"}
                                component={Link}
                                selected
                                to={`${USER_PATH}/${item.page}`}
                                {...item}
                            />
                        )}
                    />
                </Box>
            </Paper>
        </Box>
    );
}