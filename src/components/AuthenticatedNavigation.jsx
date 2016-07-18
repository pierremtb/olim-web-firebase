import React from 'react';
import { browserHistory } from 'react-router';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import SubHeader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import FontIcon from 'material-ui/FontIcon';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { avatarBackgroundColor } from '../themes.js';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import { Chip } from './Chip.jsx';

export class AuthenticatedNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountMenuOpened: false,
      tagsPopoverOpened: false,
      drawerOpened: false,
      currentPageTitle: 'Tags',
    };
    this.handleAccountMenuOpen = this.handleAccountMenuOpen.bind(this);
    this.handleAccountMenuClose = this.handleAccountMenuClose.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.openTagsPage = this.openTagsPage.bind(this);
    this.openTasksPage = this.openTasksPage.bind(this);
    this.openSettingsPage = this.openSettingsPage.bind(this);
    this.handleTagsPopoverOpen = this.handleTagsPopoverOpen.bind(this);
    this.handleTagsPopoverClose = this.handleTagsPopoverClose.bind(this);
    this.getCurrentTag = this.getCurrentTag.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  getCurrentTag() {
    const { tagName } = this.props.routeParams;
    if (!tagName) {
      return null;
    }
    return this.props.tags.filter(tag => tag.name.toLowerCase() === tagName)[0];
  }

  handleAccountMenuOpen(event) {
    event.preventDefault();
    this.setState({
      accountMenuOpened: true,
      anchorEl: event.currentTarget,
    });
  }

  handleAccountMenuClose() {
    this.setState({ accountMenuOpened: false });
  }

  handleTagsPopoverOpen(event) {
    event.preventDefault();
    this.setState({
      tagsPopoverOpened: true,
      tagsPopoverAnchor: event.currentTarget,
    });
  }

  handleTagsPopoverClose() {
    this.setState({ tagsPopoverOpened: false });
  }

  handleDrawerOpen() {
    this.setState({ drawerOpened: true });
  }

  handleDrawerClose() {
    this.setState({ drawerOpened: false });
  }

  handleScroll(event) {
    this.setState({
      scrollTop: event.srcElement.body.scrollTop,
    });
  }

  handleLogout() {
    // Meteor.logout(() => browserHistory.push('/action/login'));
    this.handleDrawerClose();
  }

  openTagsPage() {
    this.handleDrawerClose();
    browserHistory.push('/tags');
  }

  openTasksPage() {
    this.handleDrawerClose();
    browserHistory.push('/tasks');
  }

  openSettingsPage() {
    this.handleDrawerClose();
    browserHistory.push('/settings');
  }

  render() {
    return (
      <div>
        <Toolbar
          style={{
            background: '#00BCD4',
            position: 'fixed',
            width: '100%',
            transition: 'box-shadow 400ms',
            top: 0,
            zIndex: 99,
            boxShadow: this.state.scrollTop > 0 ?
                getMuiTheme().paper.zDepthShadows[1]
              : 'none',
          }}
        >
          <ToolbarGroup firstChild>
            <FontIcon
              className="material-icons"
              onTouchTap={this.handleDrawerOpen}
            >
              menu
            </FontIcon>
            <ToolbarTitle text={this.props.routes[1].name} style={{ marginLeft: 32 }} />
          </ToolbarGroup>
          <ToolbarGroup>
            {this.getCurrentTag() ?
              <div style={{ marginTop: 15 }}>
                <Chip
                  deletable
                  leftIcon={this.getCurrentTag().icon}
                  leftChar={this.getCurrentTag().name.charAt(0)}
                  leftColor={this.getCurrentTag().color ? this.getCurrentTag().color : avatarBackgroundColor}
                  text={`#${this.getCurrentTag().name}`}
                  onDeleteButtonClick={() => browserHistory.push('/tasks')}
                />
              </div>
            : null}
          </ToolbarGroup>
          <ToolbarGroup>
            {this.props.routes[1].name === 'Tasks' ?
              <FontIcon
                className="material-icons"
                onTouchTap={this.handleTagsPopoverOpen}
              >
                filter_list
              </FontIcon>
            : null}
            <FontIcon className="material-icons">
              search
            </FontIcon>
            <FontIcon
              className="material-icons"
              onTouchTap={this.handleAccountMenuOpen}
            >
              person_outline
            </FontIcon>
          </ToolbarGroup>
        </Toolbar>
        <Popover
          open={this.state.accountMenuOpened}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          onRequestClose={this.handleAccountMenuClose}
        >
          <Menu>
            <MenuItem
              primaryText={'Yay'}
              onTouchTap={this.handleAccountMenuClose}
              disabled
            />
            <Divider />
            <MenuItem primaryText="Sign out" onTouchTap={this.handleLogout} />
          </Menu>
        </Popover>
        <Popover
          open={this.state.tagsPopoverOpened}
          anchorEl={this.state.tagsPopoverAnchor}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          onRequestClose={this.handleTagsPopoverClose}
        >
          <Menu>
            <SubHeader>Add a filter</SubHeader>
            {this.props.tags ?
              this.props.tags.map(tag =>
                <MenuItem
                  primaryText={`#${tag.name}`}
                  onTouchTap={() => {
                    this.handleTagsPopoverClose();
                    browserHistory.push(`/tasks/tag/${tag.name.toLowerCase()}`);
                  }}
                  leftIcon={
                    <FontIcon
                      style={{ color: tag.color ? tag.color : avatarBackgroundColor }}
                      className="material-icons"
                    >
                      {tag.icon ? tag.icon : 'label_outline'}
                    </FontIcon>
                  }
                />
              ) : null}
          </Menu>
        </Popover>
        <Drawer
          docked={false}
          width={280}
          open={this.state.drawerOpened}
          onRequestChange={this.handleDrawerClose}
        >
          <div
            style={{
              fontSize: 40,
              fontWeight: 300,
              paddingTop: 20,
              paddingBottom: 20,
              marginLeft: 16,
            }}
          >
            <span>
              Olim
            </span>
          </div>
          <Divider />
          <SubHeader>Navigation</SubHeader>
          <MenuItem
            onTouchTap={this.openTasksPage}
            leftIcon={<FontIcon className="material-icons">list</FontIcon>}
          >
            Tasks
          </MenuItem>
          <MenuItem
            onTouchTap={this.openTagsPage}
            leftIcon={<FontIcon className="material-icons">label</FontIcon>}
          >
            Tags
          </MenuItem>
          <Divider />
          <SubHeader>Account</SubHeader>
          <MenuItem
            onTouchTap={this.openSettingsPage}
            leftIcon={<FontIcon className="material-icons">settings</FontIcon>}
          >
            Settings
          </MenuItem>
          <MenuItem
            onTouchTap={this.handleLogout}
            leftIcon={<FontIcon className="material-icons">exit_to_app</FontIcon>}
          >
            Sign out
          </MenuItem>
        </Drawer>
      </div>
    );
  }
};

AuthenticatedNavigation.propTypes = {
  tags: React.PropTypes.array,
  route: React.PropTypes.object,
  routes: React.PropTypes.object,
  routeParams: React.PropTypes.object,
};
