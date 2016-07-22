import React from 'react';
import history from '../history';
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
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';

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
    this.handleLogout = this.handleLogout.bind(this);
    this.openTagsPage = this.openTagsPage.bind(this);
    this.openOverdueTasksPage = this.openOverdueTasksPage.bind(this);
    this.openTodayTasksPage = this.openTodayTasksPage.bind(this);
    this.openTomorrowTasksPage = this.openTomorrowTasksPage.bind(this);
    this.openInTheNextSevenDaysTasksPage = this.openInTheNextSevenDaysTasksPage.bind(this);
    this.openAllUpcomingTasksPage = this.openAllUpcomingTasksPage.bind(this);
    this.openSearchPage = this.openSearchPage.bind(this);
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

  isSearchPage() {
    return this.props.route.name === 'Search';
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

  handleLogout(e) {
    this.props.onLogout(e);
  }

  openTagsPage() {
    this.handleDrawerClose();
    history.push('/tags');
  }

  openAllUpcomingTasksPage() {
    this.handleDrawerClose();
    history.push('/tasks/upcoming');
  }

  openOverdueTasksPage() {
    this.handleDrawerClose();
    history.push('/tasks/overdue');
  }

  openTodayTasksPage() {
    this.handleDrawerClose();
    history.push('/tasks/today');
  }

  openTomorrowTasksPage() {
    this.handleDrawerClose();
    history.push('/tasks/tomorrow');
  }

  openInTheNextSevenDaysTasksPage() {
    this.handleDrawerClose();
    history.push('/tasks/next-7-days');
  }

  openSearchPage() {
    history.push('/search');
  }

  closeSearchPage() {
    history.push('/');
  }

  openSettingsPage() {
    this.handleDrawerClose();
    history.push('/settings');
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
            <ToolbarTitle
              text={this.isSearchPage() ? '' : this.props.routes[1].name}
              style={{ marginLeft: 32 }}
            />
          </ToolbarGroup>
          <ToolbarGroup>
            {this.getCurrentTag() ?
              <div style={{ marginTop: 15 }}>
                <Chip
                  onRequestDelete={() => history.push('/tasks')}
                >
                  <Avatar
                    backgroundColor={this.getCurrentTag().color}
                    color="white"
                    icon={this.getCurrentTag().icon ?
                      <FontIcon className="material-icons">{this.getCurrentTag().icon}</FontIcon>
                      : null
                    }
                  >
                    {!this.getCurrentTag().icon ? this.getCurrentTag().name.charAt(0) : null}
                  </Avatar>
                  {this.getCurrentTag().name}
                </Chip>
              </div>
            : null}
            {this.isSearchPage() ?
              <TextField
                hintText="Search..."
                autoFocus
                onChange={(e) => e.target && history.push(`/search/${e.target.value}`)}
              />
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
            {this.isSearchPage() ?
              <FontIcon
                className="material-icons"
                onTouchTap={this.closeSearchPage}
              >
                close
              </FontIcon>
            :
              <FontIcon
                className="material-icons"
                onTouchTap={this.openSearchPage}
              >
                search
              </FontIcon>
            }
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
              primaryText={this.props.userName}
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
                    history.push(`/tasks/tag/${tag.name.toLowerCase()}`);
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
          <SubHeader>Tasks</SubHeader>
          <MenuItem
            onTouchTap={this.openOverdueTasksPage}
            leftIcon={<FontIcon className="material-icons">warning</FontIcon>}
          >
            Overdue
          </MenuItem>
          <MenuItem
            onTouchTap={this.openTodayTasksPage}
            leftIcon={<FontIcon className="material-icons">hourglass_full</FontIcon>}
          >
            Today
          </MenuItem>
          <MenuItem
            onTouchTap={this.openTomorrowTasksPage}
            leftIcon={<FontIcon className="material-icons">hourglass_empty</FontIcon>}
          >
            Tomorrow
          </MenuItem>
          <MenuItem
            onTouchTap={this.openInTheNextSevenDaysTasksPage}
            leftIcon={<FontIcon className="material-icons">event</FontIcon>}
          >
            In the next seven days
          </MenuItem>
          <MenuItem
            onTouchTap={this.openAllUpcomingTasksPage}
            leftIcon={<FontIcon className="material-icons">all_inclusive</FontIcon>}
          >
            All upcoming
          </MenuItem>
          <Divider />
          <SubHeader>Manage</SubHeader>
          <MenuItem
            onTouchTap={this.openTagsPage}
            leftIcon={<FontIcon className="material-icons">label_outline</FontIcon>}
          >
            Tags
          </MenuItem>
          <MenuItem
            disabled
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
}

AuthenticatedNavigation.propTypes = {
  tags: React.PropTypes.array,
  route: React.PropTypes.object,
  routes: React.PropTypes.object,
  routeParams: React.PropTypes.object,
  userName: React.PropTypes.string,
  onLogout: React.PropTypes.func,
};
