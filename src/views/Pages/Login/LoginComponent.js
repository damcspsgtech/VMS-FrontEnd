import React from 'react';
import { Avatar, CssBaseline, TextField, Paper, InputLabel, Grid, Typography, makeStyles, FormControl, Tab, Tabs, Card, CardContent, IconButton, InputAdornment, OutlinedInput } from '@material-ui/core';
import { Visibility, VisibilityOff, LockOutlined } from '@material-ui/icons'
import img from '../../../assets/img/avatars/vms_homepage.png';
import logo from '../../../assets/img/avatars/clgLogo.jpg';
import { Media, Button, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

const logoStyle = {
    maxHeight: 64,
    maxWidth: 64
}


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${img})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    avatar: {
        margin: theme.spacing(1),
        marginTop: 15,

        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    pos: {
        marginTop: 15,

    }
}));





function LoginComponent({ loginState, handleSignInChange, handleChange, onLogin }) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        showPassword: false,
    });
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />



            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>



                    <Col md={10} >

                        <Card sm={6}>

                            <Tabs
                                id="signInAs"
                                name="signInAs"
                                value={loginState.signInAs}
                                onChange={handleSignInChange}
                                indicatorColor="primary"

                                textColor="primary"
                                centered
                            >
                                <Tab style={{ outline: 0 }} label="Student" />
                                <Tab style={{ outline: 0 }} label="Tutor" />

                            </Tabs>
                            <div className={classes.card}>
                                <Avatar className={classes.avatar} >
                                    <LockOutlined />
                                </Avatar>

                                <Typography className={classes.pos} color="textSecondary" align="center">
                                    {(loginState.signInAs === 1) ? "Login to Continue" : "Login Using Your CSL Credentials"}
                                </Typography>
                            </div>

                            <CardContent>
                                <Form>



                                    <TextField className={classes.pos} name="username" type="text" value={loginState.username} variant="outlined" label="Username"
                                        fullWidth margin="normal" autoComplete="username" onChange={handleChange} />



                                    <FormControl fullWidth variant="outlined" className={classes.pos}>
                                        <InputLabel htmlFor="password">Password</InputLabel>
                                        <OutlinedInput className={classes.pos} name="password" type={values.showPassword ? 'text' : 'password'} value={loginState.password} variant="outlined" fullWidth label="Password"
                                            margin="normal" autoComplete="current-password" onChange={handleChange}

                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            } />
                                    </FormControl>



                                    <Col sm={{ size: 'auto', offset: 4 }} className={classes.pos}>
                                        <Button color="primary" className="px-4" onClick={onLogin}>Login</Button>
                                    </Col>


                                </Form>
                            </CardContent>




                        </Card>


                    </Col>
                    <div className="mt-2">
                        <Typography variant="body2" color="textSecondary" align="center">
                            {'Copyright © PSG Tech 2020'}
                        </Typography>
                    </div>

                </div>
                <div className="float-right text-right">
                    <Media right src={logo} style={logoStyle} alt="PSG" /><br />
                    <Typography variant="caption" color="textSecondary">
                        <b> {'Developed by'}</b><br />
                    </Typography>
                    <Typography variant="caption" color="primary">
                        {'Department of Applied Mathematics and Computational Science'}<br />
                        {'PSG College of Technology'}<br />
                        {'Coiimbatore'}
                    </Typography>

                </div>









            </Grid>
        </Grid>
    );
}

export default LoginComponent;






