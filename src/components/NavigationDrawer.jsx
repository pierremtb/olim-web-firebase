import React from 'react';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import SubHeader from 'material-ui/Subheader';
import { ListItem } from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import history from '../history';
import SelectableList from './SelectableList.jsx';

// TODO: hide if small window
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
    if (false) {
      this.setState({ drawerOpened: false });
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
    return (
      <Drawer
        docked
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
  userName: React.PropTypes.string,
};
