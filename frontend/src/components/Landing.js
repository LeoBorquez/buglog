import 'date-fns';
import React, { useState } from 'react'
import { formatDate } from "../utils"


import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import { useHistory } from 'react-router-dom';
import { date } from 'date-fns/locale/af';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    selectDate: {
        marginTop: theme.spacing(4),
    }
}));



export default function Landing() {
    const classes = useStyles();

    let history = useHistory();

    const [server, setServer] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [log, setLog] = useState('getLogUser');

    const handleChangeServer = (event) => {
        setServer(event.target.value);
    };

    const handleLogChange = (log) => {
        setLog(log.target.value);
    };

    const handleStartChange = (date) => {
        setStartDate(formatDate(date));
    };

    const handleEndDate = (date) => {
        setEndDate(formatDate(date));
    };



    function request(e) {

        console.log(startDate)
        //history.push('/results/1')
    }

    return (
        <div className={classes.root}>
            <Container justify="center" style={{ paddingTop: '15%' }}>
                <div className={classes.root}>{"Por favor elige de donde quieres obtener la info"}</div>
                <FormControl className={classes.formControl}>
                    <InputLabel id="input-server">Servidor</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="select-server"
                        value={server}
                        onChange={handleChangeServer}
                    >
                        <MenuItem value={true}>PROD</MenuItem>
                        <MenuItem value={false}>DEV</MenuItem>
                    </Select>
                    <Select
                        id="select-log"
                        value={log}
                        onChange={handleLogChange}
                    >
                        <MenuItem value={'getLogUser'}>Log Usuario</MenuItem>
                        <MenuItem value={'getLogGiros'}>Log Giros Usuario</MenuItem>
                    </Select>

                    <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.selectDate}>                        
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Desde"
                                value={startDate}
                                onChange={handleStartChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Hasta"
                                format="MM/dd/yyyy"
                                value={endDate}
                                onChange={handleEndDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>

                    <TextField id="standard-basic" label="Rut sin digito verificador" />
                    <Button variant="contained" color="primary" onClick={() => { request() }}>
                        Consultar
                    </Button>
                </FormControl>

            </Container>

        </div>
    );

}