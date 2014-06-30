/** @jsx React.DOM */

var ModList = React.createClass({
  getInitialState: function () {
    return {
      expanded: false
    }
  },
  render: function () {
    var mods = this.props.mods.map(function (mod) {
      var documentationLink = (
        <a href={ mod.docs_url } target="_blank">Documentation</a>
      );

      var downloadLink = (
        <a href={ mod.download_url }>Download</a>
      );

      return (
        <li><span className="mod-list-name">{ mod.name }</span><span className="mod-list-actions">{ documentationLink } &middot; { downloadLink }</span></li>
      );
    });

    return (
      <div className="mod-list-container" style={ this.getContainerStyle() }>
        <ul className="mod-list">
          { mods }
        </ul>
      </div>
    );
  },
  getContainerStyle: function () {
    return {
      height: this.props.expanded ? 'auto' : 0
    };
  }
});
