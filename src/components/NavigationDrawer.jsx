import React from 'react';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import SubHeader from 'material-ui/Subheader';
import { ListItem } from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';
import history from '../history';
import SelectableList from './SelectableList.jsx';

export default class NavigationDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: true,
    };
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.openTagsPage = this.openTagsPage.bind(this);
    this.openOverdueTasksPage = this.openOverdueTasksPage.bind(this);
    this.openTodayTasksPage = this.openTodayTasksPage.bind(this);
    this.openTomorrowTasksPage = this.openTomorrowTasksPage.bind(this);
    this.openInTheNextSevenDaysTasksPage = this.openInTheNextSevenDaysTasksPage.bind(this);
    this.openAllUpcomingTasksPage = this.openAllUpcomingTasksPage.bind(this);
    this.openSettingsPage = this.openSettingsPage.bind(this);
  }

  handleDrawerOpen() {
    this.setState({ drawerOpened: true });
  }

  handleDrawerClose() {
    if (!this.props.docked) {
      this.props.closeDrawer();
    }
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

  openSettingsPage() {
    this.handleDrawerClose();
    history.push('/settings');
  }

  handleLogout(e) {
    this.props.logout(e);
  }

  render() {
    const { user, docked, opened, undockDrawer } = this.props;
    return (
      <Drawer
        docked={docked}
        width={280}
        zDepth={docked ? 0 : 2}
        open={opened}
        onRequestChange={this.handleDrawerClose}
        containerStyle={{
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        }}
      >
        <ListItem
          disabled
          leftAvatar={<Avatar src={user.photoURL} />}
          primaryText={user.userName}
          secondaryText={user.email}
          rightIcon={
            docked ?
              <FontIcon className="material-icons" onTouchTap={undockDrawer}>
                keyboard_arrow_left
              </FontIcon>
            : null
          }
        />
        <Divider />
        <SelectableList>
          <SubHeader>Tasks</SubHeader>
          <ListItem
            value={'overdue'}
            onTouchTap={this.openOverdueTasksPage}
            leftIcon={<FontIcon className="material-icons">warning</FontIcon>}
            primaryText="Overdue"
          />
          <ListItem
            value={'today'}
            onTouchTap={this.openTodayTasksPage}
            leftIcon={<FontIcon className="material-icons">hourglass_full</FontIcon>}
            primaryText="Today"
          />
          <ListItem
            value={'tomorrow'}
            onTouchTap={this.openTomorrowTasksPage}
            leftIcon={<FontIcon className="material-icons">hourglass_empty</FontIcon>}
            primaryText="Tomorrow"
          />
          <ListItem
            value={'next-7-days'}
            onTouchTap={this.openInTheNextSevenDaysTasksPage}
            leftIcon={<FontIcon className="material-icons">event</FontIcon>}
            primaryText="In the next seven days"
          />
          <ListItem
            value={'upcoming'}
            onTouchTap={this.openAllUpcomingTasksPage}
            leftIcon={<FontIcon className="material-icons">all_inclusive</FontIcon>}
            primaryText="All upcoming"
          />
          <Divider />
          <SubHeader>Manage</SubHeader>
          <ListItem
            value={'tags'}
            onTouchTap={this.openTagsPage}
            leftIcon={<FontIcon className="material-icons">label_outline</FontIcon>}
            primaryText="Tags"
          />
          <ListItem
            value={'settings'}
            onTouchTap={this.openSettingsPage}
            leftIcon={<FontIcon className="material-icons">settings</FontIcon>}
            primaryText="Settings"
            disabled
          />
          <ListItem
            value={'logout'}
            onTouchTap={this.handleLogout}
            leftIcon={<FontIcon className="material-icons">exit_to_app</FontIcon>}
            primaryText="Sign out"
          />
        </SelectableList>
      </Drawer>
    );
  }
}

NavigationDrawer.propTypes = {
  logout: React.PropTypes.func,
  user: React.PropTypes.object,
  docked: React.PropTypes.bool,
  opened: React.PropTypes.bool,
  closeDrawer: React.PropTypes.func,
  undockDrawer: React.PropTypes.func,
};
