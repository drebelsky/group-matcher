'use strict';

class NameEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.inputRef.focus();
  }

  render() {
    return <input
      onClick={e => e.stopPropagation()}
      type="text"
      ref={(val) => this.inputRef = val}
      value={this.props.name}
      onChange={e => this.props.updateName(e.target.value)}
    />
  }
}

class Name extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editing: props.name == ""};
  }

  setEditing(to) {
    if (!to) {
      this.props.triggerUpdate();
    }
    this.setState(Object.assign({}, this.state, {editing: to}));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.name != "" && this.props.name == "") {
      this.setEditing(true);
    }
  }

  render() {
    return (
      <div
        className="name"
        onClick={() => this.setEditing(!this.state.editing)}
        onKeyDown={e => {if (e.which == 13) {this.setEditing(false)}}}
      >
        <span onClick={e => {
          e.stopPropagation();
          this.props.remove();
        }}>✕</span>
        {this.state.editing
          ? <NameEditor name={this.props.name} updateName={this.props.updateName} />
          : <p>{this.props.name}</p>
        }
        {this.props.match && <p>({this.props.match})</p>}
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      names: [""],
      matches: []
    }
  }

  updateName(index) {
    return name => {
      const names = this.state.names.slice();
      names[index] = name;
      this.setState(Object.assign({}, this.state, {names: names}));
    }
  }

  remove(index) {
    return () => {
      const names = this.state.names.slice();
      if (index == names.length - 1) {
        names[index] = "";
      } else {
        names.splice(index, 1);
      }
      this.setState(Object.assign({}, this.state, {names: names}));
    }
  }

  triggerUpdate(index) {
    return () => {
      if (index == this.state.names.length - 1 && this.state.names[index] != "") {
        const names = this.state.names.slice();
        names.push("");
        this.setState(Object.assign({}, this.state, {names: names}));
      }
    }
  }

  createMatches() {
    let names = this.state.names.filter(name => name != "");
    while (true) {
      let copy = names.slice();
      let matches = [];
      while (copy.length > 0) {
        matches.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0])
      }
      let no_self_maps = true;
      for (let i = 0; i < names.length; i++) {
        if (matches[i] == names[i]) {
          no_self_maps = false;
          break;
        }
      }
      if (no_self_maps) {
        this.setState(Object.assign({}, this.state, {matches: matches}));
        break;
      }
    }
  }

  render() {
    return (
      <div className="container">
        <div className="names">
          {this.state.names.map((name, i) => (
            <Name
              name={name}
              match={this.state.matches[i]}
              key={i}
              updateName={this.updateName(i)}
              triggerUpdate={this.triggerUpdate(i)}
              remove={this.remove(i)}
            />
          ))}
        </div>
        <div className="button-holder">
          <button onClick={() => this.createMatches()}>Create Matches</button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
