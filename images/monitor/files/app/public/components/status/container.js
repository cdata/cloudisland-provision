/** @jsx React.DOM */

var Container = React.createClass({
  getInitialState: function () {
    return {
      showDetails: false
    };
  },
  render: function () {
    var mods;

    if (this.hasMods()) {
      mods = [
        <ModActions containerId={ this.getId() } mods={ this.getMods() } onClickDetails={ this.onClickDetails }></ModActions>,
        <ModList mods={ this.getMods() } expanded={ this.state.showDetails }></ModList>
      ];
    }

    return (
      <div className={ React.addons.classSet({ online: this.isOnline(), container: true }) }>
        <header>
          <h1>{ this.getName() }</h1>
          <span>{ this.getStatus() }</span>
        </header>
        { mods }
      </div>
    );
  },

  onClickDetails: function () {
    this.setState({
      showDetails: !this.state.showDetails
    });
  },

  getId: function () {
    return this.props.container.id;
  },
  hasMods: function () {
    return !!this.props.container.mods.length;
  },
  getMods: function () {
    return this.props.container.mods;
  },
  getName: function () {
    return this.props.container.name + ' (' + this.props.container.tag + ')';
  },
  getStatus: function () {
    return this.props.container.status;
  },
  isOnline: function () {
    return /^Up/.test(this.getStatus());
  }
});
