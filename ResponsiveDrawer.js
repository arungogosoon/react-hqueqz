import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import { mailFolderListItems, otherMailFolderListItems } from './tileData';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%'
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative'
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  dragger: {
    width: '5px',
    cursor: 'ew-resize',
    padding: '4px 0 0',
    borderTop: '1px solid #ddd',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: '100',
    backgroundColor: '#f4f7f9'
  }
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
    isResizing: false,
    lastDownX: 0,
    newWidth: {}
  };

  constructor(props) {
    super(props);
    this.handleMousemove.bind(this);
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleMousedown = e => {
    this.setState({ isResizing: true, lastDownX: e.clientX });
  };

  handleMousemove = e => {
    // we don't want to do anything if we aren't resizing.
    if (!this.state.isResizing) {
      return;
    }

    let offsetRight =
      document.body.offsetWidth - (e.clientX - document.body.offsetLeft);
    let minWidth = 50;
    let maxWidth = 600;
    if (offsetRight > minWidth && offsetRight < maxWidth) {
      this.setState({ newWidth: { width: offsetRight } });
    }
  };

  handleMouseup = e => {
    this.setState({ isResizing: false });
  };

  componentDidMount() {
    document.addEventListener('mousemove', e => this.handleMousemove(e));
    document.addEventListener('mouseup', e => this.handleMouseup(e));
  }

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>{mailFolderListItems}</List>
        <Divider />
        <List>{otherMailFolderListItems}</List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Responsive drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
            PaperProps={{ style: this.state.newWidth }}
          >
          <div
              id="dragger"
              onMouseDown={event => {
                this.handleMousedown(event);
              }}
              className={classes.dragger}
            />
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            variant="permanent"
            open
            anchor={'right'}
            classes={{
              paper: classes.drawerPaper
            }}
            PaperProps={{ style: this.state.newWidth }}
          >
            <div
              id="dragger"
              onMouseDown={event => {
                this.handleMousedown(event);
              }}
              className={classes.dragger}
            />
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography noWrap>
            {'You think water moves fast? You should see ice.'}
          </Typography>
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
