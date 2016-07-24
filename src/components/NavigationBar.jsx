import React from 'react';
import history from '../history';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import SubHeader from 'material-ui/Subheader';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { avatarBackgroundColor } from '../themes.js';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';

// TODO: fix small animation problem of toolbar actions
export default class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagsPopoverOpened: false,
      drawerOpened: false,
      currentPageTitle: 'Tags',
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.handleDrawer = this.handleDrawer.bind(this);
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

  openSearchPage() {
    history.push('/search');
  }

  closeSearchPage() {
    history.push('/');
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

  handleDrawer() {
    const { shouldBeDocked, wantItDocked, opened } = this.props.drawer;
    const { undockDrawer, dockDrawer, openDrawer, closeDrawer } = this.props;
    if (shouldBeDocked && wantItDocked) {
      undockDrawer();
    } else if (shouldBeDocked && !wantItDocked) {
      dockDrawer();
    } else if (opened) {
      closeDrawer();
    } else {
      openDrawer();
    }
  }

  handleScroll(event) {
    this.setState({
      scrollTop: event.srcElement.body.scrollTop,
    });
  }

  render() {
    const { shouldBeDocked, wantItDocked } = this.props.drawer;
    const docked = shouldBeDocked && wantItDocked;
    return (
      <div>
        <Toolbar
          style={{
            background: '#00BCD4',
            position: 'fixed',
            width: '100%',
            paddingRight: docked ? 280 + 24 : 24,
            transition: 'box-shadow 400ms, padding-right 0ms',
            top: 0,
            zIndex: 99,
            boxShadow: this.state.scrollTop > 0 ?
                getMuiTheme().paper.zDepthShadows[1]
              : 'none',
          }}
        >
          <ToolbarGroup firstChild>
            <FontIcon
              style={{
                display: docked ? 'none' : 'block',
              }}
              className="material-icons"
              onTouchTap={this.handleDrawer}
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
            {this.props.routes[1].name === 'Tasks' ?
              <FontIcon
                className="material-icons"
                onTouchTap={this.handleTagsPopoverOpen}
              >
                filter_list
              </FontIcon>
            : null}
          </ToolbarGroup>
        </Toolbar>
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

      </div>
    );
  }
}

NavigationBar.propTypes = {
  tags: React.PropTypes.array,
  route: React.PropTypes.object,
  routes: React.PropTypes.object,
  routeParams: React.PropTypes.object,
  drawer: React.PropTypes.object,
  userName: React.PropTypes.string,
  dockDrawer: React.PropTypes.func,
  undockDrawer: React.PropTypes.func,
  openDrawer: React.PropTypes.func,
  closeDrawer: React.PropTypes.func,
};
