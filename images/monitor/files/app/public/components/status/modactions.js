/** @jsx React.DOM */

var ModActions = React.createClass({
  render: function () {
    var detailsLink = (
      <a href="javascript:void(0);" onClick={ this.props.onClickDetails }>Details</a>
    );

    var downloadLink = (
      <a href={ this.getModArchiveURL() }>Download all mods</a>
    );

    return (
      <span className="mod-actions"><span>Requires { this.props.mods.length } mods &middot;</span> { detailsLink } &middot; { downloadLink }</span>
    );
  },
  toggleModDetails: function () {

  },
  getModArchiveURL: function () {
    return '/api/minecraft_containers/' + this.props.containerId + '/mods.tar';
  }
});
