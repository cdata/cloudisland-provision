/** @jsx React.DOM */

var Status = React.createClass({
  render: function () {
    var containers = this.props.containers.map(function (container) {
      return (
        <li><Container container={ container }></Container></li>
      );
    });

    return (
      <div className="status">
        <header>
          <h1>CloudIsland Status</h1>
        </header>
        <ul>
          { containers }
        </ul>
      </div>
    );
  }
});
