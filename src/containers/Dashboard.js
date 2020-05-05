import React from 'react';
import { connect } from 'react-redux';
import { getData } from '../actions';
import StudentCard from '../components/StudentCard';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { studentsTotalSelector } from '../selectors';
import debounce from 'lodash/debounce';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = (theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginLeft: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },

  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  MuiToolbarRoot: {
    justifyContent: 'center',
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    alignSelf: 'center',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  MuiCardActionsRoot: {
    justifyContent: 'center',
  },
});

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      searchStr: '',
      marksFilter: 0,
      alphabeticalFilter: 0,
    };
  }

  componentDidMount() {
    this.props.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.setState({ data: this.props.data });
    }
    if (prevState.searchStr !== this.state.searchStr) {
      // this.nameFilter()
    }
    if (
      prevState.marksFilter !== this.state.marksFilter ||
      prevState.alphabeticalFilter !== this.state.alphabeticalFilter
    ) {
      this.orderFilter();
    }
  }

  nameFilter = () => {
    if (this.state.searchStr === '') {
      this.orderFilter(this.state.data);
    } else if (this.state.searchStr !== '') {
      let tempArr = this.props.data.filter((item) =>
        new RegExp(this.state.searchStr, 'g').test(item.name)
      );
      this.setState({ data: tempArr }, () => this.orderFilter());
    }
  };

  orderFilter = () => {
    let tempArr = [];
    if (this.state.marksFilter === 1) {
      tempArr = this.state.data.sort((a, b) => a.total - b.total);
      this.setState({ data: tempArr });
    } else if (this.state.marksFilter === -1) {
      tempArr = this.state.data.sort((a, b) => b.total - a.total);
      this.setState({ data: tempArr });
    } else if (this.state.alphabeticalFilter === 1) {
      tempArr = this.state.data.sort((a, b) => a.student_id - b.student_id);
      this.setState({ data: tempArr });
    } else if (this.state.alphabeticalFilter === -1) {
      tempArr = this.state.data.sort((a, b) => b.student_id - a.student_id);
      this.setState({ data: tempArr });
    }
    console.log('tempArr', tempArr);
  };

  toggleAlphabet = () => {
    console.log('toggling alphabet');
    if (this.state.alphabeticalFilter === 0) {
      this.setState({ alphabeticalFilter: -1, marksFilter: 0 });
    } else {
      this.setState(
        {
          alphabeticalFilter: -1 * this.state.alphabeticalFilter,
          marksFilter: 0,
        },
        () => console.log(this.state)
      );
    }
  };

  toggleMarks = () => {
    console.log('toggling marks');
    if (this.state.marksFilter === 0) {
      this.setState({ marksFilter: 1, alphabeticalFilter: 0 });
    } else {
      this.setState(
        { marksFilter: -1 * this.state.marksFilter, alphabeticalFilter: 0 },
        () => console.log(this.state)
      );
    }
  };

  render() {
    const { classes } = this.props;
    const debouncedNameFilter = debounce(this.nameFilter, 300);

    // return <div>{this.renderStudents(this.props.data)}</div>;

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar className={classes.MuiToolbarRoot}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={this.state.searchStr}
                onChange={(event) =>
                  this.setState({ searchStr: event.target.value }, () =>
                    debouncedNameFilter()
                  )
                }
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            {/*<div className={classes.grow} />*/}
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.toggleAlphabet()}
                  >
                    Order Alphabetically{' '}
                    {this.state.alphabeticalFilter === 1 && (
                      <ArrowUpwardIcon fontSize="small" />
                    )}
                    {this.state.alphabeticalFilter === -1 && (
                      <ArrowDownwardIcon fontSize="small" />
                    )}
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.toggleMarks()}
                  >
                    Order by Marks{' '}
                    {this.state.marksFilter === 1 && (
                      <ArrowUpwardIcon fontSize="small" />
                    )}
                    {this.state.marksFilter === -1 && (
                      <ArrowDownwardIcon fontSize="small" />
                    )}
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm"></Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {this.state.data &&
                this.state.data.map((student) => (
                  <Grid item key={student.student_id} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image="https://source.unsplash.com/random"
                        title="Image title"
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {student.name}
                        </Typography>
                        <Typography>id: {student.student_id}</Typography>
                        <Typography>Total Marks: {student.total}</Typography>
                      </CardContent>
                      <CardActions className={classes.MuiCardActionsRoot}>
                        <Button size="small" color="primary">
                          View
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Container>
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            Something here to give the footer a purpose!
          </Typography>
          <Copyright />
        </footer>
        {/* End footer */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: studentsTotalSelector(state),
  };
};

const mapDispatchToProps = {
  getData: getData,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Dashboard));
